import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Project Configuration
const TOTAL_FRAMES = 233;
const images = [];
let loadedCount = 0;

// Helper to get frame path (3-digit zero-padded)
const getFramePath = (index) => {
  return `./frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;
};

// Select Elements
const preloader = document.getElementById('preloader');
const loaderPercentage = document.getElementById('loader-percentage');
const ringProgress = document.getElementById('ring-progress');
const canvas = document.getElementById('lipstick-canvas');
const context = canvas.getContext('2d');

const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance

// Responsive Canvas Cover Logic
const resizeCanvas = () => {
  const container = canvas.parentElement;
  const rect = container.getBoundingClientRect();
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  
  // Scale context to match DPR
  context.setTransform(1, 0, 0, 1, 0, 0); // Reset scale first
  context.scale(dpr, dpr);
  
  // Redraw current frame
  const currentFrameIndex = Math.floor(playhead.frame);
  if (images[currentFrameIndex]) {
    drawImage(images[currentFrameIndex]);
  }
};

const drawImage = (img) => {
  if (!img) return;
  const canvasWidth = canvas.width / dpr;
  const canvasHeight = canvas.height / dpr;
  
  const imgWidth = img.naturalWidth || img.width;
  const imgHeight = img.naturalHeight || img.height;
  
  const imgRatio = imgWidth / imgHeight;
  const canvasRatio = canvasWidth / canvasHeight;
  
  let drawWidth, drawHeight, drawX, drawY;
  
  if (imgRatio > canvasRatio) {
    // Image is wider than container (crop left/right)
    drawHeight = canvasHeight;
    drawWidth = canvasHeight * imgRatio;
    drawX = (canvasWidth - drawWidth) / 2;
    drawY = 0;
  } else {
    // Image is taller than container (crop top/bottom)
    drawWidth = canvasWidth;
    drawHeight = canvasWidth / imgRatio;
    drawX = 0;
    drawY = (canvasHeight - drawHeight) / 2;
  }
  
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
};

// Playhead object for GSAP to animate
const playhead = { frame: 0 };

// Preload Animation Frame Assets
const preloadImages = () => {
  return new Promise((resolve) => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
        
        // Update DOM
        loaderPercentage.innerText = `${percent}%`;
        
        // Ring dashoffset (circumference = 2 * Math.PI * 45 ≈ 283)
        const offset = 283 - (loadedCount / TOTAL_FRAMES) * 283;
        ringProgress.style.strokeDashoffset = offset;
        
        if (percent === 100) {
          setTimeout(() => {
            preloader.classList.add('loaded');
            resolve();
          }, 400);
        }
      };
      
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          preloader.classList.add('loaded');
          resolve();
        }
      };
      
      images.push(img);
    }
  });
};

// Initialize Scroll-Driven Animation
const initScrollAnimation = () => {
  // Initial draw of first frame
  drawImage(images[0]);
  
  // Set up resize handler
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // ScrollTrigger to animate frames
  gsap.to(playhead, {
    frame: TOTAL_FRAMES - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      trigger: "#scroll-container",
      start: "top top",
      end: "bottom bottom",
      scrub: 0.15, // Subtle lag for buttery-smooth scrubbing
      onUpdate: () => {
        const frameIndex = Math.floor(playhead.frame);
        drawImage(images[frameIndex]);
      }
    }
  });

  // Fade out luxury hero overlay by 30% scroll progress
  gsap.to(".hero-overlay", {
    opacity: 0,
    y: -40, // Subtle upward drift for luxury aesthetic
    ease: "power1.out",
    scrollTrigger: {
      trigger: "#scroll-container",
      start: "top top",
      end: "+=30%", // 30% of the container height
      scrub: true
    }
  });
};

// Bootstrap Application
const initMaisonRougeInteractions = () => {
  // GSAP Initial Reveal
  gsap.to(".reveal-up", {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power4.out",
    stagger: 0.2
  });

  // Scroll-triggered reveals
  document.querySelectorAll('section').forEach(section => {
    const elements = section.querySelectorAll('.reveal-up');
    if (elements.length > 0) {
      gsap.to(elements, {
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out"
      });
    }
  });

  // Magnetic Cursor Interaction
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  
  if (cursor && ring) {
    document.addEventListener('mousemove', (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1
      });
      gsap.to(ring, {
        x: e.clientX - 14,
        y: e.clientY - 14,
        duration: 0.3
      });
    });

    // Snap interactions for buttons
    document.querySelectorAll('button, a').forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(ring, {
          scale: 2,
          opacity: 0.5,
          borderColor: '#7e0018'
        });
      });
      item.addEventListener('mouseleave', () => {
        gsap.to(ring, {
          scale: 1,
          opacity: 0.3,
          borderColor: '#7e0018'
        });
      });
    });
  }
};

const initNavbarThemeToggle = () => {
  const header = document.querySelector('header');
  if (!header) return;

  const updateHeaderTheme = () => {
    // When we scroll past ~90% of the first section (350vh * 0.9 = 315vh)
    const threshold = window.innerHeight * 3.15;
    if (window.scrollY >= threshold) {
      header.classList.remove('header-dark');
      header.classList.add('header-light');
    } else {
      header.classList.remove('header-light');
      header.classList.add('header-dark');
    }
  };

  window.addEventListener('scroll', updateHeaderTheme);
  updateHeaderTheme(); // run once on init
};

const initMobileMenu = () => {
  const toggle = document.getElementById('mobile-menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const close = document.getElementById('mobile-menu-close');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.remove('hidden');
      menu.classList.add('flex');
    });
  }

  if (close && menu) {
    close.addEventListener('click', () => {
      menu.classList.add('hidden');
      menu.classList.remove('flex');
    });
  }

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      menu.classList.remove('flex');
    });
  });
};

const bootstrap = async () => {
  await preloadImages();
  initScrollAnimation();
  initMaisonRougeInteractions();
  initNavbarThemeToggle();
  initMobileMenu();
};

document.addEventListener('DOMContentLoaded', bootstrap);
