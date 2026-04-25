// ================= LOGIN =================
function enter() {
    let use = document.getElementById('login').value;
    let pass = document.getElementById('senha').value;

    if (use == "admin" && pass == "admin") {
        localStorage.setItem("perfil", "GESTOR");
        localStorage.setItem("usuario", use);

        alert("Seja Bem Vindo, " + use);
        window.location.href = "TelaPrincipal.html";

    } else if (use == "operacional" && pass == "opec2026") {
        localStorage.setItem("perfil", "ATENDIMENTO");
        localStorage.setItem("usuario", use);

        alert("Seja Bem Vindo, " + use);
        window.location.href = "TelaPrincipal.html";

    } else {
        alert("Email ou Usuário inválidos.");
        document.getElementById('senha').value = "";
    }
}

// ================= AO CARREGAR =================
document.addEventListener("DOMContentLoaded", function () {

    // 🔹 Mostrar usuário logado
    const perfil = localStorage.getItem("perfil");
    const usuario = localStorage.getItem("usuario");
    const campoUsuario = document.getElementById("usuariologado");

    if (perfil && usuario && campoUsuario) {
        campoUsuario.innerText = usuario + " - " + perfil;
    }

    // 🔹 Bloqueio de acesso
    if (!perfil) {
        window.location.href = "index.html";
    }

    // 🔹 Controle de cards por perfil
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const permitido = card.getAttribute("data-perfil");

        if (permitido && !permitido.includes(perfil)) {
            card.style.display = "none";
        }
    });

    // 🔹 Máscaras
    const cnpj = document.getElementById('cnpj');
    const cpf = document.getElementById('cpf');
    const tel = document.getElementById('tel');
    const valor = document.getElementById('valor');

    if (cnpj) IMask(cnpj, { mask: '00.000.000/0000-00' });
    if (cpf) IMask(cpf, { mask: '000.000.000-00' });
    if (tel) IMask(tel, { mask: '(00) 00000-0000' });

    // 🔹 Campo valor (corrigido)
    if (valor) {
        valor.addEventListener('input', () => {
            let numero = limpar(valor.value);
            numero = numero ? parseFloat(numero) / 100 : 0;

            valor.value = formatarBR(numero);

            if (typeof calcular === "function") {
                calcular();
            }
        });
    }
});

// ================= FUNÇÕES AUXILIARES =================
function irPara(pagina) {
    window.location.href = pagina;
}

function inserir(pagina) {
    alert("Cadastrado com Sucesso.");
    window.location.href = pagina;
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

// moeda BR
function formatarBR(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// limpa número
function limpar(valor) {
    return valor.replace(/\D/g, '');
}