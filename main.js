//POP UP VISIBILITY

function togglePopup(){
    let popup = document.getElementById("popup");
    if(popup.style.visibility == "visible"){
        popup.style.visibility = "hidden"
    }
    else{
        popup.style.visibility = "visible"
    }
    document.getElementById("form").reset();
}

//FORM CRUD
let form = document.getElementById("form");
let burl = document.getElementById("burl");
let bname = document.getElementById("bname");
let desc = document.getElementById("desc");
let bookList = document.getElementById("bookList");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if(burl.value === ""){
        console.log("Empty");
    }
    else{
        console.log("Contained");
        formStore();
        togglePopup();
    }
}

//temp storage 
let data = {};

let formStore = () => {
    data["URL"] = burl.value;
    data["Name"] = bname.value;
    data["Description"] = desc.value;
    console.log(data);
    formCreate();
}

let formCreate = () => {
    bookList.innerHTML += 
    `
    <div class="books">
        <img src="${data.URL}" alt="">
        <h3>${data.Name}</h3>
        <h4>
            ${data.Description}
        </h4>
        <div>
            <button onclick="updateData(this)" class="update-btn">
                <p>Update</p>
            </button>
            <button onclick="deleteData(this)" class="delete-btn">
                <p>Delete</p>
            </button>
        </div>
    </div>
    `
}

let deleteData = (e) => {
    e.parentElement.parentElement.remove();
}

let updateData = (e) => {
    togglePopup()
    burl.value = e.parentElement.parentElement.children[0].src.trim();
    bname.value = e.parentElement.parentElement.children[1].innerHTML.trim();
    desc.value = e.parentElement.parentElement.children[2].innerHTML.trim();
    deleteData(e);
}

