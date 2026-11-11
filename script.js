document.addEventListener("DOMContentLoaded", () => {
    console.log("ConectaMente JS carregado com sucesso!");

    // 1. Botão para alternar Modo Escuro / Modo Claro
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            themeBtn.textContent = isDark ? "☀️ Modo Claro" : "🌙 Modo Escuro";
        });
    }

    // 2. Simulação de envio de mensagem rápida de apoio
    const form = document.getElementById("form-apoio");
    const feedback = document.getElementById("feedback-mensagem");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const input = document.getElementById("mensagem-input");
            if (input.value.trim() !== "") {
                feedback.textContent = "💚 Obrigado por compartilhar sua mensagem de apoio!";
                feedback.style.color = "#2e7d32";
                input.value = "";
            } else {
                feedback.textContent = "Por favor, digite uma mensagem antes de enviar.";
                feedback.style.color = "#d32f2f";
            }
        });
    }
});