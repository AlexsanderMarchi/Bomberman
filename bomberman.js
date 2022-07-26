
//PERSONAGEM BOMBERMAN

// função que cria a imagem do personagem jogavel.
function personagem(posicaox, posicaoy, raio) {

    pincel.fillStyle = 'black';
    pincel.beginPath();
    pincel.arc(posicaox, posicaoy, raio, 0, 2 * Math.PI);
    pincel.fill();
}

// função que determina pra onde o personagem irá se movimentar e soltar bomba, usando o teclado.
function movimentoPersonagem(evento) {

    //Para cima
    if(evento.keyCode == cima && posicaoy - espacoAndar > 0 ) {

        posicaoy = posicaoy - espacoAndar;

        //repetição caso tiver uma parede em cima do personagem.
        for(var i = 0; i<=parede1.length-1;i++){
            
            if(posicaox === parede1[i][0] && posicaoy === parede1[i][1] && parede1[i][2] ||
                posicaoy === yb && posicaox === xb){
                posicaoy += espacoAndar; 
            }
        }
    
    //Para baixo
    } else if (evento.keyCode == baixo && posicaoy + espacoAndar < 450 ) {
        posicaoy = posicaoy + espacoAndar;

        for(var i = 0; i<=parede1.length-1;i++){
            
            if(posicaox === parede1[i][0] && posicaoy === parede1[i][1] && parede1[i][2] ||
                posicaoy === yb && posicaox === xb){
                posicaoy -= espacoAndar; 
            }
        }

    //para esquerda
    } else if (evento.keyCode == esquerda && posicaox - espacoAndar > 0 ) {
        posicaox = posicaox - espacoAndar;

        for(var i = 0; i<=parede1.length-1;i++){
            
            if(posicaox === parede1[i][0] && posicaoy === parede1[i][1] && parede1[i][2] ||
                posicaoy === yb && posicaox === xb){
                posicaox += espacoAndar; 
            }
        }
    
    //Para direita
    } else if (evento.keyCode == direita && posicaox + espacoAndar < 450 ) {
        posicaox = posicaox + espacoAndar;

        for(var i = 0; i<=parede1.length-1;i++){
            
            if(posicaox === parede1[i][0] && posicaoy === parede1[i][1] && parede1[i][2] ||
                posicaoy === yb && posicaox === xb){
                posicaox -= espacoAndar; 
            }
        }
    }

    //condição que solta a bomba
    if(evento.keyCode == espaco){

        //condição para poder colocar a bomba apenas quando ela ja não tiver no jogo.
        if(xb === undefined && yb === undefined){
            xb = posicaox;
            yb = posicaoy;   
        }
        
    }
}


//BOMBA//

// função que cria a imagem da bomba.
function bomba(xb, yb, raiob) {

    pincel.fillStyle = 'firebrick';
    pincel.beginPath();
    pincel.arc(xb, yb, raiob, 0, 2 * Math.PI);
    pincel.fill();
}

// função com o funcionamento da bomba.
function raioBomba() {

    
    contadorBomba += 50

    if(contadorBomba === 8000){

        for(var i = 0; i<=parede1.length-1;i++){

            //console.log("X e Y: "+xb+" "+yb);
            //console.log(" " +i +" " +parede1[i][0] +" " + parede1[i][1]);
            if(xb+25 === parede1[i][0] && yb === parede1[i][1]){
                
                console.log("chegou no if"+i);
                
                parede1[i][2] = false;
            }
            if(xb-25 === parede1[i][0] && yb === parede1[i][1]){
                
                console.log("chegou no if"+i);
                
                parede1[i][2] = false;
            }
            if(xb === parede1[i][0] && yb+25 === parede1[i][1]){
                
                console.log("chegou no if"+i);
                
                parede1[i][2] = false;
            }
            if(xb === parede1[i][0] && yb-25 === parede1[i][1]){
                
                console.log("chegou no if"+i);
                
                parede1[i][2] = false;
            }
            
        }
        xb = undefined;
        yb = undefined;


    contadorBomba = 0;
    }


    
    
}

//INIMIGO

//Método criador de inimigo
function Inimigo(forma){
    this.forma = forma;

    formaInimigo(xi, yi, 10);   //A forma dele
    andarInimigo();             //A movimentação dele
}



