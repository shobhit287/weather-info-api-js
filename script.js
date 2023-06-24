const temperature=document.querySelector(".weather1");
const city=document.querySelector(".weather2 p");
const date=document.querySelector(".weather2 span");
const emoji=document.querySelector(".weather3 img");
const condition=document.querySelector(".weather3 span");
const search=document.getElementById("input_c");
const btn=document.getElementById("search");







if(localStorage.getItem("temp_l")!="NULL" || localStorage.getItem("city_l")!="NULL" || localStorage.getItem("date_l")!="NULL" || localStorage.getItem("condition_l")!="NULL")
{
    temperature.innerText=localStorage.getItem("temp_l");
    city.innerText= localStorage.getItem("city_l");
    date.innerText=localStorage.getItem("date_l");
    emoji.src=localStorage.getItem("emoji_l");
    condition.innerText=localStorage.getItem("condition_l");
}

btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let name=search.value;
    fetchData(name);
});

const fetchData= async (name)=>{
    const url=`https://api.weatherapi.com/v1/current.json?key=f6039ad6a6014d199c1161844232106&q=${name}`;
    const response=await fetch(url);
    const data=await response.json();
    updateDom(data);
}

function updateDom(data){
    temperature.innerText=data.current.temp_c+"°";
    city.innerText=data.location.region;


    const split_time=data.current.last_updated.split(" ");
    date.innerText=split_time[1]+" "+split_time[0];



    emoji.src=data.current.condition.icon;
    condition.innerText=data.current.condition.text;

    localStorage.setItem("temp_l",data.current.temp_c+"°");
    localStorage.setItem("city_l",data.location.region);
    localStorage.setItem("date_l",split_time[1]+" "+split_time[0]);
    localStorage.setItem("emoji_l",data.current.condition.icon);
    localStorage.setItem("condition_l",data.current.condition.text);
}
