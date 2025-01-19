  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
  import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDct3wQuCXqJvM0_DI6pkqwBqefqVsxAOg",
    authDomain: "loginsignupapp-496d0.firebaseapp.com",
    projectId: "loginsignupapp-496d0",
    storageBucket: "loginsignupapp-496d0.firebasestorage.app",
    messagingSenderId: "259977373016",
    appId: "1:259977373016:web:3ccf6a5ae51d362890f12d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

let container = document.getElementById("container");
// let user_inp = document.createElement("input");
// user_inp.setAttribute("type", "text");
// user_inp.setAttribute("placeholder", "Enter your task");
// user_inp.setAttribute("id", "inp1");
// user_inp.setAttribute("class", "input1")
// container.appendChild(user_inp);

// let add_btn = document.createElement("button");
// add_btn.setAttribute("class", "add_btn");
// add_btn.setAttribute("type", "submit");
// add_btn.setAttribute("onclick", "todo_app()");
// container.appendChild(add_btn);

let add_btn = document.getElementById("add_btn");
add_btn.addEventListener("click", todo_app);

let list_div = document.createElement("div");
list_div.setAttribute("class", "list_div");
container.appendChild(list_div);

let input_data

async function todo_app() {
    input_data = document.getElementById("inp1").value;
    console.log(input_data);    
    if (input_data === ""){
        alert("Please Enter Task To Add!");
        return;
    }
   
// add doc in database
    try {
        const docRef = await addDoc(collection(db, "users"), {
          task: input_data
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
    }
    get_data_db();
   input_data = "";
}

async function get_data_db() {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);

    let li_4_div = document.createElement("li");
        
    li_4_div.textContent = doc.data().task;
    
    let edit_btn = document.createElement("button");
        edit_btn.setAttribute("class", "edit_btn");
        edit_btn.onclick = function () {
            let new_edited_input = prompt("Edit Your Task", input_data);
            if (new_edited_input !== null || new_edited_input !== "") {
                li_4_div.textContent = new_edited_input;
                li_4_div.appendChild(edit_btn);
                li_4_div.appendChild(del_btn);
            }
        }

        let del_btn = document.createElement("button");
        del_btn.setAttribute("class", "del_btn");
        del_btn.onclick = del_doc_db();
        // function () {
        //     list_div.removeChild(li_4_div);
        // }
    list_div.appendChild(li_4_div);
    li_4_div.appendChild(edit_btn);
    li_4_div.appendChild(del_btn);
    });

    async function del_doc_db() {
        await deleteDoc(doc(db, "users", "OuJr9nlPd0le8s6wmN6V"));
    }
};
// input_data.addEventListener("keypress", function(event) {
//     if (event.key === "Enter") {
//         todo_app();
//     }
// });
