// Declara objeto para requisição e a executa 

var request = new XMLHttpRequest();

var valorReal;   // Variável para guardar o valor correto que deverá ser adivinhado

request.responseType = "json";   // Determina o formato de resposta como json

// Trabalha a mudança de estado e aplica as ações necessárias para cada caso

request.onreadystatechange = () => {

    // Verifica se ocorreu tudo certo com status = 200, significando Ok, e no 4 estado, que siguinifica que o processo foi concluido 
    if (request.status == 200 && request.readyState == 4) {
        console.log(request.response.value);
        valorReal = request.response.value;

    } else if (request.status >= 400) {   // Caso algum erro ocorra, ou seja, os status superiores a 400, irá mostrar o valor do status
                                          // Sendo entre (400-499) um erro do cliente e entre (500-599) um erro do servidor já que visamos apenas salientar os erros
                                          // Caso contrário poderia ser utilizada a partir do 300, em que incluiria as mensagens de redirecionamento
        mostrarNumero(request.status);

        var seg = document.getElementsByClassName('ligado');

        for(let contador = 0; contador < seg.length; contador++) {      // Deixará os seguimentos vermelhos
            seg[contador].classList.add('ligado-erro'); 
        }
        
        // Adiciona a mensagem de Erro junto ao botão "Novo jogo", também desabilitando o botão enviar 
        document.getElementById('mensagem').style.color = 'red';
        document.getElementById('mensagem').innerHTML = 'Erro';
        document.getElementById('reiniciar').innerHTML = '<button onclick="reiniciaJogo()" class="botao"><img src="recarregar.png" alt="recarregar">Novo jogo</button>';     
        document.querySelector('#enviar').disabled = true;
    }
}

// Abre e envia a requisição para o servidor definido utilizando o método GET, afim de recuperar o valor do número aleatório

request.open("GET", "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300");

request.send();


// Recuperar o palpite enviado ao clicar no botão Enviar

function getPalpite() {

    let elementoPalpite = document.getElementById('palpite');

    //Verifica o dado recebido e segue o programa ou zera o valor de entrada para poder aceitar apenas números

    if (isNaN(elementoPalpite.value) || elementoPalpite.value == '') {
        elementoPalpite.value = '';

    } else {
        let palpite = elementoPalpite.value;
    
        document.getElementById('palpite').value = ''
        mostrarNumero(palpite);                             // Mostra o valor do palpite no display
        comparaValor(valorReal, palpite);                   // Compara com o número secreto e toma a decisão de acordo com o resultado
    }
}

// Mostrar o número no display de leds quando solicidado, recebendo o valor como parâmetro
 
