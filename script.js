const songCards = document.querySelectorAll(".song-card");

for (let i = 0; i < 4; i++) {
  songCards[i].style.backgroundImage = `url("Assets/bg-${i}.jpg")`;
}
