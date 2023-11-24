

const url = 'https://yahoo-weather5.p.rapidapi.com/weather?format=json&u=f&location=';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c31dd605c6mshd2c54bb01675a90p18ca1fjsnb51a19701c76',
		'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
	}
};

const W_City = document.querySelector(".search input");
const W_Button = document.querySelector(".search button");
const W_Icon = document.querySelector(".W-icon");
const Iconm = document.querySelector(".iconm");
const Icont = document.querySelector(".icont");
const Iconw = document.querySelector(".iconw");
const Iconth = document.querySelector(".iconth");
const Iconf = document.querySelector(".iconf");
const Icons = document.querySelector(".icons");
const Iconsu = document.querySelector(".iconsu");

const url2= 'https://weatherapi-com.p.rapidapi.com/history.json?&lang=en';
const options2 = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'abe5c46282msh0d9b8f45a9d346fp111d8ajsn88f7a74f6577',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};

// Fetch data from the API

   
async function checkweather(city)
{
    const response = await fetch(url+city , options);
    var data = await response.json();
    console.log(data);
    
    time_zone = data.location.timezone_id;
    var currentTime = new Date().toLocaleString({timeZone: time_zone});
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = today.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const response2 = await fetch(url2+"&q="+city+"&dt="+ formattedDate, options2);
    var data2 = await response2.json();
    console.log(data2);

 
 
  
    document.querySelector(".time").innerHTML = currentTime;
    document.querySelector(".m").innerHTML  = data.current_observation.wind.chill + " °F ";
    document.querySelector(".y").innerHTML  = data.current_observation.condition.text;

    document.querySelector(".city").innerHTML  = data.location.city;
    document.querySelector(".temp").innerHTML  = Math.round(data.current_observation.condition.temperature) + "°F";
    document.querySelector(".itemh").innerHTML  = data.current_observation.atmosphere.humidity + "%";
    document.querySelector(".itemsr").innerHTML = data.current_observation.astronomy.sunrise;
    document.querySelector(".itemss").innerHTML = data.current_observation.astronomy.sunset;
    document.querySelector(".itemi").innerHTML  = data.current_observation.wind.speed;
    
    document.querySelector(".dayc").innerHTML  = data.forecasts[0].day;
    document.querySelector(".datec").innerHTML = C_Timestamp( data.forecasts[0].date);
    document.querySelector(".ctempn").innerHTML= "Min:" + data.forecasts[0].low  + "°F";
    document.querySelector(".ctempd").innerHTML= "Max:" + data.forecasts[0].high  + "°F";
    
    document.querySelector(".daytu").innerHTML = data.forecasts[1].day;
    document.querySelector(".datetu").innerHTML= C_Timestamp( data.forecasts[1].date);
    document.querySelector(".ttempn").innerHTML= "Min:" + data.forecasts[1].low  + "°F";
    document.querySelector(".ttempd").innerHTML= "Max:" + data.forecasts[1].high  + "°F";

    document.querySelector(".dayw").innerHTML  = data.forecasts[2].day;
    document.querySelector(".datew").innerHTML = C_Timestamp( data.forecasts[2].date);
    document.querySelector(".wtempn").innerHTML= "Min:" + data.forecasts[2].low + "°F";
    document.querySelector(".wtempd").innerHTML= "Max:" + data.forecasts[2].high+ "°F";
   
    document.querySelector(".dayt").innerHTML = data.forecasts[3].day;
    document.querySelector(".datet").innerHTML= C_Timestamp( data.forecasts[3].date);
    document.querySelector(".thtempn").innerHTML= "Min:" + data.forecasts[3].low + "°F";
    document.querySelector(".thtempd").innerHTML= "Max:" + data.forecasts[3].high+ "°F";

    document.querySelector(".dayf").innerHTML= data.forecasts[4].day;
    document.querySelector(".datef").innerHTML=C_Timestamp( data.forecasts[4].date);
    document.querySelector(".ftempn").innerHTML= "Min:" + data.forecasts[4].low + "°F";
    document.querySelector(".ftempd").innerHTML= "Max:" + data.forecasts[4].high+ "°F";

    document.querySelector(".days").innerHTML = data.forecasts[5].day;
    document.querySelector(".dates").innerHTML = C_Timestamp( data.forecasts[5].date);
    document.querySelector(".stempn").innerHTML= "Min:" + data.forecasts[5].low + "°F";
    document.querySelector(".stempd").innerHTML= "Max:" + data.forecasts[5].high+ "°F";

    document.querySelector(".daysu").innerHTML = data.forecasts[6].day;
    document.querySelector(".datesu").innerHTML = C_Timestamp( data.forecasts[6].date);
    document.querySelector(".sutempn").innerHTML= "Min:" + data.forecasts[6].low + "°F";
    document.querySelector(".sutempd").innerHTML= "Max:" + data.forecasts[6].high+ "°F";

    //document.querySelector(".time").innerHTML = Time;

    //document.querySelector(".W-wind").innerHTML = data.wind.speed + "km/h";
     W_Icon.src = imagechange(data.current_observation.condition.text);
     Iconm.src = imagechange(data.forecasts[0].text);
     Icont.src = imagechange(data.forecasts[1].text);
     Iconw.src = imagechange(data.forecasts[2].text);
     Iconth.src = imagechange(data.forecasts[3].text);
     Iconf.src = imagechange(data.forecasts[4].text);
     Icons.src = imagechange(data.forecasts[5].text);
     Iconsu.src = imagechange(data.forecasts[6].text);

     fetch(url2 + "&q=" + city + "&dt=" + formattedDate, options2)
     .then((response2) => response2.json())
     .then((data2) => {
       // Extract the hourly temperature data from the API response
       const hourlyTemperatures = data2.forecast.forecastday[0].hour.map((hour) => hour.temp_f);
   
       // Create an array of timestamps for the x-axis (1 to 24 hours)
       const timestamps = Array.from({ length: 24 }, (_, i) => i + 1);
   
       // Create a line chart using Chart.js
       const ctx = document.getElementById('temperatureChart').getContext('2d');
       const temperatureChart = new Chart(ctx, {
         type: 'line',
         data: {
           labels: timestamps,
           datasets: [{
             label: 'Hourly Temperature',
             data: hourlyTemperatures,
             borderColor: 'rgba(75, 192, 192, 1)',
             borderWidth: 2,
             fill: false,
           }],
         },
         options: {
           scales: {
             x: {
               beginAtZero: true,
             },
             y: {
               beginAtZero: true,
             },
           },
         },
       });
     })
     .catch((error) => console.error('Error fetching data:', error));
}




