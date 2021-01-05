(function startSpeechRecognition() {

  // allowed is used to only restart voice-rec if the user pressed start;
  let allowed = false;
  const startButton = document.querySelector(".start-rec");
  const stopButton = document.querySelector(".stop-rec");


  //SpeechRecognition Web-API   https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
  window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.interimResults = true;      //return results that aren't final
  recognition.lang = 'en-US';


  //Results are stored in a P element, then appened to the text area;
  let p = document.createElement("p");
  const words = document.querySelector(".words");
  words.appendChild(p);



  function restart() {
    if (allowed) {
      recognition.start();
    }
  }

  function startRec() {
    allowed = true;
    recognition.start();
  }

  function stopRec() {
    allowed = false;
    recognition.abort();
  }


  recognition.addEventListener('result', e => {
    let transcript = [...e.results][0][0].transcript;      //only return the last transcript result;
    p.textContent = transcript;

    if (e.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);
    }
  });
  recognition.addEventListener('end', restart);
  startButton.addEventListener('click', startRec);
  stopButton.addEventListener('click', stopRec);
}())

