const songCards = document.querySelectorAll(".song-card");

for (let i = 0; i < 4; i++) {
  songCards[i].style.backgroundImage = `url("Assets/bg-${i}.jpg")`;
}

const mainAudio = document.querySelector(".mainAudio");
const playbtn = document.querySelector("#playBtn");
let playing = false;
const MusicControl = function () {
  if (playing) {
    playbtn.src = `Assets/play-button.png`;
    mainAudio.pause();
    playing = false;
  } else {
    playing = true;
    playbtn.src = `Assets/pause-button.png`;
    mainAudio.play();
  }
};

document.addEventListener("keydown", function (e) {
  if (e.key === " ") {
    MusicControl();
  }
});
playbtn.addEventListener("click", MusicControl);
const audioLength = mainAudio.duration;
const seeker = document.getElementById("seeker");
// seeker.max = audioLength;

mainAudio.addEventListener("timeupdate", updateSeeker);
seeker.addEventListener("input", updateMusic);
function updateSeeker() {
  let progress = (mainAudio.currentTime / audioLength) * 100;
  console.log(progress);
  seeker.value = progress;
  if (looping && progress === 100) {
    mainAudio.currentTime = 0;
    mainAudio.play();
    seeker.value = 0;
  }
}
function updateMusic() {
  console.log("updating music");
  mainAudio.currentTime = (seeker.value / 100) * audioLength;
}
let looping = false;
const loop = document.getElementById("loop");
loop.addEventListener("click", function () {
  console.log(looping);
  if (looping) {
    loop.style.filter = "invert(0.5)";
    looping = false;
  } else {
    loop.style.filter = "invert(1)";
    looping = true;
  }
});
