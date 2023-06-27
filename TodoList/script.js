//varibales required to for adding features to html page
const inputBox=document.getElementById('input-box');
const listBlock=document.getElementById('list-block');

const taskCount=document.getElementById('count');

let count=0;

function addTask(){
    // to check if the input box is empty
    if(inputBox.value === ""){
        alert("The input field should not be blank");
    }
    else{

        // add the element typed inputbox into the list
        let li=document.createElement("li");
        li.innerHTML=inputBox.value;
        listBlock.appendChild(li);
        count++;
        taskCount.innerHTML=count;

        // to add a cross mark infront of the list item for deletion
        let span=document.createElement("span");
        span.innerHTML="\u00d7";
        li.appendChild(span);
    }
    //after each list item clear the input box
    inputBox.value="";
}

listBlock.addEventListener('click',function(e){
    // to check and uncheck the task in a list
    if(e.target.tagName=="LI"){
        e.target.classList.toggle("checked")
    }
    //to delete the task completely from the list
    else if(e.target.tagName=="SPAN"){
        e.target.parentElement.remove();
        count--;
        taskCount.innerHTML=count;
    }
},false);