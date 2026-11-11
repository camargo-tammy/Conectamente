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

    // Função auxiliar para desenhar as mensagens na caixa de chat
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

            // Envia a mensagem do usuário
            adicionarMensagemChat("Você", texto, "user-msg");
            chatInput.value = "";

            // Analisa o texto para responder
            const textoMin = texto.toLowerCase();
            let respostaBot = "";

            if (textoMin.includes("triste") || textoMin.includes("mal") || textoMin.includes("deprimido")) {
                respostaBot = "Sinto muito que você esteja se sentindo assim. Lembre-se de que dias difíceis passam. Quer tentar o exercício de respiração abaixo?";
            } else if (textoMin.includes("ansioso") || textoMin.includes("ansiedade") || textoMin.includes("panico") || textoMin.includes("pânico")) {
                respostaBot = "Tente focar no momento presente. Faça uma pausa e experimente a ferramenta de Respiração Guiada nesta página!";
            } else if (textoMin.includes("obrigad") || textoMin.includes("valeu") || textoMin.includes("obrigada")) {
                respostaBot = "De nada! Estou sempre aqui se precisar de um momento de apoio.";
            } else if (textoMin.includes("ajuda") || textoMin.includes("socorro") || textoMin.includes("188")) {
                respostaBot = "Se precisar de apoio emocional imediato, ligue gratuitamente para o CVV no número 188. Eles atendem 24h por dia.";
            } else {
                respostaBot = "Obrigado por compartilhar. Lembre-se de ir um passo de cada vez e cuidar de você hoje!";
            }

            // Responde após 0.7 segundos
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
        formMural.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = document.getElementById("mensagem-input");
            const texto = input.value.trim();

            if (texto !== "") {
                const novoCard = document.createElement("div");
                novoCard.className = "card-mensagem-mural";
                novoCard.innerHTML = `<p>"${texto}"</p><small>— Enviado anonimamente</small>`;
                listaMensagens.prepend(novoCard);
                input.value = "";
            }
        });
    }
});