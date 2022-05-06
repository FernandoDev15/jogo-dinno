const personagem = document.querySelector('.personagem');
const imagemFundo = document.querySelector('.imagemFundo');
let EstaNoPulo = false;
let position = 0;

/*
    Ao pressionar o botão espaço aciona a function clicouEspaço() verifica o códego da tecla e return a function jump().
*/
const clicouEspaco = (pressionou) => {
    if(pressionou.keyCode === 32) {  
        if(!EstaNoPulo) { 
            return jump();
        }
    }
}

/*
    function Jump(), faz modificações no css para movimentar o personagem.
*/

const jump = () => {
   
    EstaNoPulo = true;

    let upInterval = setInterval(() => {
        if(position >= 150) {
            clearInterval(upInterval);
            // Descer
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    EstaNoPulo = false;
                } else {
                    position -= 20;
                    personagem.style.bottom = position + 'px';
                }
            },20);
        } else {
            //subindo
            position += 20;
            personagem.style.bottom = position + 'px';
        }    
    },20)   
}
/*
    Gerando Obstáculos aleatórios 
*/
const criarObstaculos = () => {
    const obstaculos = document.createElement('div');
    let obstaculosPosition = 1000;
    let tempoAleatorio = Math.random() * 6000;

    obstaculos.classList.add('obstaculosStyle');
    obstaculos.style.left = 1000 + 'px';
    imagemFundo.appendChild(obstaculos);
    
    let leftInterval = setInterval(() =>{
        if(obstaculosPosition <= -60) {
            clearInterval(leftInterval);
            imagemFundo.removeChild(obstaculos);
        } 
        else if(obstaculosPosition > 0 && obstaculosPosition < 60 &&position < 60) {
            // fim de jogo
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="fim_de_jogo">Game Over</h1>'
        }
        else {
            obstaculosPosition -= 10;
            obstaculos.style.left = obstaculosPosition + 'px';
        } 

    },25);

    setTimeout(criarObstaculos, tempoAleatorio)
}

document.addEventListener('keyup', clicouEspaco); 
criarObstaculos();