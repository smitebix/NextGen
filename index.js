function createInputBox(type, placeholder, iconClass) {
    const inputBox = document.createElement("div");
    inputBox.className = "input-box";
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    const icon = document.createElement("i");
    icon.className = iconClass;
    inputBox.append(input, icon);
    return inputBox;
}

function createFormFooter(buttonText, linkText, linkAction) {
    const footerDiv = document.createElement("div");
    const button = document.createElement("button");
    button.type = "submit";
    button.className = "btn";
    button.textContent = buttonText;

    const link = document.createElement("p");
    link.className = "register-link";
    link.innerHTML = linkText;
    link.querySelector("a").addEventListener("click", (event) => {
        event.preventDefault();
        linkAction();
    });

    footerDiv.append(button, link);
    return footerDiv;
}

function createLoginForm() {
    document.body.innerHTML = "";  // Clear current content

    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    const form = document.createElement("form");

    form.append(
        document.createElement("h1").appendChild(document.createTextNode("Login")),
        createInputBox("text", "Username", "bx bxs-user"),
        createInputBox("password", "Password", "bx bxs-lock-alt"),
        createRememberForgetSection(),
        createFormFooter(
            "Login",
            "Don't have an account? <br><a href='#'>Register</a>",
            createSignupForm
        )
    );

    wrapper.appendChild(form);
    document.body.appendChild(wrapper);
}

function createSignupForm() {
    document.body.innerHTML = "";  // Clear current content
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    const form = document.createElement("form");

    const nameInput = createInputBox("text", "Full Name", "bx bxs-user");

    // Create toggle for email/mobile
    const toggleContainer = document.createElement("div");
    toggleContainer.className = "toggle-container";

    const emailInput = createInputBox("email", "Email", "bx bxs-envelope");
    const mobileInput = createInputBox("tel", "Mobile Number", "bx bxs-mobile");

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "btn toggle-btn";
    toggleButton.innerHTML = "<i class='bx bxs-mobile'></i>"; // Default to mobile icon

    toggleButton.addEventListener("click", () => {
        if (emailInput.style.display === "none") {
            emailInput.style.display = "block";
            mobileInput.style.display = "none";
            toggleButton.innerHTML = "<i class='bx bxs-mobile'></i>";
        } else {
            emailInput.style.display = "none";
            mobileInput.style.display = "block";
            toggleButton.innerHTML = "<i class='bx bxs-envelope'></i>";
        }
    });

    // Initially set mobile input to show and email input to hide
    mobileInput.style.display = "block";
    emailInput.style.display = "none";
    toggleContainer.append(toggleButton, emailInput, mobileInput);

    const passwordInput = createInputBox("password", "Password", "bx bxs-lock-alt");
    const confirmPasswordInput = createInputBox("password", "Confirm Password", "bx bxs-lock");

    // OTP input field
    const otpInputBox = createInputBox("text", "OTP", "bx bxs-key");
    otpInputBox.style.display = "none"; // Hide OTP input initially

    // Send OTP button
    const sendOtpButton = document.createElement("button");
    sendOtpButton.type = "button";
    sendOtpButton.className = "btn";
    sendOtpButton.textContent = "Send OTP";

    sendOtpButton.addEventListener("click", () => {
        const phoneNumber = mobileInput.querySelector("input").value;
        sendOtp(phoneNumber);
    });

    // Verify OTP button
    const verifyOtpButton = document.createElement("button");
    verifyOtpButton.type = "button";
    verifyOtpButton.className = "btn";
    verifyOtpButton.textContent = "Verify OTP";
    verifyOtpButton.style.display = "none"; // Hide verify button initially

    verifyOtpButton.addEventListener("click", () => {
        const otp = otpInputBox.querySelector("input").value;
        verifyOtp(otp);
    });

    form.append(
        document.createElement("h1").appendChild(document.createTextNode("Signup")),
        nameInput,
        toggleContainer,
        sendOtpButton,
        otpInputBox,
        verifyOtpButton,
        passwordInput,
        confirmPasswordInput,
        createTermsSection(),
        createFormFooter(
            "Signup",
            "Already have an account? <br><a href='#'>Login</a>",
            createLoginForm
        )
    );

    wrapper.appendChild(form);
    document.body.appendChild(wrapper);
}

function createRememberForgetSection() {
    const rememberForget = document.createElement("div");
    rememberForget.className = "remember-forget";

    const rememberLabel = document.createElement("label");
    const rememberCheckbox = document.createElement("input");
    rememberCheckbox.type = "checkbox";
    rememberLabel.append(rememberCheckbox, "Remember me");

    const forgotPasswordLink = document.createElement("a");
    forgotPasswordLink.href = "#";
    forgotPasswordLink.textContent = "Forgot password?";

    rememberForget.append(rememberLabel, forgotPasswordLink);
    return rememberForget;
}

function createTermsSection() {
    const termsSection = document.createElement("div");
    termsSection.className = "terms";

    const termsLabel = document.createElement("label");
    const termsCheckbox = document.createElement("input");
    termsCheckbox.type = "checkbox";
    termsLabel.append(termsCheckbox, " I agree to the terms and conditions");

    termsSection.appendChild(termsLabel);
    return termsSection;
}

createLoginForm();
