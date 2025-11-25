import { Groq } from "groq-sdk";
import supermarketInfo from "../services/supermarketInfo.js";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { question } = req.body;

    const context = supermarketInfo(question);

    const prompt = `
Você é a IA oficial do app de supermercado. Responda somente com base nisso:
${context}

Pergunta: ${question}
    `;

    const response = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "user", content: prompt }
      ]
    });

    res.status(200).json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao gerar resposta" });
  }
}
