//PreDefined Attributes

let BaseURL = "https://latest.currency-api.pages.dev/v1/currencies/inr.json";
const dropdowns = document.body.querySelectorAll("select");
const ExchangeBtn = document.body.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const info = document.body.querySelector("#info");
const swap = document.querySelector(".swapsymbol");

// PreDefined Info At The Load Time
window.addEventListener("load",async(evt)=>{
    const URL = `https://latest.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
   let fromCurrencyCode = fromCurr.value.toLowerCase();
   let toCurrencyCode   = toCurr.value.toLowerCase();
   let response = await fetch(URL);
   let data = await response.json();
   let ExchangeValue = data[fromCurrencyCode][toCurrencyCode];
   info.innerText = `1  ${fromCurr.value} = ${ExchangeValue} ${toCurr.value}`;
})

// Adding the Options into the Two DropDowns

for(select of dropdowns){
    for(currcode in countryList){
     let nwoption = document.createElement("option");
     nwoption.innerText=currcode;
     nwoption.value=currcode;
     select.append(nwoption);
    }
    // Adding EventListeners for Each DropDown for Updating Flags Accordingly
    select.addEventListener("change",(evt)=>{updateFlag(evt.target) });
    

}

// Update Flag Function 
const updateFlag= (element) =>{
    let currencyCode = element.value;
    let FlagCode = countryList[currencyCode];
    
    let newsrc = `https://flagsapi.com/${FlagCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;

}
// API Call Function 
async function ApiCall (){
    let amount = document.querySelector(".amount input");
   let amtVal = amount.value
   if(amtVal === "" || amtVal < 1){
    amtVal = 1;
    amount.value = "1";
   }

   const URL = `https://latest.currency-api.pages.dev/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
   let fromCurrencyCode = fromCurr.value.toLowerCase();
   let toCurrencyCode   = toCurr.value.toLowerCase();
   let response = await fetch(URL);
   let data = await response.json();
   let ExchangeValue = data[fromCurrencyCode][toCurrencyCode];
  
   let OutPut = amtVal*ExchangeValue;
  
   console.log(OutPut);
   info.innerText = `${amtVal}  ${fromCurr.value} = ${OutPut} ${toCurr.value}`;

}
// Swap Functionality 
 swap.addEventListener("click",async(evt)=>{

    const indx1 = document.body.getElementsByTagName("select")[0].selectedIndex;
    const valueOfDropdown1  = document.body.getElementsByTagName("select")[0][indx1].value;
    const indx2 = document.body.getElementsByTagName("select")[1].selectedIndex;
    const valueOfDropdown2  = document.body.getElementsByTagName("select")[1][indx2].value;
    const flagOfFirst = document.body.getElementsByTagName("img")[0].src;
    const flagOfSecond = document.body.getElementsByTagName("img")[1].src;

    // swapping dropdown Options
    document.body.getElementsByTagName("select")[0][indx1].innerText = valueOfDropdown2;
    document.body.getElementsByTagName("select")[0][indx1].value = valueOfDropdown2;
    document.body.getElementsByTagName("select")[1][indx2].innerText = valueOfDropdown1;
    document.body.getElementsByTagName("select")[1][indx2].value = valueOfDropdown1;
    // now changing the flags 
    document.body.getElementsByTagName("img")[0].src = flagOfSecond;
    document.body.getElementsByTagName("img")[1].src = flagOfFirst;

    await ApiCall();
 })
//   Final OutPut / ExchangeButton
ExchangeBtn.addEventListener("click",async(evt)=>{
   evt.preventDefault();
   await ApiCall();
})
