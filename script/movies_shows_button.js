document.addEventListener("DOMContentLoaded", () => {
  // 1. ნოტიფიკაციის ღილაკი
  const notifBtn = document.getElementById("notifBtn");
  const notifModal = document.getElementById("notifModal");
  const closeNotifBtn = document.getElementById("closeNotifBtn");
  const goSupportBtn = document.getElementById("goSupportBtn");

  if (notifBtn && notifModal) {
    notifBtn.addEventListener("click", () => {
      notifModal.classList.add("show");
    });

    if (closeNotifBtn) {
      closeNotifBtn.addEventListener("click", () => {
        notifModal.classList.remove("show");
      });
    }

    if (goSupportBtn) {
      goSupportBtn.addEventListener("click", () => {
        if (window.location.pathname.includes("/pages/")) {
          window.location.href = "./support.html";
        } else {
          window.location.href = "./pages/support.html";
        }
      });
    }

    notifModal.addEventListener("click", (e) => {
      if (e.target === notifModal) {
        notifModal.classList.remove("show");
      }
    });
  }

  // 2. Hamburger menu
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mainNav = document.getElementById("mainNav");
  const menuOverlay = document.getElementById("menuOverlay");

  function toggleMenu() {
    if (mainNav && hamburgerBtn) {
      mainNav.classList.toggle("active");
      hamburgerBtn.classList.toggle("active");
      if (menuOverlay) menuOverlay.classList.toggle("active");
    }
  }

  function closeMenu() {
    if (mainNav && hamburgerBtn) {
      mainNav.classList.remove("active");
      hamburgerBtn.classList.remove("active");
      if (menuOverlay) menuOverlay.classList.remove("active");
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener("click", toggleMenu);
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);

  // 3. Hero Movie Slider Logic
  const moviesData = [
    {
      title: "Avengers : Endgame",
      desc: "With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos's actions and undo the chaos to the universe, no matter what consequences may be in store, and no matter who they face... Avenge the fallen.",
      image: "../images/avengersimage.png",
    },
    {
      title: "Money Heist",
      desc: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history - stealing 2.4 billion euros from the Royal Mint of Spain.",
      image: "../images/moneyheist.png",
    },
    {
      title: "Stranger Things",
      desc: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.",
      image: "../images/strangerthingsimage.png",
    },
  ];

  let currentIndex = 0;

  const heroBg = document.getElementById("heroBg");
  const heroTitle = document.getElementById("heroTitle");
  const heroDesc = document.getElementById("heroDesc");
  const prevBtn = document.getElementById("heroPrevBtn");
  const nextBtn = document.getElementById("heroNextBtn");
  const dots = document.querySelectorAll(".hero_dot");

  function updateSlide(index) {
    if (!heroBg || !heroTitle || !heroDesc) return;
    heroBg.style.opacity = "0.3";

    setTimeout(() => {
      heroBg.src = moviesData[index].image;
      heroTitle.innerText = moviesData[index].title;
      heroDesc.innerText = moviesData[index].desc;
      heroBg.style.opacity = "1";
    }, 200);

    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % moviesData.length;
      updateSlide(currentIndex);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + moviesData.length) % moviesData.length;
      updateSlide(currentIndex);
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlide(currentIndex);
    });
  });

  // 4. Genre Sliders Logic 
  function initGenreSlider(sliderId, leftBtnId, rightBtnId) {
    const slider = document.getElementById(sliderId);
    const leftBtn = document.getElementById(leftBtnId);
    const rightBtn = document.getElementById(rightBtnId);

    if (!slider || !leftBtn || !rightBtn) return;

    const blockHeader = slider.parentElement.querySelector(".block_header");
    const dots = blockHeader ? blockHeader.querySelectorAll(".indicators_dots .dot") : [];

    function updateDots() {
      if (!dots.length) return;
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      if (maxScroll <= 0) return;

      const scrollRatio = slider.scrollLeft / maxScroll;
      const activeIndex = Math.min(
        Math.round(scrollRatio * (dots.length - 1)),
        dots.length - 1
      );

      dots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    // ფუნქცია: ანათებს მხოლოდ 1 კონკრეტულ ახალ ქარდს
    function highlightCard(targetCard) {
      if (!targetCard) return;
      const cards = slider.querySelectorAll(".genre_card");
      
      // ყველა ქარდიდან ვაშორებთ ანიმაციის კლასს
      cards.forEach((c) => c.classList.remove("reveal-focus"));

      // Force Reflow (ანიმაციის გადასატვირთად)
      void targetCard.offsetWidth;
      targetCard.classList.add("reveal-focus");

      setTimeout(() => {
        targetCard.classList.remove("reveal-focus");
      }, 850);
    }

    rightBtn.addEventListener("click", () => {
      const cards = Array.from(slider.querySelectorAll(".genre_card"));
      const cardWidth = cards[0].offsetWidth + 20;

      // ვპოულობთ პირველ ქარდს, რომელიც ახლა ჩანს მარცხენა მხარეს
      const currentScrollLeft = slider.scrollLeft;
      const currentIndex = Math.round(currentScrollLeft / cardWidth);

      // სქროლი მარჯვნივ
      slider.scrollBy({ left: cardWidth, behavior: "smooth" });

      // ანათებს ზუსტად ის 1 ქარდი, რომელიც ახლა შედის ეკრანზე მარჯვნიდან
      const nextCard = cards[currentIndex + 1];
      if (nextCard) {
        highlightCard(nextCard);
      }
    });

    leftBtn.addEventListener("click", () => {
      const cards = Array.from(slider.querySelectorAll(".genre_card"));
      const cardWidth = cards[0].offsetWidth + 20;

      const currentScrollLeft = slider.scrollLeft;
      const currentIndex = Math.round(currentScrollLeft / cardWidth);

      // სქროლი მარცხნივ
      slider.scrollBy({ left: -cardWidth, behavior: "smooth" });

      // ანათებს ზუსტად ის 1 ქარდი, რომელიც შედის მარცხნიდან
      const prevCard = cards[currentIndex - 1];
      if (prevCard) {
        highlightCard(prevCard);
      }
    });

    slider.addEventListener("scroll", updateDots);
  }

  // 5. Initialize Sliders
  initGenreSlider("genresSlider", "genresLeft", "genresRight");
  initGenreSlider("top10Slider", "top10Left", "top10Right");
  initGenreSlider("trendingSlider", "trendingLeft", "trendingRight");
  initGenreSlider("newReleasesSlider", "newReleasesLeft", "newReleasesRight");
  initGenreSlider("mustWatchSlider", "mustWatchLeft", "mustWatchRight");
  // Shows Sliders
  initGenreSlider("showsGenresSlider", "showsGenresLeft", "showsGenresRight");
  initGenreSlider("showsTop10Slider", "showsTop10Left", "showsTop10Right");
  initGenreSlider("trendingShowsSlider", "trendingShowsLeft", "trendingShowsRight");
  initGenreSlider("newShowsSlider", "newShowsLeft", "newShowsRight");
  initGenreSlider("mustWatchShowsSlider", "mustWatchShowsLeft", "mustWatchShowsRight");
  
  // 6. Scroll to top
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});