document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');

    document.querySelectorAll('.hotspot').forEach(hotspot => {
        const playAudio = () => {
            const audioFile = hotspot.getAttribute('data-audio');
            audioPlayer.src = audioFile;
            audioPlayer.play();
        };

        const stopAudio = () => {
            audioPlayer.pause();
            audioPlayer.currentTime = 0;
        };

        hotspot.addEventListener('mouseenter', playAudio);
        hotspot.addEventListener('mouseleave', stopAudio);

        hotspot.addEventListener('touchstart', playAudio);
        hotspot.addEventListener('touchend', stopAudio);
    });
});
