export async function GET() {
  return Response.json({
    status: "online",
    message: "API funcionando! Use POST para enviar mensagens."
  });
}

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body || !body.message) {
      return Response.json(
        { error: "Envie um campo 'message' no body." },
        { status: 400 }
      );
    }

    // Aqui vai a lógica da sua IA
    const resposta = "Recebi sua mensagem: " + body.message;

    return Response.json({ resposta });
  } catch (e) {
    return Response.json(
      { error: "Erro ao processar requisição.", detalhe: e.message },
      { status: 500 }
    );
  }
}
