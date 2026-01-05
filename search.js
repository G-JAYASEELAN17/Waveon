const input = document.getElementById("searchInput");
const grid = document.getElementById("resultsGrid");


/* ================= STATE ================= */
let currentTab = "songs";

/* ================= RENDER ================= */
function render(list) {
  grid.innerHTML = "";

  if (!list.length) {
    grid.innerHTML = `<p style="color:#888">No results found</p>`;
    return;
  }

  list.forEach(song => {
    const card = document.createElement("div");
    card.className = "song-card";

    card.innerHTML = `
      <img src="${song.cover}">
      <h4>${song.title}</h4>
      <small>${song.artist}</small>
    `;

    // ▶ Play from search
    card.onclick = () => {
      localStorage.setItem("currentSong", JSON.stringify(song));
      window.location.href = "index.html";
    };

    // 🎵 Open album page (FIXED)
    card.querySelector("h4").onclick = (e) => {
      e.stopPropagation();
      localStorage.setItem("selectedAlbum", song.album);
      localStorage.setItem("allSongs", JSON.stringify(songs));
      window.location.href = "album.html";
    };

    grid.appendChild(card);
  });
}

/* ================= FILTER + TAB LOGIC ================= */
function filterAndRender() {
  const q = input.value.toLowerCase();

  let filtered = songs.filter(s =>
    s.title.toLowerCase().includes(q) ||
    s.artist.toLowerCase().includes(q) ||
    s.album.toLowerCase().includes(q)
  );

  if (currentTab === "artists") {
    filtered = [...new Map(filtered.map(s => [s.artist, s])).values()];
  }

  if (currentTab === "albums") {
    filtered = [...new Map(filtered.map(s => [s.album, s])).values()];
  }

  render(filtered);
}

/* ================= SEARCH INPUT ================= */
input.addEventListener("input", filterAndRender);

/* ================= TABS ================= */
document.querySelectorAll(".tab").forEach(tab => {
  tab.onclick = () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    currentTab = tab.dataset.type;
    filterAndRender();
  };
});

/* ================= INITIAL LOAD ================= */
filterAndRender();
