//Constantes do sistema.
var ARRAY_DE_UNITARIOS = ["Um", "Dois", "Tres", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove"];
var ARRAY_DECIMAIS = ["Dez", "Vinte", "Trinta", "Quarenta", "Cinquenta", "Sessenta", "Setenta", "Oitenta", "Noventa"];
var ARRAY_DEZENA = ["Onze", "Doze", "Treze", "Quatorze", "Quinze", "Dezesseis", "Dezessete", "Dezoito", "Dezenove"];
var ARRAY_CENTENAS = ["Cem"];

//Remove zero a esquerda dos valores.
function removeZeroEsquerda(ArrayValor) {
    return ArrayValor.map(function(elemento) {
        return elemento * 1;
    });
}

// Retorna o nome por extenso de um numero
function getStringDoValor(valor) {
    var valorString = valor.toString();
    var valorPrimeiraPosicao = valorString.charAt(0);
    var valorSegundaPosicao = valorString.charAt(1);
    var resposta = "";
    var index = valorPrimeiraPosicao - 1;

    console.log("Valor em string: " + valorString);
    if (valor < 10) {
        console.log(ARRAY_DE_UNITARIOS[index]);
        resposta = ARRAY_DE_UNITARIOS[index];
    } else if (valor > 10 && valor < 20) {
        index = valorSegundaPosicao - 1;
        console.log(ARRAY_DEZENA[index]);
        resposta = ARRAY_DEZENA[index];
    } else if (valor == 100) {
        resposta = ARRAY_CENTENAS[0];
    } else {
        resposta = ARRAY_DECIMAIS[index];
        if (valorSegundaPosicao > 0) {
            index = valorSegundaPosicao - 1;
            resposta += ' e ' + ARRAY_DE_UNITARIOS[index];
        }
    }
    return resposta;
}

//Transformar o valor recebido em um array, separando por '.' ou ','
function getArrayValor(valor) {
    var valorString = valor.toString();
    var ArrayValor = "";

    if (valorString.indexOf(".") > -1) {
        ArrayValor = valorString.split(".");
    } else if (valorString.indexOf(",") > -1) {
        ArrayValor = valorString.split(",");
    } else {
        ArrayValor = valorString.split();
    }

    //se casa decimal não possuir valor remove do array ex: 2.00
    //array vai ser igual á [2]
    var resposta = ArrayValor.filter(function(valor, index) {
        if (index === 1) {
            return true;
        }
        return valor > 0;
    });

    return removeZeroEsquerda(resposta);
}

//Retorna a string com o valor por extenso.
function getValorPorExtenso(arrayValor) {
    console.log(arrayValor);
    var resultado = "";

    arrayValor.forEach(function(valor,index) {
        resultado += getStringDoValor(valor);
        if (index === 0) {
            resultado += " Reais ";
            if (arrayValor.length > 1) {
                resultado += " e ";
            }
        } else {
            resultado += " Centavos";
        }
    });
    return resultado;
}

// TODO:
// - Resolver o plural do número '1'
function main() {
    var valorInserido = Number(document.getElementById("valorInserido").value);
    var tagResultado = document.getElementById("extenso");

    //Limitando para calcular de 0 a 100
    if (valorInserido >= 101) {
        tagResultado.textContent = 'No momento só funciona com valores entre 0 e 100';
        return false;
    }

    var arrayValor = getArrayValor(valorInserido);
    var valorPorExtenso = getValorPorExtenso(arrayValor);
    console.log("valorPorExtenso: ", valorPorExtenso);

    tagResultado.textContent = valorPorExtenso;
}
