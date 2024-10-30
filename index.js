import { auth, RecaptchaVerifier, signInWithPhoneNumber, createUserWithEmailAndPassword, sendEmailVerification } from './config.js';

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
    const termsContainer = document.createElement("div");
    termsContainer.className = "terms-container";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "terms-checkbox";

    const label = document.createElement("label");
    label.htmlFor = "terms-checkbox";
    label.innerHTML = "I agree to the <a href='#'>Terms and Conditions</a>";

    termsContainer.append(checkbox, label);
    return termsContainer;
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

	// Create recaptcha container dynamically
    const recaptchaContainer = document.createElement("div");
    recaptchaContainer.id = "recaptcha-container";
    document.body.appendChild(recaptchaContainer); // Append to the body

    const nameInput = createInputBox("text", "Full Name", "bx bxs-user");

    // Toggle for email/mobile
    const toggleContainer = document.createElement("div");
    toggleContainer.className = "toggle-container";

    const emailInput = createInputBox("email", "Email", "bx bxs-envelope");
    const mobileInput = createInputBox("tel", "Mobile Number", "bx bxs-mobile");

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "btn toggle-btn";
    toggleButton.innerHTML = "<i class='bx bxs-mobile'></i>";

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

    // Initially show mobile input, hide email input
    mobileInput.style.display = "block";
    emailInput.style.display = "none";
    toggleContainer.append(toggleButton, emailInput, mobileInput);

    const passwordInput = createInputBox("password", "Password", "bx bxs-lock-alt");
    const confirmPasswordInput = createInputBox("password", "Confirm Password", "bx bxs-lock");

    // OTP input field
    const otpInputBox = createInputBox("text", "OTP", "bx bxs-key");
    otpInputBox.style.display = "none";

    // Send OTP button
    const sendOtpButton = document.createElement("button");
    sendOtpButton.type = "button";
    sendOtpButton.className = "btn";
    sendOtpButton.textContent = "Send OTP";

    sendOtpButton.addEventListener("click", () => {
        const phoneNumber = mobileInput.querySelector("input").value;
        if (phoneNumber) {
            sendOtp(phoneNumber);
            otpInputBox.style.display = "block";
        } else {
            alert("Please enter a valid phone number.");
        }
    });

    // Verify OTP button
    const verifyOtpButton = document.createElement("button");
    verifyOtpButton.type = "button";
    verifyOtpButton.className = "btn";
    verifyOtpButton.textContent = "Verify OTP";
    verifyOtpButton.style.display = "none";

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

async function handleSignup(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await sendEmailVerification(user);
        alert("Verification email sent! Please check your inbox.");
    } catch (error) {
        alert(error.message);
    }
}

async function handleLogin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        if (user.emailVerified) {
            alert("Login successful!");
        } else {
            alert("Please verify your email before logging in.");
        }
    } catch (error) {
        alert(error.message);
    }
}

function sendOtp(phoneNumber) {
    if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
    }

    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', { size: 'invisible' }, auth);
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            alert('OTP sent to your phone.');
        })
        .catch((error) => {
            console.error('Error sending OTP:', error);
            alert('Error sending OTP.');
        });
}

function verifyOtp(otp) {
    if (!window.confirmationResult) {
        alert("No OTP sent.");
        return;
    }
    window.confirmationResult.confirm(otp)
        .then((result) => {
            alert('Phone number verified successfully!');
        }).catch((error) => {
            console.error('Error during OTP verification:', error);
            alert('Invalid OTP.');
        });
}

createLoginForm();