W_Button.addEventListener("click", ()=>{
    checkweather(W_City.value);
})

function C_Timestamp(timestamp) {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month (0-based) and ensure 2-digit format
    const day = date.getDate().toString().padStart(2, '0'); // Ensure 2-digit format
    return `${year}-${month}-${day}`;
}

function imagechange(text)
{
   let dest;
    if (text== "Cloudy" || text== "Partly Cloudy" || text== "Mostly Cloudy" ){
        dest="images/cloud.png"
        }
        
        else if (text== "Sunny" || text== "Mostly Sunny" ){
       dest="images/clear.png"
            }
        else if (text== "Mist"){
       dest="images/mist.png"
        }
        else if (text== "Rainy" ){
       dest="images/rain.png"
        }
        else if ( text== "Showers"){
       dest="images/Snow.png"
        }
        else if (text== "Drizzle"){
       dest="images/dizzle.png"
        }
        else if(text == "Thundestorms"){
            dest="images/thunder.jpg"
        }
        else{
           dest="images/clear.png" 
        }
        return dest

    
      
    
      
}



function convertTimestampToTime(timestamp) 
    {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; 
    const formattedTime = formattedHours + ':' + minutes.substr(-2);
    return formattedTime + ' ' + amPm;
   }


  
   
   
   
   
   
   
   


    