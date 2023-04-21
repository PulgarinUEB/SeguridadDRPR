// MARK: - Auth
firebase.auth().onAuthStateChanged(function(user) {
    
    if (user) {
        var user = firebase.auth().currentUser;
        console.log(assignedEntity);
    } 
    else {
        window.location.replace("./index.html")
    }
});

const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';

function quitarTildes(cadena) {
  var tildes = {
    'á': 'a',
    'é': 'e',
    'í': 'i',
    'ó': 'o',
    'ú': 'u',
    'Á': 'A',
    'É': 'E',
    'Í': 'I',
    'Ó': 'O',
    'Ú': 'U'
  };

  return cadena.replace(/[áéíóúÁÉÍÓÚ]/g, function(match) {
    return tildes[match];
  });
}

function resolverSistemaDeEcuaciones(X, Y) {
  console.log("Parametros: ", X, Y)
  const mod = 27;
  const E = 4;
  const A = 0;

  // Calcular inversos modulares
  const EInverso = euclidesExtendido(E, mod)[0];
  const AInverso = euclidesExtendido(A, mod)[0];

  // Resolver para a y b
  const a = ((X - Y) * EInverso) % mod;
  const b = ((Y - a * A) + mod) % mod;

  return { a, b };
}

function resolverSistemaDeEcuaciones2(X, Y) {
  console.log("Parametros: ", X, Y)
  const mod = 27;
  const E = 4;
  const A = 0;

  // Calcular inversos modulares
  const EInverso = euclidesExtendido(E, mod)[0];
  const AInverso = euclidesExtendido(A, mod)[0];

  // Resolver para a y b
  const aB = ((X - Y) * EInverso) % mod;
  const bB = ((Y - aB * A) + mod) % mod;

  return { aB, bB };
}

// Función auxiliar para calcular el inverso modular usando el algoritmo de Euclides extendido
function euclidesExtendido(a, b) {
  if (b === 0) {
    return [1, 0];
  }

  const [x, y] = euclidesExtendido(b, a % b);
  return [y, x - Math.floor(a / b) * y];
}

function obtenerDosLetrasMasFrecuentes(texto) {
  // Convertir el texto a minúsculas y eliminar espacios en blanco
  texto = texto.toUpperCase().replace(/\s/g, '');

  // Crear un objeto para contar la frecuencia de las letras
  const frecuenciaLetras = {};
  for (let letra of texto) {
    if (frecuenciaLetras[letra]) {
      frecuenciaLetras[letra]++;
    } else {
      frecuenciaLetras[letra] = 1;
    }
  }

  // Ordenar las letras por frecuencia descendente
  const letrasOrdenadas = Object.keys(frecuenciaLetras).sort((a, b) => frecuenciaLetras[b] - frecuenciaLetras[a]);

  // Obtener las dos primeras letras más frecuentes
  const letra1 = letrasOrdenadas[0];
  const letra2 = letrasOrdenadas[1];

  return { letra1, letra2 };
}

function affineCipherEncrypt(text, a, b) {
  let ciphertext = '';

  for (let i = 0; i < text.length; i++) {
    let char = text[i].toUpperCase();
    if (alphabet.includes(char)) {
      let x = alphabet.indexOf(char); // Índice del carácter en el alfabeto
      let encryptedChar = alphabet[(a * x + b) % 27]; // Cálculo del carácter cifrado
      ciphertext += encryptedChar;
    } else {
      ciphertext += char;
    }
  }

  return ciphertext;
}

function affineCipherDecrypt(ciphertext, a, b) {
  let plaintext = '';

  // Calcular el inverso multiplicativo de 'a' en el módulo 27
  let aInverse = 0;
  for (let i = 0; i < 27; i++) {
    if ((a * i) % 27 === 1) {
      aInverse = i;
      break;
    }
  }

  for (let i = 0; i < ciphertext.length; i++) {
    let char = ciphertext[i].toUpperCase();
    if (alphabet.includes(char)) {
      let y = alphabet.indexOf(char); // Índice del carácter cifrado en el alfabeto
      let decryptedCharIndex = ((aInverse * (y - b + 27)) % 27 + 27) % 27; // Cálculo del índice del carácter descifrado
      let decryptedChar = alphabet[decryptedCharIndex]; // Obtención del carácter descifrado
      plaintext += decryptedChar;
    } else {
      plaintext += char;
    }
  }

  return plaintext;
}

