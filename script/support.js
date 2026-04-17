// 1. ელემენტების მონიშვნა (მივწვდებით ID-ებით)
const supportForm = document.getElementById("supportForm");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
const terms = document.getElementById("terms");
const countrySelect = document.getElementById("country-select");

// 2. ერორების ტექსტური ელემენტები
const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const termsError = document.getElementById("termsError");

// 3. ქვეყნის კოდის ლოგიკა (დროშის შეცვლისას)
phone.value = countrySelect.value + " "; // საწყისი მნიშვნელობა მაგ: (+995)

countrySelect.addEventListener("change", function () {
  phone.value = countrySelect.value + " ";
  phone.focus();
});

// --- 4. ნომერში ტექსტის აკრძალვა ---
phone.addEventListener("input", function (e) {
  // replace მეთოდით ვშლი ყველაფერს, რაც არ არის ციფრი ან პლუსი
  e.target.value = e.target.value.replace(/[^0-9+ ]/g, "");
});

// --- 5. ახალი ლოგიკა: მესიჯის 200 სიმბოლოს ლიმიტი ---
message.addEventListener("input", function () {
  if (this.value.length > 200) {
    this.value = this.value.slice(0, 200); // 200-ის მერე აღარაფერს წერს
  }
});

// 5. ფორმის გაგზავნის (Submit) ლოგიკა
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

  // 5. თუ ყველაფერი სწორია (Success)
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

const askQuestionBtn = document.querySelector(".ask_question_btn");

// ვამოწმებ ბრაუზერის მეხსიერებას, არის თუ არა მომხმარებელი უკვე "დარეგისტრირებული"
let isLoggedIn = localStorage.getItem("isRegistered") === "true";

askQuestionBtn.addEventListener("click", () => {
  if (!isLoggedIn) {
    // თუ არ არის დარეგისტრირებული
    let wantToRegister = confirm(
      "You are not registered yet. Would you like to register to ask a question?",
    );

    if (wantToRegister) {
      let email = prompt("Please enter your email for registration:");

      // ვალიდაცია (ცარიელი არ იყოს და @ ჰქონდეს)
      if (email && email.includes("@")) {
        alert("Registration successful!");
        localStorage.setItem("isRegistered", "true"); // ვინახავთ ბრაუზერში
        isLoggedIn = true;
        askQuestionProcess();
      } else {
        alert("Invalid email address. Please try again.");
      }
    }
  } else {
    // თუ უკვე დარეგისტრირებულია
    askQuestionProcess();
  }
});

function askQuestionProcess() {
  let userQuestion = prompt("Type your question here:");

  if (userQuestion && userQuestion.trim() !== "") {
    alert(
      "Your question has been received. You will receive a notification once we have an answer!",
    );
  } else if (userQuestion === "") {
    alert("Question cannot be empty!");
  }
}
// 6. კითხვები
document.querySelectorAll(".faq_question").forEach((item) => {
  item.addEventListener("click", () => {
    const parent = item.closest(".faq_item");
    const icon = item.querySelector(".faq_icon");

    // 1. ამოწმებს, ეს კონკრეტული კითხვა უკვე გახსნილია თუ არა
    const isOpen = parent.classList.contains("active");

    // 2. ხურავს ყველა სხვა გახსნილ კითხვას
    document.querySelectorAll(".faq_item").forEach((otherItem) => {
      if (otherItem !== parent) {
        otherItem.classList.remove("active");
        // სხვა აიკონებს ისევ პლიუსი დავუბრუნოთ
        const otherIcon = otherItem.querySelector(".faq_icon");
        if (otherIcon) otherIcon.textContent = "+";
      }
    });

    // 3. ახლა ვხსნით ან ვკეტავთ იმას, რომელსაც დავაჭირეთ
    if (isOpen) {
      parent.classList.remove("active");
      icon.textContent = "+";
    } else {
      parent.classList.add("active");
      icon.textContent = "−";
    }
  });
});

//7. სქროლი 300პხ ს მერე
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