function mostrarNumero(palpite) {

    var numeroText = String(palpite);               // Converte o valor para String para poder tratar cada dígito individualmente

    var divNumero = document.getElementById('_numero');

    divNumero.innerHTML = ''                       // Limpa a div que guarda o display que inicialmente estava com o número 0

    var numero7seg = '';                         // Variável que receberá as strings dos dígitos construídos em HTML formando o número
    var digito = '';                             // Variável que será usada para guardar temporariamente o dígito construído em HTML

    // Somente são possíveis os digitos de 0 a 9, portanto, para cada valor de cada dígito da string do palpite haverá uma combinação de
    // HTML e CSS que visualmente representará o valor em um formato de display de 7 segmentos
    // Os segmentos são numerados em sentido horário, sendo o primeiro o do topo e o último sendo o central
    // A classe ligado dá a div a cor preta, simulando um LED ligado, da mesma forma, a classe desligado simula um LED desligado
    // A seguir o laço for verifica os digitos do número do palpite um a um, concatenando na variável ao final a estrutura correspondente

    for(var contador = 0; contador < numeroText.length; contador++) {
        if (numeroText[contador] == 0) {
            digito =`<div class="digito">
                        <div class="segmentos seg1 ligado"></div>
                        <div class="segmentos seg2 ligado"></div>
                        <div class="segmentos seg3 ligado"></div>
                        <div class="segmentos seg4 ligado"></div>
                        <div class="segmentos seg5 ligado"></div>
                        <div class="segmentos seg6 ligado"></div>
                        <div class="segmento-central seg7 desligado"></div>
                    </div>`; 
                    
        } else if (numeroText[contador] == 1){
            digito =`<div class="digito">
                        <div class="segmentos seg1 desligado"></div>
                        <div class="segmentos seg2 ligado"></div>
                        <div class="segmentos seg3 ligado"></div>
                        <div class="segmentos seg4 desligado"></div>
                        <div class="segmentos seg5 desligado"></div>
                        <div class="segmentos seg6 desligado"></div>
                        <div class="segmento-central seg7 desligado"></div>
                    </div>`; 

        } else if (numeroText[contador] == 2){
            digito =`<div class="digito">
                        <div class="segmentos seg1 ligado"></div>
                        <div class="segmentos seg2 ligado"></div>
                        <div class="segmentos seg3 desligado"></div>
                        <div class="segmentos seg4 ligado"></div>
                        <div class="segmentos seg5 ligado"></div>
                        <div class="segmentos seg6 desligado"></div>
                        <div class="segmento-central seg7 ligado"></div>
                    </div>`; 

        } else if (numeroText[contador] == 3){
            digito =`<div class="digito">
                        <div class="segmentos seg1 ligado"></div>
                        <div class="segmentos seg2 ligado"></div>
                        <div class="segmentos seg3 ligado"></div>
                        <div class="segmentos seg4 ligado"></div>
                        <div class="segmentos seg5 desligado"></div>
                        <div class="segmentos seg6 desligado"></div>
                        <div class="segmento-central seg7 ligado"></div>
                    </div>`; 

        } else if (numeroText[contador] == 4){
            digito =`<div class="digito">
                        <div class="segmentos seg1 desligado"></div>
                        <div class="segmentos seg2 ligado"></div>
                        <div class="segmentos seg3 ligado"></div>
                        <div class="segmentos seg4 desligado"></div>
                        <div class="segmentos seg5 desligado"></div>
                        <div class="segmentos seg6 ligado"></div>
                        <div class="segmento-central seg7 ligado"></div>
                    </div>`; 

        } else if (numeroText[contador] == 5){
            digito =`<div class="digito">
                        <div class="segmentos seg1 ligado"></div>
                        <div class="segmentos seg2 desligado"></div>
                        <div class="segmentos seg3 ligado"></div>
                        <div class="segmentos seg4 ligado"></div>
                        <div class="segmentos seg5 desligado"></div>
                        <div class="segmentos seg6 ligado"></div>
                        <div class="segmento-central seg7 ligado"></div>
                    </div>`; 

        } else if (numeroText[contador] == 6){
            digito =`<div class="digito">
                        <div  class="segmentos seg1 ligado"></div>
                        <div  class="segmentos seg2 desligado"></div>
                        <div  class="segmentos seg3 ligado"></div>
                        <div  class="segmentos seg4 ligado"></div>
                        <div  class="segmentos seg5 ligado"></div>
                        <div  class="segmentos seg6 ligado"></div>
                        <div  class="segmento-central seg7 ligado"></div>
                    </div>`; 

        } else if (numeroText[contador] == 7){
            digito =`<div class="digito">
                        <div  class="segmentos seg1 ligado"></div>
                        <div  class="segmentos seg2 ligado"></div>
                        <div  class="segmentos seg3 ligado"></div>
                        <div  class="segmentos seg4 desligado"></div>
                        <div  class="segmentos seg5 desligado"></div>
                        <div  class="segmentos seg6 desligado"></div>
                        <div  class="segmento-central seg7 desligado"></div>
                    </div>`; 

        } else if (numeroText[contador] == 8){
            digito =`<div class="digito">
                        <div class="segmentos seg1 ligado"></div>
                        <div class="segmentos seg2 ligado"></div>
                        <div class="segmentos seg3 ligado"></div>
                        <div class="segmentos seg4 ligado"></div>
                        <div class="segmentos seg5 ligado"></div>
                        <div class="segmentos seg6 ligado"></div>
                        <div class="segmento-central seg7 ligado"></div>
                    </div>`; 

        } else if (numeroText[contador] == 9){
            digito =`<div class="digito">
                        <div class="segmentos seg1 ligado"></div>
                        <div class="segmentos seg2 ligado"></div>
                        <div class="segmentos seg3 ligado"></div>
                        <div class="segmentos seg4 desligado"></div>
                        <div class="segmentos seg5 desligado"></div>
                        <div class="segmentos seg6 ligado"></div>
                        <div class="segmento-central seg7 ligado"></div>
                    </div>`; 
        }

        numero7seg += digito;       // Concatena as estruturas, montando o número no formato do display

    }

    divNumero.innerHTML = numero7seg;    // Coloca o valor que contém a estrutura final na div responsável pelo número, mostrando-o na tela
}

// Compara o valor do palpite com o numéro secreto, recebendo ambos como parâmetro

function comparaValor(valorReal, valorPalpite) {

    var mensagem = document.getElementById('mensagem');

    if (valorPalpite > valorReal) {                     // Caso o valor do palpite seja menor que o valor secreto, mostra "É maior"
        mensagem.innerHTML = 'É menor';

    } else if (valorPalpite < valorReal) {              // Caso o valor do palpite seja maior que o valor secreto, mostra "É menor"
        mensagem.innerHTML = 'É maior';

    } else if (valorPalpite == valorReal) {                  // Caso o valor do palpite seja igual ao valor secreto, mostra "Você acertou!!!!"
        var seg = document.getElementsByClassName('ligado');

        for(let contador = 0; contador < seg.length; contador++) {      // Deixa os LEDS (divs) com a cor verde
            seg[contador].classList.add('ligado-correto');
        }

        // Ao final adiciona o botão de nova partida e desabilida o botão de enviar palpite

        mensagem.style.color = 'limegreen';                           // Mostra a mensagem de vitória com a cor verde
        mensagem.innerHTML = 'Você acertou!!!!';
        document.getElementById('reiniciar').innerHTML = '<button onclick="reiniciaJogo()" class="botao"><img src="./imagens/icone_reload.svg" alt="recarregar">NOVA PARTIDA</button>';     
        document.querySelector('#enviar').disabled = true;
    }
}

// Ao apertar o botão "Novo jogo", reinicia o jogo, reiniciando a página, fazendo a requisição ser efetuada novamente

function reiniciaJogo() {                  // Função atribuída ao botão "Novo jogo"
    window.location.href = 'index.html';
}
