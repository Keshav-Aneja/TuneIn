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
const seeker = document.getElementById("seeker");
mainAudio.addEventListener("timeupdate", updateSeeker);
seeker.addEventListener("input", updatePlayer);

//Adding Loop functionality
const loop = document.getElementById("loop");
let looping = false;
loop.addEventListener("click", function () {
  if (looping) {
    loop.style.filter = `invert(0.4)`;
    looping = false;
  } else {
    loop.style.filter = "invert(1)";
    looping = true;
  }
});
function updateSeeker() {
  let progress = (mainAudio.currentTime * 100) / mainAudio.duration;
  seeker.value = progress;
  if (looping && progress >= 99) {
    seeker.value = 0;
    mainAudio.play();
  }
}
function updatePlayer() {
  mainAudio.currentTime = (seeker.value / 100) * mainAudio.duration;
}
