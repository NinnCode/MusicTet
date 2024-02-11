let canvas, ctx, w, h, particles = [], xPoint, yPoint, displayText = false;


window.addEventListener("load", function () {
  const song = document.querySelector("#song");
  const playButton = document.querySelector(".player-play");
  const prevButton = document.querySelector(".player-prev");
  const nextButton = document.querySelector(".player-next");
  const playerDuration = document.querySelector(".player-duration");
  const remaining = document.querySelector(".player-remaining");
  const progressBar = document.querySelector("#progress-bar");
  const playerImage = document.querySelector(".player-image");
  const playerBox = document.querySelector(".player-box"); 
  const player = document.querySelector(".player"); 

  let playing = false;
  const list = ["holo.mp3", "DoanXuanCa.mp3", "TetLaTet.mp3", "DoanXuanCa2.mp3" ];
  const colors = ["","", "", ""];
  let songIndex = 0;
  

  function updateBackgroundColor() {
    document.body.style.backgroundColor = colors[songIndex];
  }

  playButton.addEventListener("click", handleMusicPlay);
  nextButton.addEventListener("click", function () {
    handleChangeMusic(1);
    updateBackgroundColor(); 
  });
  prevButton.addEventListener("click", function () {
    handleChangeMusic(-1);
    updateBackgroundColor(); 
  });
  song.addEventListener("ended", function () {
    handleChangeMusic(1);
    updateBackgroundColor();
  });

  function handleChangeMusic(dir) {
    if (dir === 1) {
      songIndex++;
      if (songIndex > list.length - 1) {
        songIndex = 0;
      }
      song.setAttribute("src", `./files/${list[songIndex]}`);
    } else if (dir === -1) {
      songIndex--;
      if (songIndex < 0) {
        songIndex = list.length - 1;
      }
      song.setAttribute("src", `./files/${list[songIndex]}`);
    }
    handleMusicPlay(); 
  }

  let isPlaying = true;

  function handleMusicPlay() {
    if (song.paused) { // If the song is stopped
      song.play();
      playerImage.classList.add("is-playing");
      playButton.classList.remove("fa-play");
      playButton.classList.add("fa-pause");
      isPlaying = true;  // Set status to playing
    } else { // If the song is playing
      song.pause();
      playerImage.classList.remove("is-playing");
      playButton.classList.remove("fa-pause");
      playButton.classList.add("fa-play");
      isPlaying = false; //Set status to stopped
    }
  }
  

  function displayTimer() {
    const { duration, currentTime } = song;
    progressBar.max = duration;
    progressBar.value = currentTime;
    remaining.textContent = formatTimer(currentTime);
    if (!duration) {
      playerDuration.textContent = "0:00";
    } else {
      playerDuration.textContent = formatTimer(duration);
    }
  }

  function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  }

  progressBar.addEventListener("change", handleDragProgressBar);

  function handleDragProgressBar() {
    song.currentTime = progressBar.value;
  }

  displayTimer();
  const timer = setInterval(displayTimer, 500);
});

const repeatButton = document.querySelector(".player-repeat");

repeatButton.addEventListener("click", function () {
  song.loop = !song.loop; // Toggle 
  if (song.loop) {
    repeatButton.classList.add("fa-repeat-active"); 
  } else {
    repeatButton.classList.remove("fa-repeat-active"); 
  }
});


const texts = ['Hi...','Chúc Mừng Năm Mới  ', 'Chúc bạn sẽ có một năm mới thật vui vẻ, hạnh phúc, khỏe mạnh và đạt được thật nhiều nhiều thành công ', '', 'A new year a new start and a new way to go.', 'I wish you a successful glorious',' wish you and your family joyful, healthy, prosperous, and happiest.', 'May all your goals be achieved, and all your plans be fulfilled.', 'I hope that the new year will be the best year of your life. ', 'May all your dreams come true and all your hopes be fulfilled! ', 'Cố lên !! ^^', '', 'Chúc Mừng Năm Mới 2024'];
const timings = [1, 5, 10, 7, 2, 2, 2, 2, 2, 5, 5, 4 , 1  ];
let currentTextIndex = 0; 


let intervalId; 

function changeText() {
  const textContainer = document.getElementById('textContainer');
  textContainer.textContent = ''; 

  const text = texts[currentTextIndex];
  let i = 0;

  function type() {
    if (i < text.length) {
      textContainer.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100); // Adjust the delay time between each character
    } else {
      startTimer(timings[currentTextIndex]);
      if (currentTextIndex === texts.length - 1) {
        clearInterval(intervalId);
      } else {
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        startTimer(timings[currentTextIndex]); 
      }
    }
  }

  type();
}


function updateTimer(seconds) {
document.getElementById('timer').innerText = `Next change in ${seconds} seconds`;
}

function startTimer(seconds) {
let remainingTime = seconds;

function countdown() {
updateTimer(remainingTime);
if (remainingTime === 0) {
clearInterval(intervalId); 
changeText();  
} else {
remainingTime--;
}
}

clearInterval(intervalId);  
intervalId = setInterval(countdown, 1000);  
}

// Initial text change after 1 second
setTimeout(function () {
changeText();
}, 1000);


function endCelebration() {
    canvas.style.display = "none";
    document.getElementById("backgroundMusic").style.display = "none";
}

let currentTime = 0;
let elapsedTime = 0;

function updateWorld() {
    

    update();
    paint();
    window.requestAnimationFrame(updateWorld);
}


function startMusic() {
  
  // Hiển thị audio controls
  document.getElementById("backgroundMusic").style.display = "block";

  // Ẩn overlay
  document.getElementById("overlay").style.display = "none";

  const song = document.querySelector("#song"); 
        const playButton = document.querySelector(".player-play"); 
 
        const playerImage = document.querySelector(".player-image");
        song.play();
        playButton.classList.remove("fa-play");
        playButton.classList.add("fa-pause");
        playerImage.classList.add("is-playing");
  
  // Set displayText thành true để hiển thị văn bản trên canvas
  displayText = true;

  // Reset elapsedTime về 0 khi bắt đầu phát nhạc
  elapsedTime = 0;

  // Ẩn overlay
  document.getElementById('overlay').style.display = 'none';
 
  currentTextIndex = 0;
  changeText();

  backgroundMusic.removeAttribute("controls");
}

