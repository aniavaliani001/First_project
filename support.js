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
phone.value = countrySelect.value + " "; // საწყისი მნიშვნელობა (+995)

countrySelect.addEventListener("change", function() {
    phone.value = countrySelect.value + " ";
    phone.focus();
});

// 4. ფორმის გაგზავნის (Submit) ლოგიკა
supportForm.addEventListener("submit", function(e) {
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

    // Email ვალიდაცია
    if (email.value.trim() === "") {
        emailError.textContent = "Email is required";
        isValid = false;
    } else if (!email.value.includes("@")) {
        emailError.textContent = "Email must contain @";
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