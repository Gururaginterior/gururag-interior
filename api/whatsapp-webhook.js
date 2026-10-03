const VERIFY_TOKEN =
  process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN ||
  "gururag_whatsapp_webhook_2026";

export default async function handler(req, res) {
  // Meta webhook verification
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (
      mode === "subscribe" &&
      token === VERIFY_TOKEN
    ) {
      return res.status(200).send(challenge);
    }

    return res.status(403).send("Forbidden");
  }

  // WhatsApp webhook events
  if (req.method === "POST") {
    console.log(
      "WhatsApp webhook received:",
      JSON.stringify(req.body)
    );

    return res.status(200).json({
      ok: true
    });
  }

  return res.status(405).json({
    error: "Method not allowed"
  });
}
