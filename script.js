document.addEventListener("DOMContentLoaded", () => {
    // Modo Escuro
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            themeBtn.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
        });
    }

    // Lógica do Chat Interativo
    const chatForm = document.getElementById("chat-form");
    const chatInput = document.getElementById("chat-input");
    const chatMessages = document.getElementById("chat-messages");

    if (chatForm && chatInput && chatMessages) {
        chatForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const mensagemUsuario = chatInput.value.trim();
            if (!mensagemUsuario) return;

            // 1. Exibe a mensagem do usuário na tela
            adicionarMensagemChat("Você", mensagemUsuario, "user-msg");
            chatInput.value = "";

            // 2. Exibe indicador de carregamento
            const botLoading = adicionarMensagemChat("Assistente ConectaMente", "Digitando...", "bot-msg loading");

            try {
                // 3. Envia a pergunta para o servidor Java
                const resposta = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ mensagem: mensagemUsuario })
                });

                const dados = await resposta.json();
                botLoading.classList.remove("loading");
                botLoading.querySelector(".msg-texto").textContent = dados.resposta;
            } catch (erro) {
                botLoading.classList.remove("loading");
                botLoading.querySelector(".msg-texto").textContent = 
                    "Desculpe, tive um problema ao conectar. Se precisar de ajuda urgente, ligue 188 (CVV).";
            }
        });
    }

    function adicionarMensagemChat(autor, texto, classeCss) {
        const div = document.createElement("div");
        div.className = `msg-chat ${classeCss}`;
        div.innerHTML = `<strong>${autor}:</strong> <span class="msg-texto">${texto}</span>`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return div;
    }
});