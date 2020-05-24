const formContainer = document.querySelector(".js-form"),
formInput = formContainer.querySelector("input"),
greeting = document.querySelector(".js-greetings"),
ID_todoForm = document.getElementById("todoForm");

const LS_USERNAME = "username",
CN_SHOWING = "showing";

function manageVisibility(visibility) {
    if (visibility === "visible") {
        ID_todoForm.style.visibility = "visible";
    }
    else {
        ID_todoForm.style.visibility = "hidden";
    }
}

function saveUsername(text) { //Save input username into localStorage
    localStorage.setItem(LS_USERNAME, text);
}

function handleSubmit(event) {
    event.preventDefault(); //prevent the default process of refreshing
    const currentValue = formInput.value;
    showGreeting(currentValue);
    saveUsername(currentValue);
    //location.reload();
    manageVisibility("visible");
}

function askForName() {
    formContainer.classList.add(CN_SHOWING);
    greeting.classList.remove(CN_SHOWING);
    formContainer.addEventListener("submit", handleSubmit);  
}

function showGreeting(text) {
    formContainer.classList.remove(CN_SHOWING);
    greeting.classList.add(CN_SHOWING);
    greeting.innerHTML = `Hello, ${text}`;
}

function loadUsername() {
    const currentUser = localStorage.getItem(LS_USERNAME);
    if (currentUser === null) { //no user stored
        manageVisibility("hidden");
        askForName();
    }
    else { //there is a user
        manageVisibility("visible");
        showGreeting(currentUser);
    }
}

function init() {
    loadUsername();
}
init();