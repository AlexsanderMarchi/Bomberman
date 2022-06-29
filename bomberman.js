var tela = document.querySelector('canvas'); // Váriavel que seleciona a tela.
var pincel = tela.getContext('2d'); // Váriavel usada para pintar na tela.

// Váriavel que define a posição do objeto.
var x = 12.5;
var y = 12.5;

// códigos do teclado
var esquerda = 37
var cima = 38
var direita = 39
var baixo = 40

// Quantidade de pixel que o objeto se movimenta.
var taxa = 25;

// função que cria o objeto.
function desenhaCirculo(x, y, raio) {

    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.arc(x, y, raio, 0, 2 * Math.PI);
    pincel.fill();
}

// função que desenha o grid.
function limpaTela() {
    var descer = 0; 
    while(descer <=450){
        for(var imp= 0; imp<=450;imp=imp+25){
            pincel.fillStyle = "lightyellow";
            pincel.strokeStyle = "black";
            pincel.beginPath();
            pincel.rect(imp, descer, 25, 25);
            pincel.closePath();
            pincel.fill();
            pincel.stroke();     
        }
        descer = descer + 25; 
    }    
}

// função para atualizar a tela, desenhando o grid e o objeto.
function atualizaTela() {

    limpaTela();
   
    desenhaCirculo(x, y, 10);
    
}

setInterval(atualizaTela, 20); // função para chamar o "atualizaTela" em um intervalo de tempo dado como segundo parâmetro.

// função que determina pra onde o objeto irá se movimentar.
function leDoTeclado(evento) {

    if(evento.keyCode == cima) {
        y = y - taxa;

    } else if (evento.keyCode == baixo) {
        y = y + taxa;

    } else if (evento.keyCode == esquerda) {
        x = x - taxa;

    } else if (evento.keyCode == direita) {
        x = x + taxa;
    }
}


document.onkeydown = leDoTeclado;