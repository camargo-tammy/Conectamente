document.addEventListener("DOMContentLoaded", () => {
    // 1. Modo Escuro
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            themeBtn.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
        });
    }

    // 2. Exercício de Respiração Guiada (4-7-8)
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
                { texto: "Segure a respiração...", tempo: 7 },
                { texto: "Expire lentamente pela boca...", tempo: 8 }
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

    // 3. Mural de Mensagens Dinâmico
    const form = document.getElementById("form-apoio");
    const listaMensagens = document.getElementById("lista-mensagens");

    if (form && listaMensagens) {
        form.addEventListener("submit", (e) => {
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