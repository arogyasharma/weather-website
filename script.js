const weartherform= document.querySelector(".head");
const cityinput= document.querySelector(".city");
const card = document.querySelector(".content");

const apikey="61265f77c8cae794363bfc75b8b92b0a"

weartherform.addEventListener("submit",async event=>{
    event.preventDefault();

    const city= cityinput.value;
    if(city){
        try{
            const weatherdata= await getweatherdata(city);
            displayweatherinfo(weatherdata);

        }
        catch(error){
            console.error(error);
            displayerror(error);
        }

    }
    else{
        displayerror("please enter a city");
    }


});

async function getweatherdata(city){
    const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiurl);
    console.log(response);
    if(!response.ok){
        throw new Error("could not fetch data");
    }
        return await response.json();   
}

function displayweatherinfo(data){
    console.log(data);

    const {name:city,
           main:{temp,humidity}, 
           wind:{speed},
           weather:[{description,id}]} = data;

           card.textContent="";
           card.style.display="flex";
           const citydisplay= document.createElement("h1");
           const tempdisplay= document.createElement("p");
           const humiditydisplay= document.createElement("p");
           const speeddisplay= document.createElement("p");
           const descdisplay= document.createElement("p");
           const weatheremoji= document.createElement("p");

           citydisplay.textContent= city;
           tempdisplay.textContent= `${(temp-273.15).toFixed(1)}°c`;
           humiditydisplay.textContent=  `Humidity: ${humidity}%`;
           speeddisplay.textContent=  `wind speed: ${speed}km/h`;
           descdisplay.textContent= description;
           weatheremoji.textContent= getweatheremoji(id);

           citydisplay.classList.add("citydisplay");
           tempdisplay.classList.add("tempdisplay");
           humiditydisplay.classList.add("humiditydisplay");
           speeddisplay.classList.add("speeddisplay");
           descdisplay.classList.add("descdisplay");
           weatheremoji.classList.add("weatheremoji");


           card.appendChild(citydisplay);
           card.appendChild(tempdisplay);
           card.appendChild(humiditydisplay);
           card.appendChild(speeddisplay);
           card.appendChild(descdisplay);
           card.appendChild(weatheremoji);

}

function getweatheremoji(weatherid){
    switch(true){
        case (weatherid >= 200 && weatherid < 300):
            return "⛈️";
        case (weatherid >= 300 && weatherid < 400):
            return "🌧️";
        case (weatherid >= 500 && weatherid < 600):
            return "🌦️";
        case (weatherid >= 600 && weatherid < 700):
            return "❄️";
        case (weatherid >= 700 && weatherid < 800):
            return "💨";
        case (weatherid === 800):
            return "☀️";
        case (weatherid >= 801 && weatherid < 810):
            return "☁️";
        default:
            return "❓";
    }

}

function displayerror(message){

    const errordisplay = document.createElement("p");
  errordisplay.textContent = message;
  errordisplay.classList.add("errordisplay");
    
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay);
}