
const dropdowns= document.querySelectorAll(".dropdown select");
const btn= document.querySelector("form button")
const fromCurr=document.querySelector(".from select")
const toCurr=document.querySelector(".to select")
const msg = document.querySelector(".msg");

window.addEventListener("load", ()=>{
    updateExchangerate()
})
for (let select of dropdowns){
    for (currCode in countryList){
    let newoption= document.createElement("option")
    newoption.innerText= currCode;
    newoption.value= currCode;
    if(select.name === "From" && currCode === "USD"){
        newoption.selected="selected";
    }
    if(select.name === "To" && currCode === "INR"){
        newoption.selected="selected";
    }
    
    select.append(newoption);
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
    }
}
const updateFlag = (element) => {
    let currCode = element.value;
    console.log(currCode)
    let countryCode= countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src=newsrc
}
const updateExchangerate=  async ()=>{
    let amount= document.querySelector(".amount input");
    let amtVal= amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal=1;
        amount.value=1;
    }

//console.log(fromCurr.value, toCurr.value)
const url=`https://open.er-api.com/v6/latest/${fromCurr.value}`;
let response= await fetch(url);

let result1= await response.json();



const result2=result1.rates[toCurr.value];

const finalresult= amtVal*result2; 

msg.innerText=`${amtVal} ${fromCurr.value} = ${finalresult} ${toCurr.value}`


}



btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount= document.querySelector(".amount input");
    let amtVal= amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal=1;
        amount.value=1;
    }

//console.log(fromCurr.value, toCurr.value)
const url=`https://open.er-api.com/v6/latest/${fromCurr.value}`;
let response= await fetch(url);

let result1= await response.json();


const result2=result1.rates[toCurr.value];

const finalresult= amtVal*result2; 

msg.innerText=`${amtVal} ${fromCurr.value} = ${finalresult} ${toCurr.value}`


})