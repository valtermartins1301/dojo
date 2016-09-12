var ARRAYDEUNITARIOS = ["Um","Dois","Tres","Quatro","Cinco","Seis","Sete","Oito","Nove"];
var ARRAYDEZENA = ["Onze", "Doze", "Treze", "Quatorze", "Quinze", "Dezesseis", "Dezessete", "Dezoito", "Dezenove"];
var ARRAYDECIMAIS = ["Dez","Vinte","Trinta","Quarenta","Cinquenta","Sessenta","Setenta","Oitenta","Noventa"];
var ARRAYCENTENAS = ["Cem"];

function removeZeroEsquerda(ArrayValor) {
    return ArrayValor.map(function(elemento) {
        return elemento * 1;
    });
}

function quantidadeCasasDecimais(valor) {
    if (valor.indexOf(".") > -1 || valor.indexOf(",") > -1) {
        valor = valor.split(".")[0];
    }

    var numeroCaracteres = valor.length;
    console.log("quantidadeCasasDecimais: " + numeroCaracteres);
    return numeroCaracteres;
}

function getStringDoValor(valor){
    var valorString = valor.toString();
    var valorPrimeiraPosicao = valorString.charAt(0);
    var valorSegundaPosicao = Number(valorString.charAt(1));
    console.log("Valor da primeira posição: " + valorPrimeiraPosicao);

    var index = Number(valorPrimeiraPosicao) - 1;
    console.log("Valor em string: " + valorString);

    var resposta = "";
    if (quantidadeCasasDecimais(valorString) === 1) {
        console.log(ARRAYDEUNITARIOS[index]);
        resposta = ARRAYDEUNITARIOS[index];
    } else if(valor > 10 && valor < 20){
        index = valorSegundaPosicao - 1;
        console.log(ARRAYDEZENA[index]);
        resposta = ARRAYDEZENA[index];
    }else if(valor == 100){
        resposta = ARRAYCENTENAS[0];
    }else{
        resposta = ARRAYDECIMAIS[index];
        if( valorSegundaPosicao > 0) {
            index = valorSegundaPosicao - 1;
            resposta += ' e '+ ARRAYDEUNITARIOS[index];
        }
    }
    return resposta;
}

function getArrayValor(valor){
    var valorString = valor.toString();
    var ArrayValor = "";

    if(valorString.indexOf(".") > -1){
        ArrayValor = valorString.split(".");
    } else if(valorString.indexOf(",") > -1){
        ArrayValor = valorString.split(",");
    } else {
        ArrayValor = valorString.split();
    }

    if(ArrayValor[1] && ArrayValor[1] === '00') {
        ArrayValor = [ArrayValor[0]];
    }

    console.log("Valor em ArrayValor: " + ArrayValor);
    console.log("Valor em ArrayValor: " + typeof ArrayValor);
    return ArrayValor;
}

function getValorPorExtenso(arrayValor) {
    console.log(arrayValor);
    var resultado = "";

    for(var i=0; i < arrayValor.length; i++) {
        resultado += getStringDoValor(arrayValor[i]);
        if (i === 0) {
            resultado += " Reais";
            if(arrayValor.length > 1) {
                resultado += " e ";
            }
        } else {
            resultado += " Centavos";
        }
    }
    return resultado;
}

function main() {
    var valorInserido = document.getElementById("valorInserido").value;
    var tagResultado = document.getElementById("extenso");

    if(quantidadeCasasDecimais(valorInserido.toString()) > 2 ) {
        if (valorInserido > 100) {
            tagResultado.textContent = 'Não calcula mais que duas casas decimais';
            return false;
        }
    }

    var arrayValor = getArrayValor(valorInserido);
    var valorPorExtenso = getValorPorExtenso(removeZeroEsquerda(arrayValor));
    console.log("valorPorExtenso: ", valorPorExtenso);
    tagResultado.textContent = valorPorExtenso;

    return false;
}

// TODO:
// Falta resolver o plural do número '1'
// e o valor 100 com centavos
