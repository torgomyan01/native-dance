const bassContent = document.getElementById('bass-content');
const body = document.querySelector('.bass-content-parent');

const right = document.getElementById('right');
const mouth = document.getElementById('mouth');

const mountNew = 'M262 146C294.837 111.032 324 111.5 353 146';
const mountOld = 'M262 146C275 163 311.4 186.8 353 146';

let played = false;



bassContent.addEventListener('click', function () {

    if(played){
        return;
    }
    const audio = new Audio();
    audio.src = 'audio/2Pac-Dj Belite.mp3';

    const context = new AudioContext();
    const src = context.createMediaElementSource(audio);
    const analyser = context.createAnalyser();

    src.connect(analyser);
    analyser.connect(context.destination);

    // analyser.fftSize = 120;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    function renderFrame() {
        requestAnimationFrame(renderFrame);

        analyser.getByteFrequencyData(dataArray);

        const scale = dataArray[Math.floor(dataArray.length / 2)] / 100;
        const bass = Math.max.apply(Math, dataArray);

        if (bass >= 250) {
            changeBg();
            right.style.transform = `rotate3d(0, 0, 4, ${scale * 6}deg)`;
        } else {
            right.style.transform = `rotate3d(0, 0, 4, 0deg)`;
        }

        if(audio.currentTime > 18 && audio.currentTime < 20){
            mouth.setAttribute('d', mountNew)
        }
        //
        if(audio.currentTime > 38 && audio.currentTime < 39){
            mouth.setAttribute('d', mountOld)
        }

        if(audio.currentTime > 55 && audio.currentTime < 56){
            mouth.setAttribute('d', mountNew)
        }

        // console.log(audio.currentTime)

        const getBg = (count) => dataArray[Math.floor(dataArray.length / count)];

        if(audio.currentTime > 19){
            bassContent.style.transform = `scale(${bass >= 250 ? 1.1 : 1}) translateY(${bass >= 250 ? -30 : 0}px)`;
        }
        // bassContent.style.backgroundColor = `rgba(40, 120, ${getBg(2)}, 1)`;
    }

    audio.play().then(() => {
        renderFrame();

        played = true;
    })
})

function changeBg() {
    body.style.background = `rgba(${getRgbaRandomNumber(255)}, ${getRgbaRandomNumber(255)}, ${getRgbaRandomNumber(255)}, 0.1)`
}

function getRgbaRandomNumber(count) {
    return Math.floor(Math.random() * count);
}