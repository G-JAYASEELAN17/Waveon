const album = localStorage.getItem("selectedAlbum");
const songs = JSON.parse(localStorage.getItem("allSongs"));

document.getElementById("albumName").innerText = album;
document.getElementById("albumArtist").innerText =
  songs.find(s => s.album === album).artist;

document.getElementById("albumCover").src =
  songs.find(s => s.album === album).cover;

const albumSongs = songs.filter(s => s.album === album);
const list = document.getElementById("albumSongs");

/* Play album */
document.getElementById("playAlbum").onclick = () => {
  localStorage.setItem("playQueue", JSON.stringify(albumSongs));
  localStorage.setItem("currentSong", JSON.stringify(albumSongs[0]));
  window.location.href = "index.html";
};

albumSongs.forEach(song => {
  const div = document.createElement("div");
  div.className = "song";
  div.innerText = song.title;

  div.onclick = () => {
    localStorage.setItem("currentSong", JSON.stringify(song));
    window.location.href = "index.html";
  };

  list.appendChild(div);
});
