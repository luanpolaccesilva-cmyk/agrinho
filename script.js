// 1. Variáveis do jogo (Estado inicial)
let producao = 0;
let ambiente = 100;

// Elementos do HTML que o JS vai controlar
const numProducao = document.getElementById("producao");
const numAmbiente = document.getElementById("ambiente");
const areaFazenda = document.getElementById("fazenda");

// 2. Função para Colher Alimentos
function colherAlimento() {
    producao += 10;
    // Produzir muito sem cuidado gasta o solo (reduz o ambiente)
    ambiente -= 5; 
    atualizarPlacar();
}

// 3. Função para Plantar Árvores (Ação Sustentável)
function plantarArvore() {
    if (ambiente < 100) {
        ambiente += 10;
        if (ambiente > 100) ambiente = 100; // Limita em 100%
        atualizarPlacar();
    }
}

// 4. Função para atualizar a tela
function atualizarPlacar() {
    numProducao.innerText = producao;
    numAmbiente.innerText = ambiente;

    // Condição de Game Over
    if (ambiente <= 0) {
        alert("Fim de Jogo! O meio ambiente foi destruído. Busque o equilíbrio!");
        reiniciarJogo();
    }
}

// 5. Mecânica de Desafio: Aparecer Pragas na Lavoura
function criarPraga() {
    const praga = document.createElement("div");
    praga.classList.add("praga");
    praga.innerText = "🐛"; // Ícone da praga

    // Posição aleatória dentro da área da fazenda
    const x = Math.random() * (areaFazenda.clientWidth - 30);
    const y = Math.random() * (areaFazenda.clientHeight - 30);
    praga.style.left = `${x}px`;
    praga.style.top = `${y}px`;

    // Se o jogador clicar na praga, ele usa "Controle Biológico" e salva o ambiente
    praga.onclick = function() {
        praga.remove();
        ambiente += 5; // Recompensa por cuidar da natureza
        if (ambiente > 100) ambiente = 100;
        atualizarPlacar();
    };

    areaFazenda.appendChild(praga);

    // Se a praga ficar muito tempo na tela sem ser clicada, ela estraga o ambiente
    setTimeout(() => {
        if (praga.parentNode) {
            praga.remove();
            ambiente -= 15;
            atualizarPlacar();
        }
    }, 4000); // 4 segundos para clicar
}

// Loop do jogo: faz uma praga aparecer a cada 3 segundos
setInterval(criarPraga, 3000);

// 6. Função para reiniciar o jogo
function reiniciarJogo() {
    producao = 0;
    ambiente = 100;
    areaFazenda.innerHTML = "";
    atualizarPlacar();
}