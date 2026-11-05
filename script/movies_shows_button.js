//1. ნოტიფიკაციის ღილაკი
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

    // 3) Register ღილაკზე დაჭერისას გადავიდეს Support-ის გვერდზე (გასწორებულია ლინკი!)
    if (goSupportBtn) {
      goSupportBtn.addEventListener("click", () => {
        // თუ უკვე pages ფოლდერში ვართ:
        if (window.location.pathname.includes("/pages/")) {
          window.location.href = "./support.html";
        } else {
          // თუ index.html-ზე ვართ:
          window.location.href = "./pages/support.html";
        }
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

// scroll to top 300px-ზე
const backToTopBtn = document.getElementById("backToTop");

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
