document.addEventListener('DOMContentLoaded', function () {
  if (typeof particlesJS === 'undefined') {
    return;
  }

  function loadParticles() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const pColor = isLight ? "#000000" : "#a8c8e8";
    const lColor = isLight ? "#000000" : "#ffffff";
    const lOpacity = isLight ? 0.3 : 0.25;

    // Destroy existing particles to recreate
    if (window.pJSDom && window.pJSDom.length > 0) {
      window.pJSDom[0].pJS.fn.vendors.destroypJS();
      window.pJSDom = [];
    }

    particlesJS('particles-js', {
      "particles": {
        "number": { "value": 80, "density": { "enable": true, "value_area": 900 } },
        "color": { "value": pColor },
        "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" } },
        "opacity": { "value": 0.45, "random": true, "anim": { "enable": false } },
        "size": { "value": 3, "random": true, "anim": { "enable": false } },
        "line_linked": { "enable": true, "distance": 150, "color": lColor, "opacity": lOpacity, "width": 1 },
        "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false } }
      },
      "interactivity": {
        "detect_on": "window",
        "events": {
          "onhover": { "enable": true, "mode": "grab" },
          "onclick": { "enable": false, "mode": "push" },
          "resize": true
        },
        "modes": {
          "grab": { "distance": 160, "line_linked": { "opacity": isLight ? 0.6 : 0.8 } },
          "push": { "particles_nb": 4 },
          "repulse": { "distance": 200, "duration": 0.4 }
        }
      },
      "retina_detect": true
    });
  }

  loadParticles();

  // Watch for theme changes
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
        loadParticles();
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true
  });
});

