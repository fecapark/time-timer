importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

/*
These keys are secured by firebase security rules
*/
firebase.initializeApp({
  apiKey: "AIzaSyD21vD66EKhrhmn_tMSYDDGTFmSVgdyk1o",
  projectId: "time-timer-2dfc2",
  storageBucket: "time-timer-2dfc2.appspot.com",
  messagingSenderId: "967984437557",
  appId: "1:967984437557:web:d995fb425e91b470d4547c",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
