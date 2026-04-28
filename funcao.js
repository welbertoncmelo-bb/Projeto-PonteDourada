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

    const perfil = localStorage.getItem("perfil");
    const usuario = localStorage.getItem("usuario");
    const campoUsuario = document.getElementById("usuariologado");

    if (perfil && usuario && campoUsuario) {
        campoUsuario.innerText = usuario + " - " + perfil;
    }

    // ================= BLOQUEIO =================
    const paginaAtual = window.location.pathname;
    if (!perfil && !paginaAtual.includes("index.html") && !paginaAtual.includes("login.html")) {
        window.location.href = "index.html";
    }

    // ================= SELECT CUSTOM =================
    const selected = document.querySelector(".selected");
    const options = document.querySelector(".options");
    const optionItems = document.querySelectorAll(".option");

    let valorSelecionado = false;

    if (selected && options) {

        selected.addEventListener("click", (e) => {
            e.stopPropagation();
            options.style.display = options.style.display === "block" ? "none" : "block";
        });

        optionItems.forEach(opt => {
            opt.addEventListener("click", () => {
                selected.textContent = opt.textContent;
                valorSelecionado = true;
                options.style.display = "none";
            });
        });

        document.addEventListener("click", () => {
            options.style.display = "none";

            if (!valorSelecionado) {
                selected.textContent = "Selecione uma opção";
            }
        });
    }

    // ================= CARDS =================
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        const permitido = card.getAttribute("data-perfil");

        if (permitido && !permitido.includes(perfil)) {
            card.style.display = "none";
        }
    });

    // ================= MÁSCARAS =================
    const cnpj = document.getElementById('cnpj');
    const cpf = document.getElementById('cpf');
    const tel = document.getElementById('tel');
    const valor = document.getElementById('valor');

    if (cnpj) IMask(cnpj, { mask: '00.000.000/0000-00' });
    if (cpf) IMask(cpf, { mask: '000.000.000-00' });
    if (tel) IMask(tel, { mask: '(00) 00000-0000' });

    // ================= VALOR (CORRIGIDO) =================
    if (valor) {

        valor.addEventListener('input', function () {

            let numeros = this.value.replace(/\D/g, '');

            // Se apagou tudo
            if (!numeros) {
                this.value = "";
                return;
            }

            let numero = Number(numeros) / 100;

            // Segurança contra NaN
            if (isNaN(numero)) numero = 0;

            this.value = numero.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            });

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

// ================= LIMPAR VALOR (PARA CÁLCULO) =================
function limparValor(valorFormatado) {
    if (!valorFormatado) return 0;

    return Number(
        valorFormatado
            .replace("R$", "")
            .replace(/\./g, "")
            .replace(",", ".")
            .trim()
    ) || 0;
}