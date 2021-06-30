$(document).ready(function () {
  $("#profile__ripple").ripples({
    resolution: 512,
    dropRadius: 10,
  });

  const trans = function () {
    const bars = document.querySelectorAll(".progress__bar");
    let percentage = 0;
    bars.forEach(function (bar) {
      percentage = bar.dataset.percent;
      let tooltip = bar.children[0];
      tooltip.innerText = percentage + "%";
      bar.style.width = percentage + "%";
    });
  };

  // trans();
  let progressSection = document.querySelector(".skills__wrapper");
  const progSectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      trans();
    }
  });
  progSectionObserver.observe(progressSection);

  const counters = document.querySelectorAll(".counter");
  function runCounter() {
    counters.forEach((counter) => {
      counter.innerText = 0;

      let target = +counter.dataset.count;
      let step = target / 100;
      let countIt = function () {
        let displayedCount = +counter.innerText;
        if (displayedCount < target) {
          counter.innerText = Math.ceil(displayedCount + step);
          setTimeout(countIt, 1);
        } else {
          counter.innerText = target;
        }
      };
      countIt();
    });
  }
  runCounter();

  let options = {
    rootMargin: "0px 0px -200px 0px",
  };
  let done = 0;
  let counterSection = document.querySelector(".counter__section");
  const sectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && done !== 1) {
      done = 1;
      runCounter();
    }
  }, options);
  sectionObserver.observe(counterSection);

  // image filter
  var wrapper = $(".portfolio__wrapper");
  wrapper.isotope({
    filter: "*",
    layoutMode: "masonry",
    animationOptions: {
      duration: 750,
      easing: "linear",
    },
  });

  let links = document.querySelectorAll(".tabs a");
  links.forEach((link) => {
    let selector = link.dataset.filter;
    link.addEventListener("click", function (e) {
      e.preventDefault();
      wrapper.isotope({
        filter: selector,
        layoutMode: "masonry",
        animationOptions: {
          duration: 750,
          easing: "linear",
        },
      });
      links.forEach((link) => {
        link.classList.remove("active");
      });
      e.target.classList.add("active");
    });
  });

  // Magnific PopUp
  $(".magnify").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
    zoom: {
      enabled: true,
    },
    duration: 300, // duration of the effect, in milliseconds
    easing: "ease-in-out",
    cursor: "mfp-zoom-out-cur",
  });

  // Slider
  $(".slider").slick({});
});