// função que cria a forma do inimigo.
function formaInimigo(xi, yi, raioi) {

    pincel.fillStyle = 'purple';
    pincel.beginPath();
    pincel.arc(xi, yi, raioi, 0, 2 * Math.PI);
    pincel.fill();
}

// função que cria a movimentação e a colisão do inimigo.
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

        for(var i = 0; i<=parede1.length-1;i++){
            
            if(xi === parede1[i][0] && yi === parede1[i][1] && parede1[i][2]){
                xi += espacoAndar; 
            }
        }
    }
    //Inimigo indo para a direita
    if (direcaoX === 1 && direcaoXorY === 0 && xi < tabela- 25){
        xi = xi + 25;  

        for(var i = 0; i<=parede1.length-1;i++){
            
            if(xi === parede1[i][0] && yi === parede1[i][1] && parede1[i][2]){
                xi -= espacoAndar; 
            }
        }
    }
    //Inimigo indo para cima
    if (direcaoY === 0 && direcaoXorY === 1 && yi > 25){
        yi = yi - 25; 
        
        for(var i = 0; i<=parede1.length-1;i++){
            
            if(xi === parede1[i][0] && yi === parede1[i][1] && parede1[i][2]){
                yi += espacoAndar; 
            }
        }
    }
    //Inimigo indo para baixo
    if (direcaoY === 1 && direcaoXorY === 1 && yi < tabela - 25){
        yi = yi + 25; 
        
        for(var i = 0; i<=parede1.length-1;i++){
            
            if(xi === parede1[i][0] && yi === parede1[i][1] && parede1[i][2]){
                yi -= espacoAndar; 
            }
        }
    }

    //Assim que o personagem encosta no inimigo, a pagina da um reload, como se tivesse perdido o jogo.
    if(posicaox === xi && posicaoy === yi){
        document.location.reload(true);
    }
    
    //Consoles para verificação da movimentação.
    console.log(direcaoXorY + " <- XorY");
    console.log(direcaoX + " <- X");
    console.log(direcaoY + " <- Y");
    
    //Depois de atingir 2000 (2 segundos), ele reinicia.
    contadorInimigo = 0;
    }
    
}
 

function criarParede() {

    //Repetição que cria os vetores da parede.
    for(var i = 1; i<=parede1.length-1;i++){


        if(i>=1) parede1[i] = [];
        parede1[i][2] = true;

        
        
        parede1[i][0] = parede1[i-1][0]+ 25;
        parede1[i][1] = parede1[i-1][1]; 
        
        //Condição para fazer a parede pular uma linha abaixo quando chega na extremidade direita.
        if(parede1[i][0] === tabela + 12.5){
            parede1[i][0] = 12.5;
            parede1[i][1] += 25; 
            
        }
    
    }


    //lugares onde nao é criado a parede, pois foi mudado para false
    parede1[25][2] = parede1[16][2] = parede1[300][2] = parede1[34][2] = parede1[36][2]= false;

    //Repetição que cria o formato da parede
    

}


function desenharParede(raiop){ 
    for (var i=0; i < parede1.length; i ++){

        //Só vai criar o formato da parede se a terceira posição de cada vetor for true;
        if(parede1[i][2]){
            pincel.fillStyle = 'green';
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

// função para atualizar a tela.
function atualizaTela() {

    limpaTela();

    //console.log(parede1);
   
    personagem(posicaox, posicaoy, 10);

    bomba(xb, yb, 10);

    desenharParede(10);

    raioBomba();

    new Inimigo();
    
    colisao();
    
}


// Váriaveis que define a posição inicial do inimigo.
var xi = 412.5;
var yi = 437.5;

// Váriaveis usadas para definir a posição da bomba quando solta.
var xb;
var yb;

//Contador bomba
var contadorBomba = 0;

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
var parede1 = new Array(312);
parede1[0] = [62.5,12.5, true];



// Quantidade de pixel que o objeto se movimenta.
var espacoAndar = 25;

//contador para fazer o ciclo do inimigo para se movimentar.
var contadorInimigo = 0;

var tabela = 450;


criarParede(10);

setInterval(atualizaTela, 20); // função para chamar o "atualizaTela" em um intervalo de tempo dado como segundo parâmetro.

document.onkeydown = movimentoPersonagem;