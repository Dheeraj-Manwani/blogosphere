import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAEzFzNTPF0UF-scUqAhrHbzSD0at3pNoE",
  authDomain: "blogosphere-app.firebaseapp.com",
  projectId: "blogosphere-app",
  //   storageBucket: "gs://blogosphere-app.appspot.com",
  storageBucket: "blogosphere-app.appspot.com",
  messagingSenderId: "903595750242",
  appId: "1:903595750242:web:beee6b2c0c32cf69b9f23b",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://blogosphere-app.appspot.com");

export const uploadFile = (file) => {
  console.log("file::::  ", file);
  const storageRef = ref(storage, "some-child");
  // 'file' comes from the Blob or File API
  uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
  });
};
