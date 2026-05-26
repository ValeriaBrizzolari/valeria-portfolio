// ═══════════════════════════════════════
//  TYPING ANIMATION
// ═══════════════════════════════════════
const phrases = [
  "Building the web, one commit at a time.",
  "Full stack developer in training.",
  "Gamer. Designer. Problem solver.",
  "Turning coffee into code since 2024.",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedText = document.getElementById("typed-text");

function type() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    typedText.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  // finished typing the phrase
  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(type, 1800); // pause before deleting
    return;
  }

  // finished deleting
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(type, 400); // pause before typing next
    return;
  }

  const speed = isDeleting ? 40 : 70;
  setTimeout(type, speed);
}

// start typing after hero animation loads
setTimeout(type, 1200);

// ═══════════════════════════════════════
//  NAVBAR — shrink on scroll + active link
// ═══════════════════════════════════════
const navbar = document.getElementById("navbar");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  // shrink navbar
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  // highlight active nav link
  let current = "";
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
    current = "contact";
  } else {
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});
// ═══════════════════════════════════════
//  SCROLL REVEAL
// ═══════════════════════════════════════
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // only animate once
      }
    });
  },
  {
    threshold: 0.1, // trigger when 10% of element is visible
    rootMargin: "0px 0px -50px 0px",
  },
);

revealElements.forEach((el) => observer.observe(el));

// ═══════════════════════════════════════
//  SMOOTH SCROLL for nav links
// ═══════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ═══════════════════════════════════════
//  AUTO COUNT PROJECTS
// ═══════════════════════════════════════
const projectCount = document.querySelectorAll(".project-card").length;
document.getElementById("project-count").textContent = projectCount;

// ═══════════════════════════════════════
//  DYNAMIC FOOTER YEAR
// ═══════════════════════════════════════
document.getElementById("footer-year").textContent = new Date().getFullYear();