function handleCipherButtonClick() {
    const fromText = document.querySelector(".from-text");
    const resultOutput = document.querySelector('.to-text');
    const a_input = document.getElementById("a_input");
    const b_input = document.getElementById("b_input");

    const a = parseInt(a_input.value);
    const b = parseInt(b_input.value);

    let text = fromText.value.trim();
    let cleanText = quitarTildes(text);

    if (isNaN(a) || isNaN(b)) {
        resultOutput.textContent = 'Por favor ingrese valores numéricos para a y b.';
    } 
    else {
        const ciphertext = affineCipherEncrypt(cleanText, a, b);
        resultOutput.textContent = ciphertext;
    }
}

function textoEnEspañol(texto) {
  const frecuenciasEspañol = {
    "a": 0.1253,
    "b": 0.0142,
    "c": 0.0468,
    "d": 0.0586,
    "e": 0.1368,
    "f": 0.0069,
    "g": 0.0101,
    "h": 0.007,
    "i": 0.0625,
    "j": 0.0044,
    "k": 0.0004,
    "l": 0.0497,
    "m": 0.0315,
    "n": 0.0671,
    "ñ": 0.0034,
    "o": 0.0868,
    "p": 0.0251,
    "q": 0.0088,
    "r": 0.0687,
    "s": 0.0798,
    "t": 0.0463,
    "u": 0.0291,
    "v": 0.011,
    "w": 0.0002,
    "x": 0.0022,
    "y": 0.0101,
    "z": 0.0049,
  };
  
  const textoLimpio = texto.toLowerCase().replace(/[^a-zñ]/g, "");
  const frecuenciasTexto = {};
  
  for (let letra of textoLimpio) {
    if (letra in frecuenciasTexto) {
      frecuenciasTexto[letra]++;
    } else {
      frecuenciasTexto[letra] = 1;
    }
  }
  
  const totalLetras = Object.keys(frecuenciasTexto).reduce((acc, letra) => {
    return acc + frecuenciasTexto[letra];
  }, 0);
  
  const desviacionMaxima = 0.04; // valor arbitrario para determinar la desviación máxima aceptable
  
  for (let letra in frecuenciasTexto) {
    const frecuenciaTexto = frecuenciasTexto[letra] / totalLetras;
    const frecuenciaEspañol = frecuenciasEspañol[letra];
    const desviacion = Math.abs(frecuenciaTexto - frecuenciaEspañol);
    if (desviacion > desviacionMaxima) {
      return false;
    }
  }
  
  return true;
}


