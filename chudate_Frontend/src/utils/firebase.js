// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, get} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA1ysQxiVJCi_Q5L_LL_qGCEqlVDP0NqXs",
  authDomain: "jodate-e8163.firebaseapp.com",
  databaseURL: "https://jodate-e8163-default-rtdb.firebaseio.com",
  projectId: "jodate-e8163",
  storageBucket: "jodate-e8163.appspot.com",
  messagingSenderId: "556924055667",
  appId: "1:556924055667:web:678c9798ddee16291afa06",
  measurementId: "G-0XHLPB6WBC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export function resetDB() {
  set(ref(db, '/group'), {});
}

// set 寫入資料
export function write(groupid, userid, username, message) {
  push(ref(db, '/group/'+ groupid), {
    userid: userid,
    username: username,
    message: message,
    timestamp: Date(Date.now())
  })
}

export async function read(groupid) {
  const itemList = []

  const snapshot = await get(ref(db, '/group/'+groupid))
  snapshot.forEach(function (s) {
        var obj = s.val()
        itemList.push(obj)
  })

  return itemList
}


