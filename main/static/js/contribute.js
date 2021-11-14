const options = { mimeType: 'audio/webm' };
const recordedChunks = [];
const downloadLink = document.getElementById('download');
const stopButton = document.getElementById('stop');
let sstop = false

obj = {}
function init() {
    obj.canvas = document.getElementById('canvas');
    obj.ctx = obj.canvas.getContext('2d');
    obj.width = window.innerWidth / 3;
    obj.height = window.innerHeight / 3;
    obj.canvas.width = obj.width * window.devicePixelRatio;
    obj.canvas.height = obj.height * window.devicePixelRatio;
    obj.canvas.style.width = obj.width + 10 + 'px';
    obj.canvas.style.height = obj.width / 7 + 'px';
    obj.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    document.body.appendChild(obj.canvas);
}

function randomInteger(max = 256) {
    return Math.floor(Math.random() * max);
}
let timeOffset = 10;
let now = parseInt(performance.now()) / timeOffset;

function loop() {
    obj.ctx.clearRect(0, 0, obj.canvas.width, obj.canvas.height);
    let max = 0;

    if (parseInt(performance.now() / timeOffset) > now) {
        now = parseInt(performance.now() / timeOffset);
        obj.analyser.getFloatTimeDomainData(obj.frequencyArray)
        for (var i = 0; i < obj.frequencyArray.length; i++) {
            if (obj.frequencyArray[i] > max) {
                max = obj.frequencyArray[i];
            }
        }

        var freq = Math.floor(max * 650);


        obj.bars.push({
            x: obj.width,
            y: (obj.height / 2) - (freq / 2),
            height: freq,
            width: 5
        });
    }
    draw();
    if (sstop != true) {
        requestAnimationFrame(loop);
    }
}
obj.bars = [];

function draw() {
    for (i = 0; i < obj.bars.length; i++) {
        const bar = obj.bars[i];
        obj.ctx.fillStyle = `rgb(${bar.height * 2},100,222)`;
        obj.ctx.fillRect(bar.x, bar.y, 1, bar.height);
        // obj.ctx.fillRect(bar.x, bar.y, bar.width, bar.height);
        bar.x = bar.x - 2;

        if (bar.x < 1) {
            obj.bars.splice(i, 1)
        }

    }
}

const handleSuccess = function (stream) {

    const mediaRecorder = new MediaRecorder(stream, options);
    var AudioContext = (window.AudioContext || window.webkitAudioContext)
    var audioContent = new AudioContext();
    var streamSource = audioContent.createMediaStreamSource(stream);

    obj.analyser = audioContent.createAnalyser();


    mediaRecorder.addEventListener('dataavailable', function (e) {
        if (e.data.size > 0) recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', function () {
        downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
        downloadLink.download = 'acetest.wav';
        timeOffset = -1
    });

    stopButton.addEventListener('click', function () {
        sstop = true
        console.log('asdasd')
        mediaRecorder.stop();
    });

    mediaRecorder.start();

    streamSource.connect(obj.analyser);
    obj.analyser.fftSize = 512;
    obj.frequencyArray = new Float32Array(obj.analyser.fftSize);


    soundAllowed()

};

function soundAllowed() {
    init()
    loop()
}


navigator.mediaDevices.getUserMedia({ audio: true }).then(handleSuccess)

//Define vars to hold time values
let seconds = 0;
let minutes = 0;
let hours = 0;

//Define vars to hold "display" value
let displaySeconds = 0;
let displayMinutes = 0;
let displayHours = 0;

//Define var to hold setInterval() function
let interval = null;

//Define var to hold stopwatch status
let possition = "stopped";

//Stopwatch function (logic to determine when to increment next value, etc.)
function stopWatch() {

    seconds++;

    //Logic to determine when to increment next value
    if (seconds / 60 === 1) {
        seconds = 0;
        minutes++;

        if (minutes / 60 === 1) {
            minutes = 0;
            hours++;
        }

    }

    //If seconds/minutes/hours are only one digit, add a leading 0 to the value
    if (seconds < 10) {
        displaySeconds = "0" + seconds.toString();
    }
    else {
        displaySeconds = seconds;
    }

    if (minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    }
    else {
        displayMinutes = minutes;
    }

    if (hours < 10) {
        displayHours = "0" + hours.toString();
    }
    else {
        displayHours = hours;
    }

    //Display updated time values to user
    document.getElementById("display").innerHTML = displayHours + ":" + displayMinutes + ":" + displaySeconds;

}

const  startStop = () => {

    if (possition === "stopped") {

        //Start the stopwatch (by calling the setInterval() function)
        interval = window.setInterval(stopWatch, 1000);
        document.getElementById("startStop").innerHTML = "Stop";
        possition = "started";

    }
    else {

        window.clearInterval(interval);
        document.getElementById("startStop").innerHTML = "Start";
        possition = "stopped";

    }

}