function handleDecipherButtonClick() {
    const fromText = document.querySelector(".from-text");
    const resultOutput = document.querySelector('.to-text');

    let text = fromText.value.trim();
    let cleanText = quitarTildes(text);

    resultOutput.textContent = 'Buscando valores a y b...';
    const { letra1, letra2 } = obtenerDosLetrasMasFrecuentes(cleanText);

    // Obtener la posición de letra1 y letra2 en el alfabeto (CASO 1 y 2)
    const posicionLetra1 = alphabet.indexOf(letra1);
    const posicionLetra2 = alphabet.indexOf(letra2);
   
    // Imprimir los resultados
    console.log(`La letra más frecuente es "${letra1}" y su posición en el alfabeto es ${posicionLetra1}.`);
    console.log(`La segunda letra más frecuente es "${letra2}" y su posición en el alfabeto es ${posicionLetra2}.`);

    const a_input = document.getElementById("a_input");
    const b_input = document.getElementById("b_input");
    
    // Método A
    const { a, b } = resolverSistemaDeEcuaciones(posicionLetra1, posicionLetra2);
    console.log("El valor de a es:", a);
    console.log("El valor de b es:", b);

    var realA = a;

    if (a < 0) {
      console.log("El valor de a es negativo, por lo que se sumará 27 para obtener el valor positivo.");
      realA = a + 27;
      console.log(realA);
    }

    // Método B
    const { aB, bB } = resolverSistemaDeEcuaciones2(posicionLetra2, posicionLetra1);
    console.log("El valor de aB es:", aB);
    console.log("El valor de bB es:", bB);

    var realAB = aB;

    if (aB < 0) {
      console.log("El valor de a es negativo, por lo que se sumará 27 para obtener el valor positivo.");
      realAB = aB + 27;
      console.log(realAB);
    }




    // Mensaje de desencriptando
    resultOutput.textContent = 'Desencriptando...';

    // RESULTADOS
    var resultadoA = "";
    var resultadoB = "";

    if (isNaN(a) || isNaN(b)) {
      resultadoA = 'No se pudieron encontrar los valores a y b en el método 1';
    } 
    else {
      resultadoA = affineCipherDecrypt(cleanText, realA, b);
      console.log("Resultado A: ", resultadoA);
    }

    if (isNaN(aB) || isNaN(bB)) {
      resultadoB = 'No se pudieron encontrar los valores a y b en el método 2';
    } 
    else {
      resultadoB = affineCipherDecrypt(cleanText, realAB, bB);
      console.log("Resultado B: ", resultadoB);
    }

    console.log("Resultado A2: ", resultadoA);
    console.log("Resultado B2: ", resultadoB);

    // Mostrar resultados
    if (textoEnEspañol(resultadoA)) {
      resultOutput.textContent = resultadoA;
      a_input.value = realA;
      b_input.value = b;
      console.log("Resultado A3: ", true);
    }
    else if (textoEnEspañol(resultadoB)) {
      resultOutput.textContent = resultadoB;
      a_input.value = realAB;
      b_input.value = bB;
      console.log("Resultado B3: ", true);
    }
    else {
      resultOutput.textContent = "No se encontro una solución creible :C";
      a_input.value = "";
      b_input.value = "";
      console.log("Resultado FINAL: ", false);
    }
}

function handleFrecuencyButtonClick() {

  const fromText = document.querySelector(".from-text");

  let text = fromText.value.trim();

  var frecuencia = {};
  var letras = text.replace(/ /g, '').split('');
  letras.forEach(function(letra) {
    if (!frecuencia[letra]) {
      frecuencia[letra] = 1;
    } else {
      frecuencia[letra]++;
    }
  });

  var labels = Object.keys(frecuencia);
  var data = Object.values(frecuencia).sort((a, b) => b - a);
  
  var ctx = document.createElement('canvas').getContext('2d');
  var ctx = document.getElementById('chart').getContext('2d');

  const colors = ['#E1BEE7', '#B39DDB', '#90CAF9', '#80CBC4', '#9CCC65', '#DCE775', '#FFD54F', '#FFB74D', '#FF8A65', '#A1887F'];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Frecuencia de Letras',
        data: data,
        backgroundColor: colors.slice(0, 4),
        borderColor: colors.slice(0, 4),
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1
          }
        }]
      }
    }
  });

  var sortedData = data.slice().sort(function(a, b) { return b - a; });
  var firstFourLetters = sortedData.slice(0, 4);

  var popupAnswerLabel = document.getElementsByClassName('popup-answer')[0];
  popupAnswerLabel.innerHTML = "Las cuatro letras más frecuentes son:<br>";
  firstFourLetters.forEach(function(freq) {
    var letter = labels[data.indexOf(freq)];
    var percentage = (freq / letras.length * 100).toFixed(2);
    popupAnswerLabel.innerHTML += `- "${letter}" con un ${percentage}% de frecuencia.<br>`;
  });
}






$(document).ready( function() {
    document.getElementById('cipher-button').addEventListener('click', handleCipherButtonClick);
    document.getElementById('decipher-button').addEventListener('click', handleDecipherButtonClick);

    document.getElementById('metodo1Btn').addEventListener('click', handleFrecuencyButtonClick);
    document.getElementById('metodo2Btn').addEventListener('click', handleFrecuencyButtonClick);

    document.querySelector("#close").addEventListener("click", function() {
        document.querySelector(".popup").style.display = "none";
    });
});