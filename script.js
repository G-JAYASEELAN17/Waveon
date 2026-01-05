/* ================= PLAYLIST VIEW ================= */

function openPlaylist(index) {
  syncPlaylists();

  const playlist = playlists[index];
  playlistView.classList.add("active");
  playlistTitle.innerText = playlist.name;
  playlistSongs.innerHTML = "";

  if (playlist.songs.length === 0) {
    playlistSongs.innerHTML =
      "<p style='opacity:.6'>No songs in this playlist</p>";
    return;
  }

  playlist.songs.forEach((song, songIndex) => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${song.cover}">
      <h4>${song.title}</h4>
      <small>${song.artist}</small>
      <div class="card-actions">
        <button class="play-btn">▶</button>
        <button class="delete-btn">🗑</button>
      </div>
    `;

    /* ▶ PLAY SONG */
    card.querySelector(".play-btn").onclick = () => {
      localStorage.setItem("currentSong", JSON.stringify(song));
      window.location.href = "../index.html";
    };

    /* 🗑 REMOVE FROM PLAYLIST */
    card.querySelector(".delete-btn").onclick = () => {
      playlist.songs.splice(songIndex, 1);
      save();
      openPlaylist(index);
    };

    playlistSongs.appendChild(card);
  });
}

/* ================= MAIN PLAYER + HOME ================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= AUTH ================= */
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedUser) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("welcomeUser").innerText = `Hi, ${loggedUser.name}`;

  document.querySelector(".logout-btn").onclick = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  };

  /* ================= SONG DATA ================= */
  const songs = [
    { title: "Blinding Lights", artist: "The Weeknd", cover: "images (4).jpg", src: "blending.mp3" },
    { title: "Levitating", artist: "Dua Lipa", cover: "Levitating.webp", src: "Levitating.mp3" },
    { title: "Stay", artist: "Justin Bieber", cover: "image 1.png", src: "stay.mp3" },
    { title: "Heat Waves", artist: "Glass Animals", cover: "Heat Waves.webp", src: "Glass_animal_-_Heat_Waves.mp3" },
    { title: "Perfect", artist: "Ed Sheeran", cover: "Perfect.webp", src: "Perfect.mp3" },
    { title: "Believer", artist: "Imagine Dragons", cover: "Believer.webp", src: "Believer.mp3" }
  ];

  window.songs = songs;

  /* ================= PLAYER STATE ================= */
  if (window.__playerInitialized) return;
  window.__playerInitialized = true;

  let index = 0;
  const audio = new Audio();

  const titleEl = document.getElementById("title");
  const artistEl = document.getElementById("artist");
  const coverEl = document.getElementById("cover");
  const playBtn = document.getElementById("play");
  const nextBtn = document.getElementById("next");
  const volumeSlider = document.querySelector(".player-right input");

  function loadSong(song) {
    titleEl.innerText = song.title;
    artistEl.innerText = song.artist;
    coverEl.src = song.cover;
    audio.src = song.src;
  }

  loadSong(songs[index]);

  playBtn.onclick = () => {
    if (audio.paused) {
      audio.play();
      playBtn.innerText = "⏸";
    } else {
      audio.pause();
      playBtn.innerText = "▶";
    }
  };

  nextBtn.onclick = () => {
    index = (index + 1) % songs.length;
    loadSong(songs[index]);
    audio.play();
  };

  volumeSlider.oninput = () => {
    audio.volume = volumeSlider.value / 100;
  };

  /* ================= FOR YOU ================= */

  const forYou = document.getElementById("forYou");

  function createSongCard(song, i) {
    const card = document.createElement("div");
    card.className = "card";

    const songKey = `${song.title}-${song.artist}`;
    const isSaved = localStorage.getItem(songKey + "-saved") === "true";
    const isLiked = localStorage.getItem(songKey + "-liked") === "true";

    card.innerHTML = `
      <img src="${song.cover}">
      <h4>${song.title}</h4>
      <small>${song.artist}</small>
      <div class="card-actions">
        <button class="like-btn">${isLiked ? "♥" : "♡"}</button>
        <button class="save-btn">${isSaved ? "✔" : "➕"}</button>
        <button class="playlist-btn">📂</button>
      </div>
    `;

    /* ❤️ LIKE */
    card.querySelector(".like-btn").onclick = (e) => {
      e.stopPropagation();
      const liked = localStorage.getItem(songKey + "-liked") === "true";
      localStorage.setItem(songKey + "-liked", !liked);
      e.target.innerText = liked ? "♡" : "♥";
    };

    /* ➕ SAVE */
    card.querySelector(".save-btn").onclick = (e) => {
      e.stopPropagation();
      const saved = localStorage.getItem(songKey + "-saved") === "true";
      localStorage.setItem(songKey + "-saved", !saved);
      e.target.innerText = saved ? "➕" : "✔";
    };

    /* ▶ PLAY */
    card.onclick = () => {
      index = i;
      loadSong(song);
      audio.play();
      playBtn.innerText = "⏸";
    };

    /* 📂 ADD TO PLAYLIST */
    card.querySelector(".playlist-btn").onclick = (e) => {
      e.stopPropagation();
      openPlaylistModal(song);
    };

    return card;
  }

  songs.forEach((song, i) => {
    forYou.appendChild(createSongCard(song, i));
  });

});
