const OWNER_PHONE = process.env.WHATSAPP_OWNER_NUMBER;
const WA_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WA_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const GRAPH_VERSION =
  process.env.WHATSAPP_GRAPH_VERSION || "v23.0";

const OWNER_TEMPLATE =
  process.env.WHATSAPP_BOOKING_TEMPLATE ||
  "new_booking_notification";

const OWNER_LANGUAGE =
  process.env.WHATSAPP_TEMPLATE_LANGUAGE ||
  "en_US";

const CUSTOMER_TEMPLATE =
  process.env.WHATSAPP_CUSTOMER_TEMPLATE ||
  "booking_thank_you";

const CUSTOMER_LANGUAGE =
  process.env.WHATSAPP_CUSTOMER_TEMPLATE_LANGUAGE ||
  OWNER_LANGUAGE;

const clean = (value, max = 500) =>
  String(value ?? "")
    .trim()
    .slice(0, max);

const phone = (value) =>
  String(value ?? "")
    .replace(/\D/g, "")
    .slice(0, 20);

/* -------------------------------------------------------
   Extract values from booking.message
------------------------------------------------------- */

const extractMessageValue = (
  message,
  label,
  fallback = "Not provided"
) => {
  const text = String(message ?? "");

  const regex = new RegExp(
    `${label}\\s*:\\s*([^|]+)`,
    "i"
  );

  const match = text.match(regex);

  return clean(
    match?.[1] || fallback,
    200
  );
};

/* -------------------------------------------------------
   Send WhatsApp Template
------------------------------------------------------- */

async function sendTemplate(
  to,
  name,
  language,
  parameters
) {
  const url =
    `https://graph.facebook.com/${GRAPH_VERSION}/${WA_PHONE_ID}/messages`;

  const payload = {
    messaging_product: "whatsapp",
    to,
    type: "template",
    template: {
      name,
      language: {
        code: language,
      },
      components: [
        {
          type: "body",
          parameters: parameters.map((value) => ({
            type: "text",
            text: clean(value, 1000),
          })),
        },
      ],
    },
  };

  console.log("WhatsApp request:", {
    to,
    template: name,
    language,
    parameterCount: parameters.length,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${WA_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error("WhatsApp API ERROR:", {
      status: response.status,
      template: name,
      recipient: to,
      response: data,
    });

    return {
      ok: false,
      status: response.status,
      data,
    };
  }

  console.log("WhatsApp API SUCCESS:", {
    template: name,
    recipient: to,
    response: data,
  });

  return {
    ok: true,
    status: response.status,
    data,
  };
}

/* -------------------------------------------------------
   API Handler
------------------------------------------------------- */

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed.",
    });
  }

  try {
    const booking =
      req.body?.booking ||
      req.body ||
      {};

    /* -----------------------------
       Booking details
    ----------------------------- */

    const name = clean(
      booking.customer_name || booking.name,
      100
    );

    const customerPhone = phone(
      booking.phone
    );

    const service = clean(
      booking.service ||
        "Interior Consultation",
      120
    );

    const message = clean(
      booking.message,
      1000
    );

    /* -----------------------------
       Get actual values from message
    ----------------------------- */

    const property = extractMessageValue(
      message,
      "Property",
      booking.property_type ||
        "Not provided"
    );

    const location = extractMessageValue(
      message,
      "Location",
      booking.location ||
        "Not provided"
    );

    const offer = extractMessageValue(
      message,
      "Offer",
      booking.offer ||
        "15% OFF"
    );

    if (!name || customerPhone.length < 10) {
      return res.status(400).json({
        error:
          "Valid customer name and phone are required.",
      });
    }

    /* -----------------------------
       WhatsApp configuration
    ----------------------------- */

    if (
      !WA_TOKEN ||
      !WA_PHONE_ID ||
      !OWNER_PHONE
    ) {
      console.error(
        "WhatsApp configuration missing:",
        {
          hasToken: Boolean(WA_TOKEN),
          hasPhoneId: Boolean(WA_PHONE_ID),
          hasOwnerPhone: Boolean(
            OWNER_PHONE
          ),
        }
      );

      return res.status(202).json({
        ok: true,
        notification: "not_configured",
      });
    }

    /* ===================================================
       1. OWNER / BOSS NOTIFICATION

       Current owner template expects 5 parameters:
       1. Customer name
       2. Customer phone
       3. Property
       4. Location
       5. Offer
       =================================================== */

    const owner = await sendTemplate(
      OWNER_PHONE,
      OWNER_TEMPLATE,
      OWNER_LANGUAGE,
      [
        name,
        `+${customerPhone}`,
        property,
        location,
        offer,
      ]
    );

    /* ===================================================
       2. CUSTOMER THANK-YOU

       booking_thank_you template screenshot shows
       exactly 3 variables:

       {{1}} = Customer Name
       {{2}} = Property Type
       {{3}} = Location
       =================================================== */

    const customer =
      await sendTemplate(
        customerPhone,
        CUSTOMER_TEMPLATE,
        CUSTOMER_LANGUAGE,
        [
          name,
          property,
          location,
        ]
      );

    /* -----------------------------
       Final result
    ----------------------------- */

    console.log(
      "Booking WhatsApp notification result:",
      {
        ownerSent: owner.ok,
        customerSent: customer.ok,
        bookingId:
          booking.id || null,
      }
    );

    return res.status(200).json({
      ok: true,

      founderNotification:
        owner.ok
          ? "sent"
          : "failed",

      customerNotification:
        customer.ok
          ? "sent"
          : "failed",

      ownerMetaError:
        owner.ok
          ? null
          : owner.data?.error ||
            owner.data ||
            null,

      customerMetaError:
        customer.ok
          ? null
          : customer.data?.error ||
            customer.data ||
            null,
    });

  } catch (error) {
    console.error(
      "Booking notification unexpected error:",
      error
    );

    return res.status(500).json({
      error:
        "Notification service error.",
    });
  }
}
