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
let data = [];

let formStore = () => {
    data.push({
        URL: burl.value,
        Name: bname.value,
        Description: desc.value,
    });
    
    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    formCreate();
}

let formCreate = () => {
    bookList.innerHTML = "";
    data.map((x,y) => {
        return (bookList.innerHTML += 
        `
        <div class="books" id=${y}>
            <img src="${x.URL}" alt="">
            <h3>${x.Name}</h3>
            <h4>
                ${x.Description}
            </h4>
            <div>
                <button onclick="updateData(this)" class="update-btn">
                    <p>Update</p>
                </button>
                <button onclick="deleteData(this); autoRefresh()" class="delete-btn">
                    <p>Delete</p>
                </button>
            </div>
        </div>
        `)
    })
    
}

let deleteData = (e) => {
    e.parentElement.parentElement.remove();
    data.splice(e.parentElement.parentElement.id, 1);
    localStorage.setItem("data", JSON.stringify(data));
}

let autoRefresh = () => location.reload();

let updateData = (e) => {
    togglePopup()
    burl.value = e.parentElement.parentElement.children[0].src.trim();
    bname.value = e.parentElement.parentElement.children[1].innerHTML.trim();
    desc.value = e.parentElement.parentElement.children[2].innerHTML.trim();
    deleteData(e);
}

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    formCreate();
})();