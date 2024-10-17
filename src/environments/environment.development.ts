// environment.development.ts
export const environment = {
    production: false,
    // supposing you have a backend where to send some requests
    trainerServiceBackendUrl: "http://127.0.0.1:8000",
    // The firebase config you retrieved from the console.
    // Note that this is NOT sensitive information
    firebaseConfig: {
        apiKey: "AIzaSyBzkGSXTRd_UIp3m6_81xDuSOr9g1i4Vts",
        authDomain: "o1iosotpsetup.firebaseapp.com",
        databaseURL: "https://o1iosotpsetup.firebaseio.com",
        projectId: "o1iosotpsetup",
        storageBucket: "o1iosotpsetup.appspot.com",
        messagingSenderId: "216035287049",
        appId: "1:216035287049:web:bc3efed50f93c9d698d8d8",
        measurementId: "G-8V7HNES42M",
    },
  };