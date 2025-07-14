function paginaBoasVindas() {
    alert("Seja bem-vindo ao nosso site!");

    const conteudo = document.getElementById("conteudo");
    conteudo.innerHTML = `
        <h1>Bem-vindo à nossa página!</h1>
        <p>Estamos felizes por você estar aqui. Explore o site e aproveite o conteúdo.</p>
        <p><em>"Acredite em você e tudo será possível."</em></p>
        <p><button id="abrirCartao">Clique aqui para abrir seu cartão virtual</button></p>
    `;
    document.getElementById("abrirCartao").addEventListener("click", () => {
        abrirCartao();
    });
}
function abrirCartao() {
    const conteudoCartao = document.getElementById("conteudo-cartao");
    conteudoCartao.innerHTML = `
        <p>Assine aqui:</p>
        <input type="text" id="assinatura" placeholder="Digite seu nome..." />
        <button id="confirmarAssinatura">Confirmar</button>
    `;
    document.getElementById("modalCartao").style.display = "block";

    document.getElementById("confirmarAssinatura").addEventListener("click", () => {
        const nome = document.getElementById("assinatura").value;
        conteudoCartao.innerHTML = `
            <h1>Olá, amigo!</h1>
            <p>Você é uma pessoa incrível! Muito obrigado por sua visita.</p>
            <p>Assinado por: <strong>${nome}</strong></p>
            <button id="fecharCartao">Fechar</button>
        `;
        document.getElementById("fecharCartao").addEventListener("click", fecharModal);
    });
}

// Fechar o modal
function fecharModal() {
    document.getElementById("modalCartao").style.display = "none";
}

// Alternar Tema
function setupThemeToggle() {
    const btn = document.getElementById("toggleTheme");
    const body = document.body;

    const savedTheme = localStorage.getItem("tema");
    if (savedTheme) {
        body.classList.toggle("dark", savedTheme === "dark");
    }

    btn.addEventListener("click", () => {
        const isDark = body.classList.toggle("dark");
        localStorage.setItem("tema", isDark ? "dark" : "light");
    });
}

// Fechar modal ao clicar no X
function setupModalClose() {
    document.getElementById("fecharModal").addEventListener("click", fecharModal);
    window.addEventListener("click", (e) => {
        if (e.target.id === "modalCartao") {
            fecharModal();
        }
    });
}

// Inicializar tudo
window.onload = function () {
    paginaBoasVindas();
    setupThemeToggle();
    setupModalClose();
};