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

    // 3) Register ღილაკზე დაჭერის ლოგიკა
    if (goSupportBtn) {
      goSupportBtn.addEventListener("click", () => {
        const currentPath = window.location.pathname;

        // თუ უკვე Support-ის გვერდზე ვართ:
        if (currentPath.includes("support.html")) {
          notifModal.classList.remove("show");

          // თუ ფორმას აქვს id="supportForm", ჩასქროლავს პირდაპირ ფორმასთან
          const formElement =
            document.getElementById("supportForm") ||
            document.querySelector("form");
          if (formElement) {
            formElement.scrollIntoView({ behavior: "smooth" });
          }
        }
        // თუ Movies გვერდზე ვართ (pages ფოლდერში):
        else if (currentPath.includes("/pages/")) {
          window.location.href = "./support.html";
        }
        // თუ მთავარ გვერდზე (index.html) ვართ:
        else {
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

// 2. ელემენტების მონიშვნა (მივწვდებით ID-ებით)
const supportForm = document.getElementById("supportForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
const terms = document.getElementById("terms");
const countrySelect = document.getElementById("country-select");

// 3. ერორების ტექსტური ელემენტები
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const termsError = document.getElementById("termsError");

// 4. ქვეყნის კოდის ლოგიკა (დროშის შეცვლისას)
phone.value = countrySelect.value + " "; // საწყისი მნიშვნელობა მაგ: (+995)

countrySelect.addEventListener("change", function () {
  phone.value = countrySelect.value + " ";
  phone.focus();
});

// --- 5. ნომერში ტექსტის აკრძალვა ---
phone.addEventListener("input", function (e) {
  // replace მეთოდით ვშლი ყველაფერს, რაც არ არის ციფრი ან პლუსი
  e.target.value = e.target.value.replace(/[^0-9+ ]/g, "");
});

// --- 6. ახალი ლოგიკა: მესიჯის 200 სიმბოლოს ლიმიტი ---
message.addEventListener("input", function () {
  if (this.value.length > 200) {
    this.value = this.value.slice(0, 200); // 200-ის მერე აღარაფერს წერს
  }
});

// 7. ფორმის გაგზავნის (Submit) ლოგიკა
supportForm.addEventListener("submit", function (e) {
  e.preventDefault(); // რომ გვერდი არ გადაიტვირთოს

  // ერორების გასუფთავება ყოველ დაჭერაზე
  firstNameError.textContent = "";
  lastNameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  termsError.textContent = "";

  let isValid = true;

  // First Name ვალიდაცია
  if (firstName.value.trim() === "") {
    firstNameError.textContent = "First Name is required";
    isValid = false;
  }

  // Last Name ვალიდაცია
  if (lastName.value.trim() === "") {
    lastNameError.textContent = "Last Name is required";
    isValid = false;
  }

  // Email ვალიდაცია (ზუსტი ერორით)
  const emailVal = email.value.trim();
  if (emailVal === "") {
    emailError.textContent = "Email is required";
    isValid = false;
  } else if (!emailVal.includes("@")) {
    emailError.textContent = `mail is required, please include an "@" in the email adress. '${emailVal}' is missing an "@".`;
    isValid = false;
  }

  // Message ვალიდაცია
  if (message.value.trim() === "") {
    messageError.textContent = "Message is required";
    isValid = false;
  }

  // Terms (Checkbox) ვალიდაცია
  if (!terms.checked) {
    termsError.textContent = "You must agree to the terms";
    isValid = false;
  }

  // 8. თუ ყველაფერი სწორია (Success)
  if (isValid) {
    // ფორმის კონტეინერის ჩანაცვლება მადლობის ტექსტით
    const formContainer = document.querySelector(".support_formcontainer");
    formContainer.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; color: white;">
                <h2 style="font-size: 32px; margin-bottom: 20px;">Thank you, ${firstName.value}!</h2>
                <p style="color: #999999; font-size: 18px;">Your message has been received. We will get back to you soon.</p>
                <button onclick="window.location.reload()" style="margin-top: 30px; background: #e50000; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer;">Send Another Message</button>
            </div>
        `;
  }
});

//FAQ question border modal
document.addEventListener("DOMContentLoaded", () => {
  const askQuestionBtn = document.querySelector(".ask_question_btn");
  const askQuestionModal = document.getElementById("askQuestionModal");
  const closeAskModal = document.getElementById("closeAskModal");
  const askQuestionForm = document.getElementById("askQuestionForm");

  const askFormContainer = document.getElementById("askFormContainer");
  const askSuccessMessage = document.getElementById("askSuccessMessage");
  const userSentEmail = document.getElementById("userSentEmail");
  const closeSuccessBtn = document.getElementById("closeSuccessBtn");

  // მოდალის პირვანდელ მდგომარეობაში დაბრუნება და დახურვა
  function resetAndCloseModal() {
    askQuestionModal.classList.remove("show");
    setTimeout(() => {
      if (askFormContainer && askSuccessMessage) {
        askFormContainer.style.display = "block";
        askSuccessMessage.style.display = "none";
      }
      if (askQuestionForm) askQuestionForm.reset();
    }, 300);
  }

  if (askQuestionBtn && askQuestionModal) {
    // 1. "Ask a Question" ღილაკზე დაჭერისას მოდალის გახსნა
    askQuestionBtn.addEventListener("click", (e) => {
      e.preventDefault();
      askQuestionModal.classList.add("show");
    });

    // 2. X ღილაკზე დაჭერით დახურვა
    if (closeAskModal) {
      closeAskModal.addEventListener("click", resetAndCloseModal);
    }

    // 3. შავ ფონზე (Backdrop) დაჭერით დახურვა
    askQuestionModal.addEventListener("click", (e) => {
      if (e.target === askQuestionModal) {
        resetAndCloseModal();
      }
    });

    // 4. წარმატების ფანჯარაში "Got it" ღილაკზე დაჭერით დახურვა
    if (closeSuccessBtn) {
      closeSuccessBtn.addEventListener("click", resetAndCloseModal);
    }

    // 5. ფორმის გაგზავნა (ALERT-ის გარეშე!)
    if (askQuestionForm) {
      askQuestionForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("askEmail").value;
        if (userSentEmail) userSentEmail.textContent = email;

        // ფორმას ვმალავთ და იმავე ჩარჩოში ვუჩვენებთ წარმატების შეტყობინებას
        askFormContainer.style.display = "none";
        askSuccessMessage.style.display = "block";
      });
    }
  }
});

// 9. კითხვები
document.querySelectorAll(".faq_question").forEach((item) => {
  item.addEventListener("click", () => {
    const parent = item.closest(".faq_item");
    const icon = item.querySelector(".faq_icon");

    // 1). ამოწმებს, ეს კონკრეტული კითხვა უკვე გახსნილია თუ არა
    const isOpen = parent.classList.contains("active");

    // 2) ხურავს ყველა სხვა გახსნილ კითხვას
    document.querySelectorAll(".faq_item").forEach((otherItem) => {
      if (otherItem !== parent) {
        otherItem.classList.remove("active");
        // სხვა აიკონებს ისევ პლიუსი დავუბრუნოთ
        const otherIcon = otherItem.querySelector(".faq_icon");
        if (otherIcon) otherIcon.textContent = "+";
      }
    });

    // 3) ახლა ვხსნით ან ვკეტავთ იმას, რომელსაც დავაჭირეთ
    if (isOpen) {
      parent.classList.remove("active");
      icon.textContent = "+";
    } else {
      parent.classList.add("active");
      icon.textContent = "−";
    }
  });
});

//9. სქროლი 300პხ ს მერე
const backToTopBtn = document.getElementById("backToTop");

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
