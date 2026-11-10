//1. cookie
document.addEventListener("DOMContentLoaded", () => {
  const cookieModal = document.getElementById("cookieModal");
  const acceptBtn = document.getElementById("acceptBtn");
  const rejectBtn = document.getElementById("rejectBtn");

  if (!sessionStorage.getItem("cookiesAccepted")) {
    cookieModal.style.display = "flex";
    document.body.classList.add("no-scroll");
  }

  acceptBtn.addEventListener("click", () => {
    sessionStorage.setItem("cookiesAccepted", "true");
    cookieModal.style.display = "none";
    document.body.classList.remove("no-scroll");
  });

  rejectBtn.addEventListener("click", () => {
    window.location.href = "https://www.google.com";
  });
});

const logo = document.querySelector(".hero_abstract");
if (logo) {
  // 2. დატრიალება ჩატვირთვისას
  window.addEventListener("load", () => {
    logo.classList.add("spin-animation");
  });

  // 3. დატრიალება მაუსის მიტანისას (Hover)
  logo.addEventListener("mouseenter", () => {
    logo.style.animation = "none"; // ჯერ ვაჩერებთ წინა ანიმაციას
    setTimeout(() => {
      logo.style.animation = "logo-spin 1s ease-out"; // თავიდან ვუშვებთ
    }, 10);
  });
}

//4. ნოტიფიკაციის ღილაკი
document.addEventListener("DOMContentLoaded", () => {
  const notifBtn = document.getElementById("notifBtn");
  const notifModal = document.getElementById("notifModal");
  const closeNotifBtn = document.getElementById("closeNotifBtn");
  const goSupportBtn = document.getElementById("goSupportBtn");

  if (notifBtn && notifModal) {
    // 1) ზარზე დაჭერისას გამოჩნდეს ჩარჩო
    notifBtn.addEventListener("click", () => {
      notifModal.classList.add("show");
    });

    // 2) Cancel ღილაკზე დაჭერისას დაიხუროს
    if (closeNotifBtn) {
      closeNotifBtn.addEventListener("click", () => {
        notifModal.classList.remove("show");
      });
    }

    // 3) Register ღილაკზე დაჭერისას გადავიდეს Support-ის გვერდზე
    if (goSupportBtn) {
      goSupportBtn.addEventListener("click", () => {
        window.location.href = "./pages/support.html";
      });
    }

    // 4) შავ ფონზე დაჭერისას დაიხუროს
    notifModal.addEventListener("click", (e) => {
      if (e.target === notifModal) {
        notifModal.classList.remove("show");
      }
    });
  }
});
// 5. Hamburger menu
document.addEventListener("DOMContentLoaded", () => {
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
});

//6. ფილმის ჟანრების სლაიდერი
const slider = document.getElementById("genreSlider");
const leftBtn = document.getElementById("genreLeft");
const rightBtn = document.getElementById("genreRight");

if (slider && leftBtn && rightBtn) {
  // როცა მარჯვენა ღილაკს დავაჭერთ
  rightBtn.addEventListener("click", () => {
    // ვითვლით ერთი ბარათის სიგანეს + დაშორება (gap)
    const cardWidth = slider.querySelector(".genre_card").offsetWidth + 20;
    slider.scrollBy({ left: cardWidth, behavior: "smooth" });
  });

  // როცა მარცხენა ღილაკს დავაჭერთ
  leftBtn.addEventListener("click", () => {
    const cardWidth = slider.querySelector(".genre_card").offsetWidth + 20;
    slider.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });
}

const observerOptions = {
  root: document.getElementById("genreSlider"), //სლაიდერი
  threshold: 0.7, // ქარდის 70% მაინც უნდა ჩანდეს, რომ აინთოს
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // როცა ქარდი შემოდის ხედვის არეში
      entry.target.classList.add("reveal-focus");

      // ანიმაციის მერე მოვაშოროთ კლასი, რომ შემდეგზეც იმუშაოს
      setTimeout(() => {
        entry.target.classList.remove("reveal-focus");
      }, 800);
    }
  });
}, observerOptions);

document.querySelectorAll(".genre_card").forEach((card) => {
  observer.observe(card);
});

//7. Genre სლაიდერზე დაჭერისას გადავიდეს Movies_shows_Page- ზე
const genreCards = document.querySelectorAll(".genre_card");

genreCards.forEach((card) => {
  card.addEventListener("click", () => {
    window.location.href = "./pages/movies_shows_button.html";
  });
});

//8. თვიური და წლიური გადასახადის ღილაკები
document.addEventListener("DOMContentLoaded", () => {
  const monthlyBtn = document.getElementById("monthlyBtn");
  const yearlyBtn = document.getElementById("yearlyBtn");

  // JS იპოვის ამ ელემენტებს ID-ით
  const basicPrice = document.getElementById("basicPrice");
  const standardPrice = document.getElementById("standardPrice");
  const premiumPrice = document.getElementById("premiumPrice");
  const periods = document.querySelectorAll(".price_period");

  yearlyBtn.addEventListener("click", () => {
    yearlyBtn.classList.add("active");
    monthlyBtn.classList.remove("active");

    // ფასების შეცვლა
    basicPrice.innerText = "$95.99";
    standardPrice.innerText = "$120.99";
    premiumPrice.innerText = "$145.99";

    // პერიოდის შეცვლა
    periods.forEach((p) => (p.innerText = "/year"));
  });

  monthlyBtn.addEventListener("click", () => {
    monthlyBtn.classList.add("active");
    yearlyBtn.classList.remove("active");

    // ფასების დაბრუნება
    basicPrice.innerText = "$9.99";
    standardPrice.innerText = "$12.99";
    premiumPrice.innerText = "$14.99";

    periods.forEach((p) => (p.innerText = "/month"));
  });
});

//9. სქროლი 300პხ ს მერე
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
  window.addEventListener("scroll", () => {
    // თუ 300 პიქსელზე მეტს ჩამოვსქროლავთ, ღილაკი გამოჩნდება
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    // რბილი სქროლი ზემოთ ასასვლელად
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
