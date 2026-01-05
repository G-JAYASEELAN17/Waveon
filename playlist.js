/* ================= PLAYLIST DATA ================= */

let playlists = [];

/* 🔁 Always sync from localStorage */
function syncPlaylists() {
  playlists = JSON.parse(localStorage.getItem("playlists")) || [];
}

syncPlaylists();

/* ================= ELEMENTS ================= */

const list = document.getElementById("playlistList");
const empty = document.getElementById("emptyState");
const modal = document.getElementById("playlistModal");

const playlistView = document.getElementById("playlistView");
const playlistTitle = document.getElementById("playlistTitle");
const playlistSongs = document.getElementById("playlistSongs");

/* ================= RENDER PLAYLIST LIST ================= */

function render() {
  syncPlaylists(); // ✅ IMPORTANT
  list.innerHTML = "";

  if (playlists.length === 0) {
    empty.style.display = "block";
    return;
  }

  empty.style.display = "none";

  playlists.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "playlist-card";

    card.innerHTML = `
      <button class="delete-btn">🗑</button>
      <h4>${p.name}</h4>
      <small>${p.songs.length} songs</small>
    `;

    /* OPEN PLAYLIST */
    card.onclick = () => openPlaylist(i);

    /* DELETE PLAYLIST */
    card.querySelector(".delete-btn").onclick = (e) => {
      e.stopPropagation();
      if (confirm("Delete playlist?")) {
        playlists.splice(i, 1);
        save();
        playlistView.style.display = "none";
      }
    };

    list.appendChild(card);
  });
}

/* ================= OPEN PLAYLIST ================= */

function openPlaylist(index) {
  syncPlaylists(); // ✅ IMPORTANT

  const playlist = playlists[index];
  playlistView.style.display = "block";
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
    card.querySelector(".play-btn").onclick = (e) => {
      e.stopPropagation();
      localStorage.setItem("currentSong", JSON.stringify(song));
      window.location.href = "../index.html";
    };

    /* 🗑 DELETE SONG FROM PLAYLIST */
    card.querySelector(".delete-btn").onclick = (e) => {
      e.stopPropagation();
      playlist.songs.splice(songIndex, 1);
      save();
      openPlaylist(index);
    };

    playlistSongs.appendChild(card);
  });
}

/* ================= SAVE ================= */

function save() {
  localStorage.setItem("playlists", JSON.stringify(playlists));
  render();
}

/* ================= MODAL ================= */

document.getElementById("openModal").onclick = () => {
  modal.style.display = "flex";
};

document.getElementById("cancel").onclick = () => {
  modal.style.display = "none";
};

document.getElementById("create").onclick = () => {
  const name = document.getElementById("playlistName").value.trim();
  if (!name) return;

  if (playlists.some(p => p.name === name)) {
    alert("Playlist already exists");
    return;
  }

  playlists.push({
    name,
    songs: []
  });

  document.getElementById("playlistName").value = "";
  modal.style.display = "none";
  save();
};

/* ================= ADD SONG TO PLAYLIST (📂 BUTTON TARGET) ================= */

window.addSongToPlaylist = function (playlistName, song) {
  syncPlaylists(); // ✅ ALWAYS SYNC

  const playlist = playlists.find(p => p.name === playlistName);
  if (!playlist) return;

  const exists = playlist.songs.some(
    s => s.title === song.title && s.artist === song.artist
  );

  if (!exists) {
    playlist.songs.push(song);
    localStorage.setItem("playlists", JSON.stringify(playlists));
  }
};

/* ================= INITIAL LOAD ================= */

render();
