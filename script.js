//Results are based upon the data available as per the API

const FLAGURL = "https://flagsapi.com/BE/flat/64.png";

let dropdowns = document.querySelectorAll(".dropdown select");
let fromimg = document.querySelector("#from")
let toimg = document.querySelector("#to");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let btn = document.querySelector("button");
let msg = document.querySelector(".msg");
let amount = document.querySelector(".amount input");

for(let i of dropdowns){
  for(let currencyCode in countryList){
    let newoption = document.createElement("option");//create a new option
    newoption.value = currencyCode;//set the value of the option
    newoption.innerText = currencyCode;
    i.appendChild(newoption);//appending new child 

    //Initially Setting Values in dropdowns 
    if(currencyCode == "USD" && i.name == "from"){
    newoption.selected = "selected";
    }//Displays USD initially in the To section 

    else if(currencyCode == "INR" && i.name == "to"){
      newoption.selected = "selected";//Displays INR initially in the To section 
    }
  }
  i.addEventListener("change",() =>{
    updateFlag(i.value,i.name);
  })
};

//update the flag
const updateFlag = (currency,name)=>{
  let country = countryList[currency];
  let newsrc = `https://flagsapi.com/${country}/flat/64.png`;  

  if(name === "from"){
    fromimg.src = newsrc;
  }
  else if(name === "to"){ 
    toimg.src = newsrc; 
  }
  msg.innerText = "Getting Exchange Rate"

};

//updtae the rate
const getExchangeRate = async () => {
  let Fcurr = fromCurr.value.toLowerCase();
  let Tcurr = toCurr.value.toLowerCase();
  
  let baseurl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${Fcurr}.json`

  //getting api response 
  let response = await fetch(baseurl);
  //getting data after parsing
  let result = await response.json();
  console.log(result);

  let rates = result[Fcurr];
  console.log(rates)

  let exchangeRate= rates[Tcurr];
  
  //updating the message 
  msg.innerText = `${amount.value} ${fromCurr.value} EQUALS ${exchangeRate * amount.value} ${toCurr.value}`
  
};

//The function gets called when the page is loaded
window.addEventListener("load",() =>{
  getExchangeRate();
});


btn.addEventListener("click",(evt)=>{
  //Any button used inside the form is a submit button
  evt.preventDefault();//prevents the default behaviour of the button
  if(amount.value ===" " || amount.value <1){
    amount.value = "1";
  }
  getExchangeRate();
  
});