const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const title = document.getElementById("title");
const message = document.getElementById("message");
const img = document.getElementById("bubuImage");
const bgMusic = document.getElementById("bgMusic");
const toastContainer = document.getElementById("toast-container");

let isFixed = false;
let isAccepted = false;

const pesanNgeledek = [
  "yahh :(",
  "ngeselin utii",
  "gitu yungg gamau maafin aku🥺",
  "yangg",
  "tombolnya licin ta yungg?🤣",
  "ahahahh",
  "pencet yg pink ajaa yungg!",
  "yungg ihh",
  "oh gituu yungg"
];

// Mulai animasi hati
startFloatingHearts();

// Pancingan Lagu
window.addEventListener('click', function() {
  if (bgMusic.paused) {
      bgMusic.volume = 0.7;
      bgMusic.play();
  }
}, { once: true });

function kabur() {
  if (isAccepted) return;

  munculinPesan();

  // Ubah posisi jadi fixed kalau belum
  if (!isFixed) {
    noBtn.style.position = "fixed";
    noBtn.style.width = "120px"; // Kunci ukuran biar gak melar
    isFixed = true;
  }

  // --- LOGIKA ANTI TABRAKAN ---
  const yesRect = yesBtn.getBoundingClientRect(); // Ambil posisi tombol MAU
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;
  
  // Batas layar aman
  const maxX = window.innerWidth - btnWidth - 20;
  const maxY = window.innerHeight - btnHeight - 20;

  let newX, newY;
  let nabrak = true;
  let percobaan = 0;

  // Coba cari posisi baru sampai dapet yang gak nabrak
  while (nabrak && percobaan < 50) {
      newX = Math.random() * maxX;
      newY = Math.random() * maxY;

      // Cek apakah posisi baru ini numpuk sama tombol MAU?
      // Kita kasih jarak aman (buffer) 50px biar gak mepet-mepet banget
      const buffer = 50;
      
      const isOverlapX = (newX < yesRect.right + buffer) && (newX + btnWidth > yesRect.left - buffer);
      const isOverlapY = (newY < yesRect.bottom + buffer) && (newY + btnHeight > yesRect.top - buffer);

      if (isOverlapX && isOverlapY) {
          nabrak = true; // Masih nabrak, cari lagi
      } else {
          nabrak = false; // Aman!
      }
      percobaan++;
  }
  
  // Terapkan posisi baru
  noBtn.style.left = `${Math.max(10, newX)}px`;
  noBtn.style.top = `${Math.max(10, newY)}px`;
}

function munculinPesan() {
  const teks = pesanNgeledek[Math.floor(Math.random() * pesanNgeledek.length)];
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerText = teks;
  toastContainer.appendChild(toast);
  setTimeout(() => { toast.remove(); }, 2000);
}

function terimaMaaf() {
  if (bgMusic.paused) bgMusic.play();

  if (!isAccepted) {
    isAccepted = true;

    img.src = "mau yg reall ga yungg.gif";
    title.innerHTML = "yeyy makasih sayangg!🥰";
    message.innerHTML = "udah ya sayangg, kita jangan kek gini lagi... maafin aku yaa, I'm not perfect man like u want.. <br><br><span style='font-size:0.9rem; color:#d63384'>aku sayang kamuu</span>";

    noBtn.style.display = "none";
    
    // Sembunyikan placeholder tombol No biar layout rapi
    const placeholders = document.querySelectorAll('.btn-placeholder');
    if(placeholders[1]) placeholders[1].style.display = 'none';
    
    yesBtn.innerHTML = "Love You!❤️";
    yesBtn.style.transform = "scale(1.1)";
  }

  tebarConfetti();
}

function tebarConfetti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#ff4d6d", "#ffb7b2", "#ffffff"],
    zIndex: 9999,
  });
}

function startFloatingHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = ["❤️", "💖", "💕", "💗", "💞", "🌍"][Math.floor(Math.random() * 6)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 3 + 3 + "s";
    heart.style.fontSize = Math.random() * 20 + 20 + "px";
    document.body.appendChild(heart);
    setTimeout(() => {
      heart.remove();
    }, 6000);
  }, 300);
}