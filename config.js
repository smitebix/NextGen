import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


 const firebaseConfig = {
  apiKey: "AIzaSyC2UiNhd20V9lKTGXT4gl7uB2NTK-ZvyNw",
  authDomain: "myproject9090-444fc.firebaseapp.com",
  databaseURL: "https://myproject9090-444fc-default-rtdb.firebaseio.com",
  projectId: "myproject9090-444fc",
  storageBucket: "myproject9090-444fc.firebasestorage.app",
  messagingSenderId: "314456664907",
  appId: "1:314456664907:web:ea39627889c7e65f2f16ce",
  measurementId: "G-HPZG0CKD9E"
 };
 // Initialize Firebase
    // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
	
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
				// Redirect or perform further actions
			} else {
				alert("Please verify your email before logging in.");
			}
		} catch (error) {
			alert(error.message);
		}
	}
	// Modify the form submission event to call handleSignup or handleLogin
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
	