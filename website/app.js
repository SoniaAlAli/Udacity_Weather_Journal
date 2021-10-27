/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// API Key from OpenWeatherMap

const apiKey = '&appid=0aac2a4a94d00fa44b02115462a129c9';
const baseURL ='https://api.openweathermap.org/data/2.5/weather?zip=';

// Add listener to Generate button

document.getElementById('generate').addEventListener('click', runResult);

function runResult(e){
    const userZip = document.getElementById('zip').value;
    const userFeelings = document.getElementById('feelings').value;
    getUserWeather(baseURL, userZip, apiKey)
    .then(function(data) {
        console.log(data);
        postResult('http://localhost:3000/add', {temp:data.main.temp, date:newDate, feelings:userFeelings})
        updateUI();
    });
};

// GET API function

const getUserWeather = async (baseURL,userZip,apiKey)=>{
    const res = await fetch(baseURL+userZip+apiKey)
    try{
        const data = await res.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log("something went wrong1", error);}
    }

// POST example

const postResult = async ( url = '', data = {}) =>{
    //console.log(data)
    const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    });
    try{
        const newData = await res.json();
        console.log(newData);
        return newData
    } catch(error){
        console.log("something went wrong2", error);
    }
} 

// Update UI

const updateUI = async()=>{
    const request = await fetch('http://localhost:3000/all')
    try{
        const output = await request.json();
        //console.log(output)
        document.getElementById('date').innerHTML= 'Today is ' + output.date;
        document.getElementById('temp').innerHTML= 'The outside temperature in Kelvin is ' + output.temp.toFixed(0);
        document.getElementById('content').innerHTML= 'and I am feeling ' + output.content;
        console.log(output)
    }catch(error){
        console.log("something went wrong3", error)
        // handle the error approriately
    }
}