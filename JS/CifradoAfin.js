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

function encontrarParametrosAfin(ciphertext) {
  let frecuencias = {};
    for (let i = 0; i < ciphertext.length; i++) {
        let char = ciphertext.charAt(i);
        if (alphabet.includes(char)) {
            if (frecuencias[char]) {
                frecuencias[char]++;
            } else {
                frecuencias[char] = 1;
            }
        }
    }

    let letraMasFrecuente1 = Object.keys(frecuencias).reduce(function(a, b) { return frecuencias[a] > frecuencias[b] ? a : b });
    delete frecuencias[letraMasFrecuente1];
    let letraMasFrecuente2 = Object.keys(frecuencias).reduce(function(a, b) { return frecuencias[a] > frecuencias[b] ? a : b });

    let a = (alphabet.indexOf(letraMasFrecuente1) - alphabet.indexOf(letraMasFrecuente2) + alphabet.length) % alphabet.length;
    let b = (alphabet.indexOf('K') - a * alphabet.indexOf('A')) % alphabet.length;
    if (b < 0) {
        b += alphabet.length;
    }

    return { a: a, b: b };
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

    let parametros = encontrarParametrosAfin(cleanText);
    let b = parametros.b;
    let a = parametros.a;
    let m = 27;
    console.log(a, b);

    // Utilizamos un bucle para probar todos los posibles valores de "a" (0 a 26)
    for (let i = 0; i < 27; i++) {
      if ((i * 4) % m === (23 - b)) {
        console.log("El valor de a es:", i);
        a = i;
        break; // Salimos del bucle cuando encontramos el valor de a
      }
    }

    console.log(a, b);
    
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