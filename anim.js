document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modal");
  const modalVideo = document.getElementById("modalVideo");
  const closeModal = document.getElementById("close");
  const audio = document.querySelector("audio");
  const lyrics = document.querySelector("#lyrics");

  let lyricsInterval;

  const lyricsData = [
    { text: "Imagínate tú y yo esta noche, haciendo posible lo imposible", time: 0 },
    { text: "Y ese beso que no me negaste, al final tenga que ser el causante", time: 9 },
    { text: "Te quiero. Y eso lo sabes, te lo demuestro con cada detalle", time: 13 },
    { text: "Y en tu corazón bien fácil yo puedo perderme ", time: 17 },
    { text: "Y le ruego a dios que por favor nunca me encuentren", time: 22 },
    { text: "Esta noche está puesta para nosotros", time: 24 },
    { text: "Déjame acercarme a tus labios un poco y parezco un loco, por como te miro", time: 32 },
    { text: "Esta noche se me pasará como un suspiro", time: 37 },
    { text: "Esta noche está puesta para nosotros", time: 40 },
    { text: "Déjame acercarme a tus labios un poco y parezco un loco, por como te miro", time: 46 },
    { text: "Esta noche se me pasará como un suspiro", time: 50 },
    { text: "SC 05/09", time: 51 },
    { text: "05/09", time: 52 },
  ];

  function updateLyrics() {
    var time = Math.floor(audio.currentTime);

    var currentLine = lyricsData.find((line) => time >= line.time && time < line.time + 10);
    var lastLine = lyricsData[lyricsData.length - 1];

    if (currentLine) {
      var fadeInDuration = 0.1;
      var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

      lyrics.style.opacity = opacity;
      lyrics.innerHTML = currentLine.text;
    } else if (time >= lastLine.time) {
      lyrics.style.opacity = 1;
      lyrics.innerHTML = lastLine.text;
    } else {
      lyrics.style.opacity = 0;
      lyrics.innerHTML = "";
    }
  }

  function startLyrics() {
    lyricsInterval = setInterval(updateLyrics, 1000);
  }

  function stopLyrics() {
    clearInterval(lyricsInterval);
  }

  // Function to open modal with the video
  function openModal(videoId) {
    const videoSource = `videos/${videoId}.mp4`;
    modalVideo.src = videoSource;
    modal.style.display = "block";
    modalVideo.play(); // Start playing the video
    audio.pause();
    stopLyrics();
  }

  for (let i = 1; i <= 9; i++) {
    const button = document.getElementById(`video${i}`);
    button.addEventListener("click", function () {
      openModal(`video${i}`);
    });
  }

  closeModal.addEventListener("click", function () {
    modal.style.display = "none";
    modalVideo.pause();
    modalVideo.src = "";
    audio.play();
    startLyrics();
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      modalVideo.pause();
      modalVideo.src = "";
      audio.play();
      startLyrics();
    }
  });

  startLyrics();

  function ocultarTitulo() {
    var titulo = document.querySelector(".titulo");
    titulo.style.animation = "fadeOut 3s ease-in-out forwards";
    setTimeout(function () {
      titulo.style.display = "none";
    }, 3000);
  }

  // setTimeout(ocultarTitulo, 216000);
});
