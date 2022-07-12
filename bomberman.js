
// função que cria o personagem jogavel.
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


//Método criador de inimigo
function Inimigo(forma){
    this.forma = forma;

    formaInimigo(xi, yi, 10);   //A forma dele
    andarInimigo();             //A movimentação dele
}



// função que cria a forma do inimigo.
function formaInimigo(xi, yi, raioi) {

    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.arc(xi, yi, raioi, 0, 2 * Math.PI);
    pincel.fill();
}

// função que cria a movimentação dos inimigos.
function andarInimigo() {

    /*
    Contador para fazer o ciclo de movimentação, no caso a cada 20 milésimos de segundos,
    a tela é reiniciada, e tambem é somada 50 ao contador, e quando chega a 2000 (2 segundos),
    ele move o personagem.
    */
    contadorInimigo += 50;

    if(contadorInimigo === 2000){
    
    //método para definir se a direção é horizontal ou vertical
    var direcaoXorY = Math.floor(Math.random() * 2); 

    var direcaoX = Math.floor(Math.random() * 2); //método para definir qual direção ele vai na horizontal.
    var direcaoY = Math.floor(Math.random() * 2); //método para definir qual direção ele vai na vertical.
    
    /*
    direcaoXorY = 0 <- horizontal
    direcaoXorY = 1 <- vertical

    Depois de selecionado se é horizontal ou vertical, ele define se ele vai para tras ou para frente.
    direcaoX = 0 <- esquerda
    direcaoX = 1 <- direita
    direcaoY = 0 <- cima
    direcaoY = 1 <- baixo
    */

    //Inimigo indo para a esquerda
    if (direcaoX === 0 && direcaoXorY === 0 && xi > 25){
        xi = xi - 25;  
    }
    //Inimigo indo para a direita
    if (direcaoX === 1 && direcaoXorY === 0 && xi < tabela- 25){
        xi = xi + 25;  
    }
    //Inimigo indo para cima
    if (direcaoY === 0 && direcaoXorY === 1 && yi > 25){
        yi = yi - 25;  
    }
    //Inimigo indo para baixo
    if (direcaoY === 1 && direcaoXorY === 1 && yi < tabela - 25){
        yi = yi + 25;  
    }
    
    //Consoles para verificação da movimentação.
    console.log(direcaoXorY + " <- XorY");
    console.log(direcaoX + " <- X");
    console.log(direcaoY + " <- Y");
    
    //Depois de atingir 2000 (2 segundos), ele reinicia.
    contadorInimigo = 0;
    }
    
}
 
function colisao(){

    //Assim que o personagem encosta no inimigo, a pagina da um reload, como se tivesse perdido o jogo.
    if(posicaox === xi && posicaoy === yi){
        document.location.reload(true);
    }
}

function criarParede(parede1, raiop) {

    for(var i = 1; i<=parede1.length-1;i++){


        if(i>=1) parede1[i] = [];
        parede1[i][2] = true;
        
        parede1[i][0] = parede1[i-1][0]+ 25;
        parede1[i][1] = parede1[i-1][1]; 
        
        if(parede1[i][0] === tabela + 12.5){
            parede1[i][0] = 12.5;
            parede1[i][1] += 25; 
        }
        

        parede1[2][2] = false;

    }

    for (var i=0; i < parede1.length; i ++){

        if(parede1[i][2]){
            pincel.fillStyle = 'firebrick';
            pincel.beginPath();
            pincel.arc(parede1[i][0], parede1[i][1], raiop, 0, 2 * Math.PI);
            pincel.fill();
        }

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
    
    criarParede(parede1, 10);
    
    colisao();
    
}


// função que determina pra onde o objeto irá se movimentar.
function leDoTeclado(evento) {

    if(evento.keyCode == cima && posicaoy - espacoAndar > 0) {

        posicaoy = posicaoy - espacoAndar;
        /*for(var i = 0; i<=parede1.length-1;i++){
            
            if(posicaox != parede1[i][0] && posicaoy != parede1[i][1]){
                posicaoy = posicaoy - espacoAndar;
            }
        }*/

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




// Váriaveis que define a posição inicial do inimigo.
var xi = 412.5;
var yi = 412.5;

// Váriaveis usadas para definir a posição da bomba quando solta.
var xb;
var yb;

var tela = document.querySelector('canvas'); // Váriavel que seleciona a tela.
var pincel = tela.getContext('2d'); // Váriavel usada para pintar na tela.

// Váriavel que define a posição do bomberman.
var posicaox = 12.5;
var posicaoy = 12.5;

// códigos do teclado
var esquerda = 37;
var cima = 38;
var direita = 39;
var baixo = 40;
var espaco = 32;




//Vetor para criar a parede, foi usado new Array para poder definir o tamanho do vetor.
var parede1 = new Array(150);
parede1[0] = [62.5,12.5, true];



// Quantidade de pixel que o objeto se movimenta.
var espacoAndar = 25;

var contadorInimigo = 0;

var tabela = 450;

setInterval(atualizaTela, 20); // função para chamar o "atualizaTela" em um intervalo de tempo dado como segundo parâmetro.

document.onkeydown = leDoTeclado;