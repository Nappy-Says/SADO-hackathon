var audioTrack = WaveSurfer.create({
    container: '.audio',
    waveColor: '#CECECE',
    progressColor: '#03C2EC',
    barwidth: 2
});

audioTrack.load("/static/audio/first.m4a");

const playButton = document.querySelector('.play-btn');
const pauseButton = document.querySelector('.pause-btn');


playButton.addEventListener('click', () => {
    audioTrack.playPause();
});








function changeImage(img) {
    
    console.log(img.src);
    console.log("http://" + window.location.host + "/static/img/play.svg");
    if ( img.src == "http://" + window.location.host + "/static/img/play.svg" ) {
        img.src = "/static/img/pause.svg";
    
    }
    else {  
        img.src = "/static/img/play.svg";
    }
    

    
}