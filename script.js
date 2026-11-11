document.addEventListener("DOMContentLoaded", () => {
    // 1. Modo Escuro / Modo Claro
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            themeBtn.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
        });
    }

    // Função para desenhar as mensagens na caixa de chat
    function adicionarMensagemChat(autor, texto, classeCss) {
        const chatMessages = document.getElementById("chat-messages");
        if (!chatMessages) return;

        const div = document.createElement("div");
        div.className = `msg-chat ${classeCss}`;
        div.innerHTML = `<strong>${autor}:</strong> <span class="msg-texto">${texto}</span>`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 2. Chat Virtual com Respostas por Palavras-Chave
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");

    if (chatForm && chatInput) {
        chatForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const texto = chatInput.value.trim();
            if (!texto) return;

            // 1. Envia a mensagem do utilizador para o ecrã
            adicionarMensagemChat("Você", texto, "user-msg");
            chatInput.value = "";

            // 2. Processa a resposta do bot
            const textoMin = texto.toLowerCase();
            let respostaBot = "";

            if (textoMin.includes("triste") || textoMin.includes("mal") || textoMin.includes("deprimido")) {
                respostaBot = "Sinto muito que te sintas assim. Lembra-te de que dias difíceis passam. Queres tentar o exercício de respiração abaixo?";
            } else if (textoMin.includes("ansioso") || textoMin.includes("ansiedade") || textoMin.includes("panico") || textoMin.includes("pânico")) {
                respostaBot = "Tenta focar no momento presente. Faz uma pausa e experimenta a ferramenta de Respiração Guiada nesta página!";
            } else if (textoMin.includes("obrigad") || textoMin.includes("valeu") || textoMin.includes("obrigada")) {
                respostaBot = "De nada! Estou sempre aqui se precisares de um momento de apoio.";
            } else if (textoMin.includes("ajuda") || textoMin.includes("socorro") || textoMin.includes("188")) {
                respostaBot = "Se precisares de apoio emocional imediato, liga gratuitamente para o CVV no número 188. Eles atendem 24h por dia.";
            } else {
                respostaBot = "Obrigado por partilhares. Lembra-te de ir um passo de cada vez e cuidar de ti hoje!";
            }

            // 3. Responde após um pequeno atraso (0.7 segundos)
            setTimeout(() => {
                adicionarMensagemChat("Assistente ConectaMente", respostaBot, "bot-msg");
            }, 700);
        });
    }

    // 3. Respiração Guiada
    const btnRespiracao = document.getElementById("btn-respiracao");
    const timerDisplay = document.getElementById("timer-respiracao");

    if (btnRespiracao && timerDisplay) {
        let emExecucao = false;
        btnRespiracao.addEventListener("click", () => {
            if (emExecucao) return;
            emExecucao = true;
            btnRespiracao.disabled = true;

            const etapas = [
                { texto: "Inale pelo nariz...", tempo: 4 },
                { texto: "Segure o ar...", tempo: 4 },
                { texto: "Expire pela boca...", tempo: 6 }
            ];

            let ciclo = 0;
            function executarEtapa() {
                if (ciclo >= etapas.length) {
                    timerDisplay.textContent = "Excelente! Como se sente agora?";
                    btnRespiracao.disabled = false;
                    emExecucao = false;
                    return;
                }
                const atual = etapas[ciclo];
                let contagem = atual.tempo;
                timerDisplay.textContent = `${atual.texto} (${contagem}s)`;

                const intervalo = setInterval(() => {
                    contagem--;
                    if (contagem > 0) {
                        timerDisplay.textContent = `${atual.texto} (${contagem}s)`;
                    } else {
                        clearInterval(intervalo);
                        ciclo++;
                        executarEtapa();
                    }
                }, 1000);
            }
            executarEtapa();
        });
    }

    // 4. Mural de Mensagens de Apoio
    const formMural = document.getElementById("form-apoio");
    const listaMensagens = document.getElementById("lista-mensagens");

    if (formMural && listaMensagens) {
        formMural.addEventListener("submit// Lógica do Chat com palavras-chave
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