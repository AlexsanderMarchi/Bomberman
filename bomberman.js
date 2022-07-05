//Método criador de inimigo
function Inimigo(forma){
    this.forma = forma;

    formaInimigo(xi, yi, 10);   //A forma dele
    andarInimigo();             //A movimentação dele
}





// função que cria a forma do inimigo.
function formaInimigo(xi, yi, raioi) {

    pincel.fillStyle = 'firebrick';
    pincel.beginPath();
    pincel.arc(xi, yi, raioi, 0, 2 * Math.PI);
    pincel.fill();
}

// função que cria a movimentação dos inimigos.
function andarInimigo() {

    xi = Math.floor(Math.random() * tabela); //método para aparecer em outra posição dentro da tabela
    yi = Math.floor(Math.random() * tabela);

    
}
 
// função que cria o objeto.
function personagem(posicaox, posicaoy, raio) {

    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.arc(posicaox, posicaoy, raio, 0, 2 * Math.PI);
    pincel.fill();
}

// função que cria a bomba.
function bomba(xb, yb, raiob) {

    pincel.fillStyle = 'firebrick';
    pincel.beginPath();
    pincel.arc(xb, yb, raiob, 0, 2 * Math.PI);
    pincel.fill();
}

function criarParede(parede1, raiop) {

    for (var i=0; i < parede1.length; i ++){
    pincel.fillStyle = 'firebrick';
    pincel.beginPath();
    pincel.arc(parede1[i][0], parede1[i][1], raio, 0, 2 * Math.PI);
    pincel.fill();
    }
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
   
    personagem(posicaox, posicaoy, 10);

    bomba(xb, yb, 10)

    new Inimigo();
    
    
    
    
}


// função que determina pra onde o objeto irá se movimentar.
function leDoTeclado(evento) {

    if(evento.keyCode == cima && posicaoy - espacoAndar > 0) {
        posicaoy = posicaoy - espacoAndar;

    } else if (evento.keyCode == baixo && posicaoy + espacoAndar < 450) {
        posicaoy = posicaoy + espacoAndar;

    } else if (evento.keyCode == esquerda && posicaox - espacoAndar > 0) {
        posicaox = posicaox - espacoAndar;

    } else if (evento.keyCode == direita && posicaox + espacoAndar < 450) {
        posicaox = posicaox + espacoAndar;
    }

    if(evento.keyCode == espaco){
        xb = posicaox;
        yb = posicaoy;
    }
}




// Váriaveis que define a posição inicial da maçã verde.
var xi = 412.5;
var yi = 412.5;

var xb;
var yb;

var tela = document.querySelector('canvas'); // Váriavel que seleciona a tela.
var pincel = tela.getContext('2d'); // Váriavel usada para pintar na tela.

// Váriavel que define a posição do objeto.
var posicaox = 12.5;
var posicaoy = 12.5;

// códigos do teclado
var esquerda = 37;
var cima = 38;
var direita = 39;
var baixo = 40;
var espaco = 32;

var parede1 = [[37.5,37.5],[],[],[]];
// Quantidade de pixel que o objeto se movimenta.
var espacoAndar = 25;

var tabela = 450;

setInterval(atualizaTela, 20); // função para chamar o "atualizaTela" em um intervalo de tempo dado como segundo parâmetro.

document.onkeydown = leDoTeclado;