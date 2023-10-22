const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const socket = io('http://localhost:3000');  // Make sure this line is after Socket.io script in HTML

document.getElementById('startListening').addEventListener('click', () => {
    recognition.start();
});

recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript;
    console.log(`Recognized text: ${transcript}`);
    socket.emit('recognizedText', transcript);
});

recognition.addEventListener('error', (event) => {
    console.error(`Error occurred in recognition: ${event.error}`);
});
