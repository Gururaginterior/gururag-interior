export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "OPENAI_API_KEY is not configured.",
    });
  }

  try {
    const { message, history = [], service = "" } = req.body || {};

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required.",
      });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            (item) =>
              item &&
              (item.role === "user" || item.role === "bot") &&
              typeof item.text === "string"
          )
          .slice(-10)
      : [];

    const previousConversation = safeHistory
      .map(
        (item) =>
          `${item.role === "user" ? "Customer" : "Assistant"}: ${item.text}`
      )
      .join("\n");

    const systemPrompt = `
You are the website assistant for Gururag Interior.

COMPANY:
Gururag Interior
Founder: Saran Raj
Experience: 13+ Years
Completed Projects: 1,500+
Phone / WhatsApp: +91 99402 77984

SERVICES:
Carpentry Works, Modular Kitchens, Wardrobes, PVC/WPC/UPVC Works,
Glass Partitions, Office Furniture, Painting, Waterproofing,
Civil Works, False Ceiling, Electrical Works and complete interior solutions.

YOUR JOB:
Answer the customer's actual question naturally.

IMPORTANT:
- Do not force the customer to use predefined questions.
- Do not depend on the website's default question buttons.
- Answer new questions even when they are completely different from previous questions.
- Do not repeat an old answer when the customer asks something new.
- Use the previous conversation only to understand context.
- Answer follow-up questions based on what the customer previously asked.
- If the customer asks about Gururag Interior, use the company information above.
- Never invent company facts.
- Never invent exact prices.
- For pricing questions, explain that the final price depends on size, materials, finish, hardware and project scope.
- If you do not know a company-specific detail, say that the customer can contact Gururag Interior for confirmation.
- If the customer asks a normal general question, answer it normally when possible.
- If the question is unclear, ask a short clarification.
- Keep answers useful and reasonably concise.
- Do not use emojis.
- Do not use Chinese, Korean, Japanese or unusual Unicode characters.
- Use simple English text.
${service ? `Current service context: ${service}` : ""}
`;

    const input = [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text: systemPrompt,
          },
        ],
      },
    ];

    if (previousConversation) {
      input.push({
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Previous conversation:\n${previousConversation}`,
          },
        ],
      });
    }

    input.push({
      role: "user",
      content: [
        {
          type: "input_text",
          text: message,
        },
      ],
    });

    const response = await fetch(
      "https://api.openai.com/v1/responses",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-5.6-luna",
          input,
          max_output_tokens: 500,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error:
          data?.error?.message ||
          "AI request failed.",
      });
    }

    const reply =
      data.output_text ||
      data.output
        ?.flatMap((item) => item.content || [])
        ?.map((item) => item.text)
        ?.filter(Boolean)
        ?.join("\n") ||
      "Sorry, I could not generate a response right now.";

    return res.status(200).json({
      reply,
    });
  } catch (error) {
    return res.status(500).json({
      error: "AI assistant is temporarily unavailable.",
    });
  }
}
