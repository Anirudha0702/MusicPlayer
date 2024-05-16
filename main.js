import songs from "./pathMap.js";

const playList = document.querySelector(".songs-wrapper");
const musicPlayer = document.querySelector(".player");

async function loadSongDetails(song) {
  try {
    const audio = new Audio(song.src);
    const loadedPromise = new Promise(resolve => {
      audio.addEventListener('loadedmetadata', () => {
        resolve();
      });
    });
    audio.load();
    await loadedPromise; 
    const duration = getFormattedDuration(audio.duration);
    return { id: song.id, title: song.title, duration };
  } catch (error) {
    console.error(`Error loading song "${song.title}":`, error);
    return null; 
  }
}

function getFormattedDuration(durationInSeconds) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = Math.floor(durationInSeconds % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

async function loadSongList() {
  const songPromises = songs.map(loadSongDetails);
  const songDetails = await Promise.all(songPromises);
  return songDetails.filter(song => song !== null); 
}

async function populatePlaylist() {
  const songDetails = await loadSongList();
  const songHTML = songDetails.map(song => (
    `<div class="song">
      <div class="id">${song.id}</div>
      <span class="title">${song.title}</span>
      <span class="duration">${song.duration}</span>
    </div>`
  )).join('');
  playList.innerHTML = songHTML;
}

populatePlaylist();


songList.forEach((song) => {
  playList.innerHTML += song;
});

window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight / 2) {
    musicPlayer.style.top = "0px";
  } else {
    musicPlayer.style.bottom = "0px";
    musicPlayer.style.top = "";
  }
});
