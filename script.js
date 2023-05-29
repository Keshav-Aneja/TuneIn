const songCards = document.querySelectorAll(".song-card");

for (let i = 0; i < 4; i++) {
  songCards[i].style.backgroundImage = `url("Assets/bg-${i}.jpg")`;
}
//Adding All the music cards:
const trendCards = document.querySelectorAll(".trend-card");
console.log(trendCards);

const trendSongs = {
  song0: {
    name: "Japanese Lofi Music",
    artist: "Siannel",
    source: "Audio/Lofi Japanese.mp3",
    coverImg: "Assets/trend-1.jpg",
  },
  song1: {
    name: "Shaolin Temple Music",
    artist: "Lofi MMO",
    source: "Audio/shaolin temple.mp3",
    coverImg: "Assets/trend-2.jpg",
  },
  song2: {
    name: "Interstellar Main Theme",
    artist: "Hans Zimmer",
    source: "Audio/Interstellar.mp3",
    coverImg: "Assets/trend-3.jpg",
  },
  song3: {
    name: "Dark Knight Rises",
    artist: "Hans Zimmer",
    source: "Audio/Dark Night Rises.mp3",
    coverImg: "Assets/trend-4.jpg",
  },
  song4: {
    name: "Suzume",
    artist: "Fujii Kaze",
    source: "Audio/suzume.mp3",
    coverImg: "Assets/trend-6.jpg",
  },
  song5: {
    name: "Rain Music - Relaxing",
    artist: "Study Relaxing Music",
    source: "Audio/rain music.mp3",
    coverImg: "Assets/trend-5.jpg",
  },
  song6: {
    name: "Shinunoga E-wa",
    artist: "Fujii Kaze",
    source: "Audio/Shinonigaewa.mp3",
    coverImg: "Assets/trend-7.jpg",
  },
};
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
const playerBanner = document.querySelector(".player-banner");
const playerTitle = document.querySelector(".player-title");
const playerArtist = document.querySelector(".player-artist");
function PlayIt(i) {
  playerBanner.src = trendSongs["song" + i].coverImg;
  playerTitle.textContent = trendSongs["song" + i].name;
  playerArtist.textContent = trendSongs["song" + i].artist;
  seeker.value = 0;
  mainAudio.currentTime = 0;
  mainAudio.src = trendSongs["song" + i].source;
  MusicControl();
}
const playTrend = document.querySelectorAll(".play-trend");
for (let i = 0; i < 7; i++) {
  playTrend[i].addEventListener("click", function () {
    PlayIt(i);
  });
}
let isOpen = false;
const open = document.getElementById("shuffle");
const openPlayer = function () {
  document.querySelector(".player").classList.toggle("overlay-player");
  document.querySelector(".overlay").classList.toggle("hidden");
  playerBanner.style.width = "100%";
  playerBanner.style.height = "60vh";
  playerTitle.style.fontSize = "2.6rem";
  playerArtist.style.fontSize = "1.2rem";
  document.querySelector(".controls").style.gap = "50px";
  document.querySelector(
    ".player"
  ).style.boxShadow = `0px 0px 200px 3px #250842`;
  isOpen = true;
};
const closePlayer = function () {
  document.querySelector(".player").classList.toggle("overlay-player");
  document.querySelector(".overlay").classList.toggle("hidden");
  playerBanner.style.width = "100%";
  playerBanner.style.height = "160px";
  playerTitle.style.fontSize = "1.2rem";
  playerArtist.style.fontSize = "0.9rem";
  document.querySelector(".controls").style.gap = "20px";
  document.querySelector(".player").style.boxShadow = "none";
  isOpen = false;
};
open.addEventListener("click", function () {
  if (!isOpen) {
    document.querySelector(".player").style.transition = "all 1.5s";
    document.querySelector(".player").style.transitionProperty = "height,gap";
    openPlayer();
  } else {
    document.querySelector(".player").style.transition = "all 1s";
    closePlayer();
  }
});

document.querySelector(".overlay").addEventListener("click", closePlayer);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closePlayer();
  }
});
