// open close event form
let closeForm=document.querySelector("#close-form");
let data=document.querySelector("#data");   
let showForm=document.querySelector("#show-form");
closeForm.onclick=function(){
    data.style.display="none";
}
showForm.onclick=function(){
    data.style.display="flex";
}

// target inputs
let date=document.querySelector("#date");
let title=document.querySelector("#title");
let venue=document.querySelector("#venue");
let time=document.querySelector("#time");
let submitForm=document.querySelector("#submit");
let wrapper=document.querySelector("#wrapper");

//get events from localstorage
function getLocalEvents(){
    let event;
    if(localStorage.getItem("event")==null){
        event=[];
    }
    else{
        event=JSON.parse(localStorage.getItem("event"));
        console.log("event is",event);
    }

    if(event.length!=0){
        wrapper.classList.add("wrapstyle");
        showForm.classList.add("bottom-form");
        showForm.classList.remove("middle-form");

    }else{
        wrapper.classList.remove("wrapstyle");
        showForm.classList.add("middle-form");
        showForm.classList.remove("bottom-form");


    }
    return event;
}

// validation
function validate(){
    let dateVal=date.value.trim();
    let titleVal=title.value.trim();
    let venueVal=venue.value.trim();
    let timeVal=time.value.trim();

    if(dateVal==""){
        alert("date can't be blank");
        return false;
    }
    if(titleVal==""){
        alert("title can't be blank");
        return false;
    }
    if(venueVal==""){
        alert("venue can't be blank");
        return false;
    }
    if(timeVal==""){
        alert("time can't be blank");
        return false;
    }
    return true;
}

//show events
function showEvents(){
    event=getLocalEvents();
    let x="";
    event.forEach((element,index) => {
        if(index%2==0){
            x+=`<div class="events"><div class="card"><div class="header"><small>${index+1}.</small><i class="fa-solid fa-xmark" onclick="deleteEvent(${index})"></i></div><div class="content"><small>${element.date}</small><h3>${element.title}</h3><p>${element.venue}<br>${element.time}</p></div></div></div>`;
        }
        else{
            x+=`<div class="events2"><div class="card"><div class="header"><small>${index+1}.</small><i class="fa-solid fa-xmark" onclick="deleteEvent(${index})"></i></div><div class="content"><small>${element.date}</small><h3>${element.title}</h3><p>${element.venue}<br>${element.time}</p></div></div></div>`;
        }
    });
    wrapper.innerHTML=x;
}

// add events
function addEvents(){
    if(validate()==true){
        let dateVal=date.value.trim();
        let titleVal=title.value.trim();
        let venueVal=venue.value.trim();
        let timeVal=time.value.trim();
        event=getLocalEvents();
        event.push({
            date:dateVal,
            title:titleVal,
            venue:venueVal,
            time:timeVal
        });
        localStorage.setItem("event",JSON.stringify(event));
        showEvents();
    }
}

function deleteEvent(index){
    event=getLocalEvents();
    event.splice(index,1);
    localStorage.setItem("event",JSON.stringify(event));
    showEvents();
}

showEvents();