const OWNER_PHONE = process.env.WHATSAPP_OWNER_NUMBER;
const WA_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WA_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

const GRAPH_VERSION =
  process.env.WHATSAPP_GRAPH_VERSION || "v23.0";

const OWNER_TEMPLATE =
  process.env.WHATSAPP_BOOKING_TEMPLATE ||
  "new_booking_notification";

const OWNER_LANGUAGE =
  process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en_US";

const CUSTOMER_TEMPLATE =
  process.env.WHATSAPP_CUSTOMER_TEMPLATE ||
  "booking_thank_you";

const CUSTOMER_LANGUAGE =
  process.env.WHATSAPP_CUSTOMER_TEMPLATE_LANGUAGE ||
  OWNER_LANGUAGE;


// -----------------------------
// Helpers
// -----------------------------

const clean = (value, max = 500) => {
  return String(value ?? "")
    .trim()
    .slice(0, max);
};

const phone = (value) => {
  return String(value ?? "")
    .replace(/\D/g, "")
    .slice(0, 20);
};


// Convert Indian 10-digit number to WhatsApp international format
const customerWhatsAppPhone = (value) => {
  const digits = phone(value);

  if (digits.length === 10) {
    return `91${digits}`;
  }

  if (digits.startsWith("91") && digits.length >= 12) {
    return digits;
  }

  return digits;
};


// Extract values from the existing frontend message
const extractBookingDetails = (message) => {
  const text = String(message || "");

  const propertyMatch = text.match(
    /Property:\s*([^|]+)/i
  );

  const locationMatch = text.match(
    /Location:\s*([^|]+)/i
  );

  const offerMatch = text.match(
    /Offer:\s*([^|]+)/i
  );

  const whatsappMatch = text.match(
    /WhatsApp Updates:\s*(Yes|No)/i
  );

  return {
    property: clean(
      propertyMatch?.[1] || "Not provided",
      100
    ),

    location: clean(
      locationMatch?.[1] || "Not provided",
      150
    ),

    offer: clean(
      offerMatch?.[1] || "15% OFF",
      80
    ),

    wantsWhatsApp:
      whatsappMatch?.[1]?.toLowerCase() === "yes"
  };
};


// -----------------------------
// WhatsApp Template Sender
// -----------------------------

async function sendTemplate(
  to,
  templateName,
  language,
  parameters
) {
  const url =
    `https://graph.facebook.com/${GRAPH_VERSION}/${WA_PHONE_ID}/messages`;

  const response = await fetch(url, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${WA_TOKEN}`,
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      messaging_product: "whatsapp",

      to,

      type: "template",

      template: {
        name: templateName,

        language: {
          code: language
        },

        components: [
          {
            type: "body",

            parameters: parameters.map((value) => ({
              type: "text",
              text: clean(value, 1000)
            }))
          }
        ]
      }
    })
  });

  const data = await response
    .json()
    .catch(() => ({}));

  return {
    ok: response.ok,
    data
  };
}


// -----------------------------
// API Handler
// -----------------------------

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed."
    });
  }

  try {

    // Frontend already saves booking into Supabase.
    // This API only sends WhatsApp notifications.
    const booking =
      req.body?.booking ||
      req.body ||
      {};


    const name = clean(
      booking.customer_name ||
      booking.name,
      100
    );


    const customerPhone =
      customerWhatsAppPhone(
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


    const details =
      extractBookingDetails(message);


    const property = clean(
      booking.property_type ||
      details.property ||
      "Not provided",
      100
    );


    const location = clean(
      booking.location ||
      details.location ||
      "Not provided",
      150
    );


    const offer = clean(
      booking.offer ||
      details.offer ||
      "15% OFF",
      80
    );


    const wantsWhatsApp =
      details.wantsWhatsApp;


    // -----------------------------
    // Basic validation
    // -----------------------------

    if (
      !name ||
      customerPhone.length < 10
    ) {
      return res.status(400).json({
        error:
          "Valid customer name and phone are required."
      });
    }


    // -----------------------------
    // WhatsApp configuration check
    // -----------------------------

    if (
      !WA_TOKEN ||
      !WA_PHONE_ID ||
      !OWNER_PHONE
    ) {

      console.log(
        "WhatsApp notification is not configured."
      );

      return res.status(202).json({
        ok: true,
        notification: "not_configured"
      });
    }


    // -----------------------------
    // Founder / Owner Notification
    // -----------------------------

    const owner =
      await sendTemplate(
        OWNER_PHONE,
        OWNER_TEMPLATE,
        OWNER_LANGUAGE,
        [
          name,
          `+${customerPhone}`,
          property,
          location,
          offer
        ]
      );


    // -----------------------------
    // Customer WhatsApp Thank You
    // -----------------------------

    let customer = {
      ok: false,
      skipped: true
    };


    if (
      wantsWhatsApp &&
      CUSTOMER_TEMPLATE
    ) {

      customer =
        await sendTemplate(
          customerPhone,
          CUSTOMER_TEMPLATE,
          CUSTOMER_LANGUAGE,
          [
            name,
            property,
            location,
            "Gururag Interior"
          ]
        );
    }


    // -----------------------------
    // Server Log
    // -----------------------------

    console.log(
      "Booking WhatsApp notification:",
      {
        ownerSent: owner.ok,

        customerSent:
          customer.ok,

        customerSkipped:
          customer.skipped,

        bookingId:
          booking.id || null,

        customerName:
          name,

        customerPhone:
          customerPhone,

        property:
          property,

        location:
          location,

        offer:
          offer,

        service:
          service
      }
    );


    // -----------------------------
    // Response
    // -----------------------------

    return res.status(200).json({

      ok: true,

      founderNotification:
        owner.ok
          ? "sent"
          : "failed",

      customerNotification:
        customer.skipped
          ? "skipped"
          : customer.ok
            ? "sent"
            : "failed"
    });


  } catch (error) {

    console.error(
      "Booking notification error:",
      error
    );

    return res.status(500).json({
      error:
        "Notification service error."
    });
  }
}
