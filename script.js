// Lista de mulheres solicitada
const mulheres = [
    "Luana", 
    "Tania", 
    "Patricia", 
    "Vitoria", 
    "Dyelly", 
    "Cida dos Olhos Furados", 
    "Cidinha"
];

const sortearBtn = document.getElementById('sortearBtn');
const nameDisplay = document.getElementById('nameDisplay');
const celebrationModal = document.getElementById('celebrationModal');
const winnerNameElement = document.getElementById('winnerName');
const closeModalBtn = document.getElementById('closeModalBtn');
const floatingHeartsContainer = document.getElementById('floatingHearts');

// Gerar corações flutuantes dinamicamente no fundo
function createFloatingHearts() {
    const heartCount = 20;
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        
        // Tamanho aleatório
        const size = Math.random() * 15 + 10;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        
        // Posição horizontal aleatória
        heart.style.left = `${Math.random() * 100}%`;
        
        // Atraso e duração da animação aleatórios
        heart.style.animationDuration = `${Math.random() * 4 + 4}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        
        floatingHeartsContainer.appendChild(heart);
    }
}

// Efeito de suspense no sorteio (passa por vários nomes aleatórios antes de parar)
function iniciarSorteio() {
    sortearBtn.disabled = true;
    nameDisplay.classList.add('highlight');
    
    let counter = 0;
    const totalSteps = 25; // Quantidade de trocas de nomes até parar
    let speed = 50; // Velocidade inicial rápida
    
    function spin() {
        // Escolhe um nome aleatório para o efeito de rolagem da roleta
        const randomIndex = Math.floor(Math.random() * mulheres.length);
        nameDisplay.textContent = mulheres[randomIndex];
        
        counter++;
        
        if (counter < totalSteps) {
            // Aumenta gradualmente a velocidade (desaceleração)
            speed += 12;
            setTimeout(spin, speed);
        } else {
            // Sorteio final oficial
            const finalIndex = Math.floor(Math.random() * mulheres.length);
            const winner = mulheres[finalIndex];
            
            nameDisplay.textContent = winner;
            
            // Pequeno atraso para abrir o modal de comemoração
            setTimeout(() => {
                mostrarVencedora(winner);
            }, 600);
        }
    }
    
    spin();
}

// Exibir modal de vitória com confetes
function mostrarVencedora(winner) {
    winnerNameElement.textContent = winner;
    celebrationModal.classList.remove('hidden');
    
    // Disparar confetes com tema festivo / romântico
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ff1b6b', '#ffd700', '#ff4b2b', '#ffffff']
        });
    }
}

// Fechar modal e resetar
function reiniciarSorteio() {
    celebrationModal.classList.add('hidden');
    nameDisplay.textContent = "Pronto para o amor?";
    nameDisplay.classList.remove('highlight');
    sortearBtn.disabled = false;
}

// Eventos de clique
sortearBtn.addEventListener('click', iniciarSorteio);
closeModalBtn.addEventListener('click', reiniciarSorteio);

// Inicializar corações ao carregar a página
window.addEventListener('DOMContentLoaded', createFloatingHearts);