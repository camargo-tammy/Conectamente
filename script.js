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

    // 2. Chat Virtual (Respostas Automáticas de Empatia e Autocuidado)
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");

    const respostasProntas = [
        "Sinto muito que você esteja passando por isso. Lembre-se de respirar fundo e ir um passo de cada vez.",
        "É normal se sentir assim às vezes. Tente fazer uma pausa, beber um copo d'água e descansar um pouco.",
        "Sua saúde mental importa. Se precisar conversar com alguém de forma anônima e gratuita, o CVV está disponível no número 188.",
        "Estou aqui para te ouvir! Que tal tentar o exercício de respiração guiada aqui na página?",
        "Você não precisa carregar tudo sozinho. Falar sobre o que sente é um ótimo primeiro passo."
    ];

    if (chatForm && chatInput && chatMessages) {
        chatForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const textoUsuario = chatInput.value.trim();
            if (!textoUsuario) return;

            // Mensagem do Usuário
            adicionarMensagemChat("Você", textoUsuario, "user-msg");
            chatInput.value = "";

            // Resposta Automática do Bot após 1 segundo
            setTimeout(() => {
                const respostaAleatoria = respostasProntas[Math.floor(Math.random() * respostasProntas.length)];
                adicionarMensagemChat("Assistente ConectaMente", respostaAleatoria, "bot-msg");
            }, 800);
        });
    }

    function adicionarMensagemChat(autor, texto, classeCss) {
        const div = document.createElement("div");
        div.className = `msg-chat ${classeCss}`;
        div.innerHTML = `<strong>${autor}:</strong> <span class="msg-texto">${texto}</span>`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
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