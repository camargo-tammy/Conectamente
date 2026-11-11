// Lógica do Chat com palavras-chave
const chatForm = document.getElementById("chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

if (chatForm && chatInput && chatMessages) {
    chatForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const texto = chatInput.value.trim();
        if (!texto) return;

        // Exibe a mensagem do utilizador
        adicionarMensagemChat("Você", texto, "user-msg");
        chatInput.value = "";

        // Analisa o texto em minúsculas
        const textoMin = texto.toLowerCase();
        let respostaBot = "";

        if (textoMin.includes("triste") || textoMin.includes("mal") || textoMin.includes("deprimido")) {
            respostaBot = "Sinto muito que te sintas assim. Lembra-te de que dias difíceis passam. Queres tentar o exercício de respiração abaixo?";
        } else if (textoMin.includes("ansioso") || textoMin.includes("ansiedade") || textoMin.includes("pânico")) {
            respostaBot = "Tenta focar no momento presente. Faz uma pausa e experimenta a ferramenta de Respiração Guiada nesta página!";
        } else if (textoMin.includes("obrigad") || textoMin.includes("valeu")) {
            respostaBot = "De nada! Estou sempre aqui se precisares de um momento de apoio.";
        } else if (textoMin.includes("ajuda") || textoMin.includes("socorro") || textoMin.includes("188")) {
            respostaBot = "Se precisares de apoio emocional imediato, liga gratuitamente para o CVV no número 188. Eles atendem 24h por dia.";
        } else {
            respostaBot = "Obrigado por partilhares. Lembra-te de ir um passo de cada vez e cuidar de ti hoje!";
        }

        // Responde após um pequeno atraso
        setTimeout(() => {
            adicionarMensagemChat("Assistente ConectaMente", respostaBot, "bot-msg");
        }, 700);
    });
}