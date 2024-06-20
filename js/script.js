document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const speechSynthesis = window.speechSynthesis;
    let descriptions = {};

    // Function to load and parse the text file
    function loadTextFile(filename) {
        return fetch(filename)
            .then(response => response.text())
            .then(text => {
                const lines = text.split('\n');
                lines.forEach(line => {
                    const [id, description] = line.split(': ');
                    if (id && description) {
                        descriptions[id.trim()] = description.trim();
                    }
                });
            })
            .catch(error => console.error('Error loading text file:', error));
    }

    // Function to play the text-to-speech audio
    function playTextToSpeech(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(utterance);
    }

    // Load the text file and set up event listeners for the hotspots
    loadTextFile('audio/audio-guide.txt').then(() => {
        for (const id in descriptions) {
            const hotspot = document.getElementById(id);
            if (hotspot) {
                hotspot.addEventListener('mouseenter', () => playTextToSpeech(descriptions[id]));
                hotspot.addEventListener('mouseleave', () => speechSynthesis.cancel());

                hotspot.addEventListener('touchstart', () => playTextToSpeech(descriptions[id]));
                hotspot.addEventListener('touchend', () => speechSynthesis.cancel());
            }
        }
    });
});
