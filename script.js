const weartherform= document.getElementById("head");
const cityinput= document.getElementById("city");
const card = document.getElementById("content");

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
           const emojidisplay= document.createElement("p");

           citydisplay.textContent= city;
           tempdisplay.textContent= temp;
           humiditydisplay.textContent= humidity;
           speeddisplay.textContent= speed;
           descdisplay.textContent= description;
           emojidisplay.textContent= id;

           citydisplay.classList.add("citydisplay");
           tempdisplay.classList.add("tempdisplay");
           humiditydisplay.classList.add("humiditydisplay");
           speeddisplay.classList.add("speeddisplay");
           descdisplay.classList.add("descdisplay");
           emojidisplay.classList.add("emojidisplay");


           card.append(citydisplay);
           card.append(tempdisplay);
           card.append(humidity);
           card.append(speeddisplay);
           card.append(descdisplay);
           card.append(emojidisplay);

}

function getweatheremoji(weatherid){

}

function displayerror(message){

    const errordisplay = document.createElement("p");
  errordisplay.textContent = message;
  errordisplay.classList.add("errordisplay");
    
    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay);
}