//weather code
//DOM ELEMENTS
let long,
    lat;
const temp = document.querySelector("#temperature"),
    tempBlock = document.querySelector("#temp-block"),
    tempDegree = document.querySelector("#temp-degree"),
    tempBlockSpan = document.querySelector("#temp-block span");

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        long = position.coords.longitude;
        lat = position.coords.latitude;
            
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/88f549fd8ac9064986ec47a33d5338f2/${lat},${long}`;
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                const {temperature, icon} = data.currently;
                //Set DOM Elements from the API
                tempDegree.textContent = Math.floor((temperature - 32)*(5/9));
                //Set Icon
                setIcons(icon, document.querySelector(".icon"));
                tempBlock.addEventListener("click", () =>{
                    if(tempBlockSpan.textContent === "\u00B0" + "C"){
                        tempBlockSpan.textContent = "\u00B0" +"F";
                        tempDegree.textContent = Math.floor(temperature);
                    } else {
                        tempBlockSpan.textContent = "\u00B0" +"C";
                        
                        tempDegree.textContent = Math.floor((temperature - 32)*(5/9));
                    }

                });
            });
        });
}
function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}



//time-code
// DOM elements 

const time = document.querySelector("#time"),
    greeting = document.querySelector("#greeting"),
    name = document.querySelector("#name"),
    focus = document.querySelector("#focus");

// Options
const showAmPm = true;

// Show Time 

function showTime(){

    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes();

    // const amPm = hour >= 12 ? "PM" : "AM";

    // //12hr format
    // hour = hour % 12 || 12;

    //Output time
    time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)
    }`;

    setTimeout(showTime, 1000);
}

//Add zero
function addZero(n){
    return (parseInt(n, 10) < 10 ? "0" : "") + n;
}
 
// set background and greeting

function setBgGreet(){
    // let today = new Date(2019, 06, 10, 20, 33, 30),

    let today = new Date(),
    hour = today.getHours();

    if (hour < 12 && hour > 5){
        //Morning
        document.body.style.backgroundImage = "url('./img/morning-new.jpg')";
        greeting.textContent = "Good Morning";
    } else if (hour < 18){
        //afternoon
        document.body.style.backgroundImage = "url('./img/afternoon-new.jpg')";
        greeting.textContent = "Good Afternoon";
        document.body.style.color = "white";
    } else {
        //evening
        document.body.style.backgroundImage = "url('./img/evening-new.jpg')";
        greeting.textContent = "Good Evening";
        document.body.style.color = "white";
    }
    
}
//get name function
function getName(){
    if(localStorage.getItem("name") === null){
        name.textContent = "[Enter Name]"
    } else{
        name.textContent = localStorage.getItem("name");
    }
}
//set Name
function setName(e){
    if(e.type === "keypress"){
        //Make sure enter is pressed
        if(e.which == 13 || e.keyCode == 13){
            localStorage.setItem("name", e.target.innerText);
            name.blur(); 
        }
    } else{
        localStorage.setItem("name", e.target.innerText);
    }
}
//get focus function
function getFocus(){
    if(localStorage.getItem("focus") === null){
        focus.textContent = "[Enter Focus]"
    } else{
        focus.textContent = localStorage.getItem("focus");
    }
}
function setFocus(e){
    if(e.type === "keypress"){
        //Make sure enter is pressed
        if(e.which == 13 || e.keyCode == 13){
            localStorage.setItem("focus", e.target.innerText);
            focus.blur(); 
        }
    } else{
        localStorage.setItem("focus", e.target.innerText);
    }
}
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);

//Run

showTime();
setBgGreet();
getName();
getFocus();

