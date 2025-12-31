import { Preloader } from "@/components/common";
import "normalize.css/normalize.css";
import React from "react";
import { createRoot } from "react-dom/client";
import "react-phone-input-2/lib/style.css";
import {
  onAuthStateFail,
  onAuthStateSuccess,
} from "@/redux/actions/authActions";
import configureStore from "@/redux/store/store";
import "@/styles/tailwind.css";
import "@/styles/style.scss";
import WebFont from "webfontloader";
import App from "./App";
import firebase from "@/services/firebase";

WebFont.load({
  google: {
    families: ["Roboto"],
  },
});

const { store, persistor } = configureStore();
const container = document.getElementById("app");
const root = createRoot(container);

// Render the preloader on initial load
root.render(<Preloader />);

firebase.auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(onAuthStateSuccess(user));
  } else {
    store.dispatch(onAuthStateFail("Failed to authenticate"));
  }
  // then render the app after checking the auth state
  root.render(<App store={store} persistor={persistor} />);
});

// Service Worker disabled temporarily to fix production errors
// if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("ScriptsFolder/subFolder/sw.js")
//       .then((registration) => {
//         console.log("SW registered: ", registration);
//       })
//       .catch((registrationError) => {
//         console.log("SW registration failed: ", registrationError);
//       });
//   });
// }
