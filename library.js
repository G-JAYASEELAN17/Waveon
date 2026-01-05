document.addEventListener("DOMContentLoaded", () => {

  /* ================= AUTH ================= */
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedUser) {
    window.location.href = "../login.html";
    return;
  }

  document.getElementById("welcomeUser").innerText = `Hi, ${loggedUser.name}`;

  document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "../login.html";
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


  const savedContainer = document.getElementById("libraryPlaylists");
  const likedContainer = document.getElementById("likedSongs");
  const searchInput = document.getElementById("librarySearch");

  let savedSongs = [];
  let likedSongs = [];

  /* ================= CREATE CARD ================= */
  function createCard(song, queue) {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${song.cover}">
      <h4>${song.title}</h4>
      <small>${song.artist}</small>

      <div class="card-actions">
        <button class="play-btn">▶</button>
        <button class="queue-btn">🔁</button>
        <button class="remove-btn">🗑</button>
      </div>
    `;

    /* 🎧 NOW PLAYING HIGHLIGHT */
    const current = JSON.parse(localStorage.getItem("currentSong"));
    if (current &&
        current.title === song.title &&
        current.artist === song.artist) {
      card.classList.add("now-playing");
    }

    /* ▶ PLAY */
    card.querySelector(".play-btn").onclick = (e) => {
      e.stopPropagation();
      localStorage.setItem("queue", JSON.stringify(queue));
      localStorage.setItem("currentSong", JSON.stringify(song));
      window.location.href = "../index.html";
    };

    /* 🔁 QUEUE */
    card.querySelector(".queue-btn").onclick = (e) => {
      e.stopPropagation();
      const q = JSON.parse(localStorage.getItem("queue")) || [];
      q.push(song);
      localStorage.setItem("queue", JSON.stringify(q));
      alert("Added to queue");
    };

    /* 🗑 REMOVE FROM LIBRARY */
    card.querySelector(".remove-btn").onclick = (e) => {
      e.stopPropagation();
      localStorage.removeItem(`${song.title}-${song.artist}-saved`);
      localStorage.removeItem(`${song.title}-${song.artist}-liked`);
      card.remove();
    };

    return card;
  }

  /* ================= LOAD SAVED ================= */
  function loadSavedSongs() {
    savedContainer.innerHTML = "";
    savedSongs = [];

    songs.forEach(song => {
      if (localStorage.getItem(`${song.title}-${song.artist}-saved`) === "true") {
        savedSongs.push(song);
      }
    });

    savedSongs.forEach(song =>
      savedContainer.appendChild(createCard(song, savedSongs))
    );
  }

  /* ================= LOAD LIKED ================= */
  function loadLikedSongs() {
    likedContainer.innerHTML = "";
    likedSongs = [];

    songs.forEach(song => {
      if (localStorage.getItem(`${song.title}-${song.artist}-liked`) === "true") {
        likedSongs.push(song);
      }
    });

    likedSongs.forEach(song =>
      likedContainer.appendChild(createCard(song, likedSongs))
    );
  }

  /* ================= SEARCH ================= */
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    document.querySelectorAll(".card").forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(value)
        ? "block"
        : "none";
    });
  });

  loadSavedSongs();
  loadLikedSongs();
});

/* ================= LIBRARY PLAYER SHORTCUTS ================= */

document.getElementById("libPlay").onclick = () => {
  localStorage.setItem("playerCommand", "toggle");
  window.location.href = "../index.html";
};

document.getElementById("libNext").onclick = () => {
  localStorage.setItem("playerCommand", "next");
  window.location.href = "../index.html";
};

document.getElementById("libPrev").onclick = () => {
  localStorage.setItem("playerCommand", "prev");
  window.location.href = "../index.html";
};

/* ================= VOLUME ================= */

const volumeSlider = document.getElementById("libraryVolume");
const savedVolume = localStorage.getItem("playerVolume");

if (savedVolume !== null) volumeSlider.value = savedVolume;

volumeSlider.addEventListener("input", () => {
  localStorage.setItem("playerVolume", volumeSlider.value);
});

/* ================= BACK ================= */

document.getElementById("backBtn").onclick = () => {
  window.history.back();
};
