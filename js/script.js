function formatShort(num) {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M+';
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K+';
  } else {
    return num + '+';
  }
}

function animateShortCount(el, target, speed = 20) {
  let count = 0;
  const increment = target / 100;

  const interval = setInterval(() => {
    count += increment;
    if (count >= target) {
      count = target;
      clearInterval(interval);
    }
    el.innerText = formatShort(Math.floor(count));
  }, speed);
}

// Scroll observer
let started = false;

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !started) {
      started = true;
      document.querySelectorAll(".counter h1").forEach(el => {
        const target = parseInt(el.getAttribute("data-target"));
        animateShortCount(el, target);
      });
      obs.disconnect();
    }
  });
}, { threshold: 0.4 });

const counterSection = document.querySelector(".counter_up");
observer.observe(counterSection);

// second carosoul

 const track = document.getElementById('carouselTrack');
  let slideWidth = track.children[0].offsetWidth;
  let isSliding = false;

  function nextSlide() {
    if (isSliding) return;
    isSliding = true;

    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${slideWidth}px)`;

    setTimeout(() => {
      const first = track.children[0];
      track.appendChild(first.cloneNode(true));
      track.removeChild(first);

      track.style.transition = "none";
      track.style.transform = `translateX(0)`;

      isSliding = false;
    }, 500);
  }

  function prevSlide() {
    if (isSliding) return;
    isSliding = true;

    const last = track.children[track.children.length - 1];
    const clone = last.cloneNode(true);
    track.insertBefore(clone, track.children[0]);
    track.removeChild(last);

    track.style.transition = "none";
    track.style.transform = `translateX(-${slideWidth}px)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = "transform 0.5s ease";
        track.style.transform = `translateX(0)`;
      });
    });

    setTimeout(() => {
      isSliding = false;
    }, 500);
  }

  // Auto slide every 3s (forward)
  setInterval(() => {
    nextSlide();
  }, 3000);

  // Recalculate width on resize
  window.addEventListener("resize", () => {
    slideWidth = track.children[0].offsetWidth;
  });