(function startSpeechSynthesis() {

    //SpeechSynthesis Web-API   https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis
    const utterance = new SpeechSynthesisUtterance();
    let voices = [];
    const voicesDropdown = document.querySelector('[name="voice"]');
    const options = document.querySelectorAll('[type="range"], [name="text"]');
    const speakButton = document.querySelector('#speak');
    const stopButton = document.querySelector('#stop');


    utterance.text = document.querySelector('[name="text"]').value; //assigning the text area content to utterance;

    //Gets the voices from the API, then filters out the non-english voices, then adds the voices to the dropdown menu;
    function populateVoices() {
        voices = this.getVoices();
        voicesDropdown.innerHTML = voices
            .filter(voice => voice.lang.includes('en')) //only English voices
            .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
            .join('');
    }



    //Set the api voice to the user's chosen voice
    function setVoices() {
        utterance.voice = voices.find(voice => voice.name === this.value)
    }



    //to start over or stop;
    function toggle(startOver = true) {
        speechSynthesis.cancel();
        if (startOver) {
            speechSynthesis.speak(utterance)
        }
    }


    //To change the rate, pitch;
    function utteranceOptions() {
        utterance[this.name] = this.value;
        toggle();
    }

    speechSynthesis.addEventListener('voiceschanged', populateVoices);
    voicesDropdown.addEventListener('change', setVoices);
    speakButton.addEventListener('click', toggle);
    stopButton.addEventListener('click', () => toggle(false));
    options.forEach(option => option.addEventListener('change', utteranceOptions));
}())