import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDk0ETONGqGGhawGguiZo0_uDB7LBgKbdM",
  authDomain: "import-export-hub-ac653.firebaseapp.com",
  projectId: "import-export-hub-ac653",
  storageBucket: "import-export-hub-ac653.firebasestorage.app",
  messagingSenderId: "936317602416",
  appId: "1:936317602416:web:1b56e8ba8e8c929e27c2b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);