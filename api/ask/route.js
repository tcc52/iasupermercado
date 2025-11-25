import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { question } = await req.json();

    if (!question) {
      return Response.json(
        { error: "Você precisa enviar um campo 'question'" },
        { status: 400 }
      );
    }

    // Chamada ao modelo do Groq
    const completion = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages: [
        {
          role: "system",
          content: "Você é uma IA de supermercado. Responda sempre de forma curta e direta."
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    const resposta = completion.choices[0]?.message?.content || "Sem resposta.";

    return Response.json({ answer: resposta });

  } catch (err) {
    return Response.json(
      { error: "Erro no servidor: " + err.message },
      { status: 500 }
    );
  }
}
