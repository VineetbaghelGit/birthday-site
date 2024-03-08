/* DESCRIPTION: CUSTOM JS FILE */

/* NAVIGATION*/
// COLLAPSE THE NAVBAR BY ADDING THE TOP-NAV-COLLAPSE CLASS
window.onscroll = function () {
  scrollFunction();
  scrollFunctionBTT(); // back to top button
};

$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll > 300) {
      $(".navbar-inverse ").css("background", "#1c1b19");
    } else {
      $(".navbar-inverse ").css("background", "transparent");
    }
  });
});

function scrollFunction() {
  let intViewportWidth = window.innerWidth;
  if (
    document.body.scrollTop > 30 ||
    (document.documentElement.scrollTop > 30) & (intViewportWidth > 991)
  ) {
    document.getElementById("navbar").classList.add("top-nav-collapse");
  } else if (
    document.body.scrollTop < 30 ||
    (document.documentElement.scrollTop < 30) & (intViewportWidth > 991)
  ) {
    document.getElementById("navbar").classList.remove("top-nav-collapse");
  }
}

// NAVBAR ON MOBILE
let elements = document.querySelectorAll(".nav-link:not(.dropdown-toggle)");

for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", () => {
    document.querySelector(".offcanvas-collapse").classList.toggle("open");
  });
}

document.querySelector(".navbar-toggler").addEventListener("click", () => {
  document.querySelector(".offcanvas-collapse").classList.toggle("open");
});

// HOVER ON DESKTOP
function toggleDropdown(e) {
  const _d = e.target.closest(".dropdown");
  let _m = document.querySelector(".dropdown-menu", _d);

  setTimeout(
    function () {
      const shouldOpen = _d.matches(":hover");
      _m.classList.toggle("show", shouldOpen);
      _d.classList.toggle("show", shouldOpen);

      _d.setAttribute("aria-expanded", shouldOpen);
    },
    e.type === "mouseleave" ? 300 : 0
  );
}

// ON HOVER
const dropdownCheck = document.querySelector(".dropdown");

if (dropdownCheck !== null) {
  document
    .querySelector(".dropdown")
    .addEventListener("mouseleave", toggleDropdown);
  document
    .querySelector(".dropdown")
    .addEventListener("mouseover", toggleDropdown);

  // ON CLICK
  document.querySelector(".dropdown").addEventListener("click", (e) => {
    const _d = e.target.closest(".dropdown");
    let _m = document.querySelector(".dropdown-menu", _d);
    if (_d.classList.contains("show")) {
      _m.classList.remove("show");
      _d.classList.remove("show");
    } else {
      _m.classList.add("show");
      _d.classList.add("show");
    }
  });
}

/* CARD SLIDER - SWIPER */
var cardSlider = new Swiper(".card-slider", {
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  slidesPerView: 3,
  spaceBetween: 70,
  breakpoints: {
    // when window is <= 767px
    767: {
      slidesPerView: 1,
    },
    // when window is <= 991px
    991: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
  },
});

/* BACK TO TOP BUTTON */
// GET THE BUTTON
myButton = document.getElementById("myBtn");

// WHEN THE USER SCROLLS DOWN 20PX FROM THE TOP OF THE DOCUMENT, SHOW THE BUTTON
function scrollFunctionBTT() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    myButton.style.display = "block";
  } else {
    myButton.style.display = "none";
  }
}

// WHEN THE USER CLICKS ON THE BUTTON, SCROLL TO THE TOP OF THE DOCUMENT
function topFunction() {
  document.body.scrollTop = 0; // for Safari
  document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
}

// AOS ANIMATION ON SCROLL
AOS.init({
  duration: 1000,
  easing: "ease",
  once: true, // whether animation should happen only once - while scrolling down
});

// 
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createFirework(x, y) {
  const particleCount = 100;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    const angle = random(0, Math.PI * 2);
    const speed = random(2, 5);
    const radius = random(2, 4);
    const color = `hsl(${random(0, 360)}, 100%, 50%)`;

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius,
      color
    });
  }

  return particles;
}

function drawFirework(particles) {
  particles.forEach((particle) => {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework) => {
    firework.particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.radius *= 0.98;
    });

    drawFirework(firework.particles);
  });

  fireworks = fireworks.filter((firework) => firework.particles[0].radius > 0);

  requestAnimationFrame(animate);
}

let fireworks = [];

canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  fireworks.push({
    particles: createFirework(mouseX, mouseY)
  });
});

animate();
