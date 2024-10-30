import { auth, RecaptchaVerifier, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification } from './config.js';

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

    // Email input
    const emailInput = createInputBox("email", "Email", "bx bxs-envelope");

    const passwordInput = createInputBox("password", "Password", "bx bxs-lock-alt");
    const confirmPasswordInput = createInputBox("password", "Confirm Password", "bx bxs-lock");

    // Send OTP button
    const sendOtpButton = document.createElement("button");
    sendOtpButton.type = "button";
    sendOtpButton.className = "btn";
    sendOtpButton.textContent = "Send OTP";

    // OTP input field
    const otpInputBox = createInputBox("text", "OTP", "bx bxs-key");
    otpInputBox.style.display = "none"; // Hide OTP input initially

    // Verify OTP button
    const verifyOtpButton = document.createElement("button");
    verifyOtpButton.type = "button";
    verifyOtpButton.className = "btn";
    verifyOtpButton.textContent = "Verify OTP";
    verifyOtpButton.style.display = "none"; // Hide verify button initially

    // Send OTP functionality
    sendOtpButton.addEventListener("click", async () => {
        const email = emailInput.querySelector("input").value;
        await sendOtp(email);
    });

    // Verify OTP functionality
    verifyOtpButton.addEventListener("click", () => {
        const otp = otpInputBox.querySelector("input").value;
        verifyOtp(otp);
    });

    form.append(
        document.createElement("h1").appendChild(document.createTextNode("Signup")),
        nameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        sendOtpButton,
        otpInputBox,
        verifyOtpButton,
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

async function handleSignup(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Send verification email
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
            // Redirect or perform further actions
        } else {
            alert("Please verify your email before logging in.");
        }
    } catch (error) {
        alert(error.message);
    }
}

// Modify the form submission event to call handleSignup or handleLogin
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.querySelector('input[type="email"]').value;
        const password = document.querySelector('input[type="password"]').value;

        if (event.target.querySelector('h1').innerText === "Signup") {
            handleSignup(email, password);
        } else {
            handleLogin(email, password);
        }
    });
});

createLoginForm();

// OTP Functions
async function sendOtp(email) {
    // This is where you'd implement sending the OTP to the user's email
    // For demonstration purposes, you could simply alert the user
    alert(`An OTP has been sent to ${email}.`);
}

function verifyOtp(otp) {
    // Verify the OTP entered by the user
    // You will implement the logic to check if the entered OTP is correct
    // For demonstration purposes, you could alert the user
    alert(`OTP ${otp} verified successfully!`);
}
