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

function handleDecipherButtonClick() {
    const fromText = document.querySelector(".from-text");
    const resultOutput = document.querySelector('.to-text');

    let text = fromText.value.trim();
    let cleanText = quitarTildes(text);

    resultOutput.textContent = 'Buscando valores a y b...';
    const { letra1, letra2 } = obtenerDosLetrasMasFrecuentes(cleanText);

    // Obtener la posición de letra1 y letra2 en el alfabeto
    const posicionLetra1 = alphabet.indexOf(letra1);
    const posicionLetra2 = alphabet.indexOf(letra2);

    // Imprimir los resultados
    console.log(`La letra más frecuente es "${letra1}" y su posición en el alfabeto es ${posicionLetra1}.`);
    console.log(`La segunda letra más frecuente es "${letra2}" y su posición en el alfabeto es ${posicionLetra2}.`);

    const { a, b } = resolverSistemaDeEcuaciones(posicionLetra1, posicionLetra2);

    console.log("El valor de a es:", a);
    console.log("El valor de b es:", b);

    var realA = a;

    const a_input = document.getElementById("a_input");
    const b_input = document.getElementById("b_input");
    a_input.value = a;
    b_input.value = b;

    if (a < 0) {
      console.log("El valor de a es negativo, por lo que se sumará 27 para obtener el valor positivo.");
      realA = a + 27;
      console.log(realA);
    }
    
    resultOutput.textContent = 'Desencriptando...';

    if (isNaN(a) || isNaN(b)) {
        resultOutput.textContent = 'No se pudieron encontrar los valores a y b.';
    } 
    else {
      const ciphertext = affineCipherDecrypt(cleanText, a, b);
      resultOutput.textContent = ciphertext;
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
  var data = Object.values(frecuencia);
  
  var ctx = document.createElement('canvas').getContext('2d');
  var ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Frecuencia de Letras',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          stepSize: 1
        }
      }
    }
  });

  var sortedData = data.slice().sort(function(a, b) { return b - a; });
  var firstLetterFreq = sortedData[0];
  var secondLetterFreq = sortedData[1];
  var totalLetters = letras.length;
  var firstLetterPercentage = (firstLetterFreq / totalLetters * 100).toFixed(2);
  var secondLetterPercentage = (secondLetterFreq / totalLetters * 100).toFixed(2);

  var popupAnswerLabel = document.getElementsByClassName('popup-answer')[0];
  popupAnswerLabel.textContent = `Las dos letras más frecuentes son: "${labels[data.indexOf(firstLetterFreq)]}" con un ${firstLetterPercentage}% y "${labels[data.indexOf(secondLetterFreq)]}" con un ${secondLetterPercentage}% de frecuencia.`;
}


$(document).ready( function() {
    document.getElementById('cipher-button').addEventListener('click', handleCipherButtonClick);
    document.getElementById('decipher-button').addEventListener('click', handleDecipherButtonClick);

    //document.getElementById('frecuency-button').addEventListener('click', handleFrecuencyButtonClick);

    document.querySelector("#close").addEventListener("click", function() {
        document.querySelector(".popup").style.display = "none";
    });
});