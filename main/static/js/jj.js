let obj = {}
obj.bars = []

const recordedChunks = []
const options = { mimeType: 'audio/webm' }

let timeOffset = 10
let stopCallBack = false
let now = parseInt(performance.now()) / timeOffset



const start = () => {
    init()
    loop()
}

const init = () => {
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
    // obj.canvas = document.getElementById('canvas')
    // obj.ctx = obj.canvas.getContext('2d')

    // obj.width = window.innerWidth / 3
    // obj.height = window.innerHeight / 3
    // obj.canvas.width = obj.width * window.devicePixelRatio
    // obj.canvas.height = obj.height * window.devicePixelRatio
    // obj.canvas.style.width = obj.width + 'px'
    // obj.canvas.style.height = obj.width / 7 + 'px'

    // obj.ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    // document.body.appendChild(obj.canvas)
}


const loop = () => {
    let max = 0
    obj.ctx.clearRect(0, 0, obj.canvas.width, obj.canvas.height)

    if (parseInt(performance.now() / timeOffset) > now) {
        now = parseInt(performance.now() / timeOffset);
        obj.analyser.getFloatTimeDomainData(obj.frequencyArray)

        for (var i = 0; i < obj.frequencyArray.length; i++) {
            if (obj.frequencyArray[i] > max) {
                max = obj.frequencyArray[i]
            }
        }

        var freq = Math.floor(max * 650)

        obj.bars.push({
            x: obj.width,
            y: (obj.height / 2) - (freq / 2),
            height: freq,
            width: 5
        })
    }

    draw()

    if (stopCallBack != true) {
        requestAnimationFrame(loop)
    }
}


const draw = () => {
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


const handleSuccess = (stream) => {
    const mediaRecorder = new MediaRecorder(stream, options);
    var AudioContext = (window.AudioContext || window.webkitAudioContext)

    // stop = document.getElementById('stop')
    record = document.getElementById('record')

    var audioContent = new AudioContext()
    var streamSource = audioContent.createMediaStreamSource(stream)

    obj.analyser = audioContent.createAnalyser()


    mediaRecorder.addEventListener('dataavailable', e => {
        if (e.data.size > 0) recordedChunks.push(e.data);
    })

    mediaRecorder.addEventListener('stop', () => {
        downloadLink.href = URL.createObjectURL(new Blob(recordedChunks))
        downloadLink.download = 'PaymonaTest.wav'
        timeOffset = -1
    })

    stop.addEventListener('click', () => {
        stopCallBack = true
        mediaRecorder.stop()
    })

    mediaRecorder.start()
    streamSource.connect(obj.analyser)

    obj.analyser.fftSize = 512
    obj.frequencyArray = new Float32Array(obj.analyser.fftSize)

    start()
}


navigator.mediaDevices.getUserMedia({ audio: true }).then(handleSuccess)
