// set up the veraibles

let inputText = document.querySelector(".add-task input");
let ButtonAddTask = document.querySelector(".add-task .plus");
let taskContainer = document.querySelector(".task-content");
let taskCount = document.querySelector(".task-count span");
let taskCompleted = document.querySelector(".task-completed span");

// focus on input filed 

window.onload = function(){
    inputText.focus();
}

// adding new task
ButtonAddTask.onclick = function (){
    // check if the input is empty
  if(isPresent()){
    swal("Already exist!");
    inputText.value = "";
    
  }else{
    addNewTask();
  }
}



function addNewTask(){
    if(inputText.value === ""){
        swal("Please add task!");
    }else {
        let noTaskMessage = document.querySelector(".no-tasks-message");

        if(document.body.contains(document.querySelector(".no-tasks-message"))){
            // remove no task message
        noTaskMessage.remove();
        }
        

        //Create main span element 
        let mainSpan = document.createElement("span");

        // create delete span element 

        let deleteElement = document.createElement("span");

        // create text in mainSpan 

        let newTask = document.createTextNode(inputText.value);

        //create text in delete button

        let deleteButton = document.createTextNode("Delete");

        // connect newTask with its parent
        mainSpan.appendChild(newTask);

        // add class name for main span 
        mainSpan.className = "task-box";

        // connect deleteButton with its parent

        deleteElement.appendChild(deleteButton);

        // add class name to delete Element
        deleteElement.className = "delete";

        // connect delete element to main span 

        mainSpan.appendChild(deleteElement);

        // connect main span with its parent which is taskContainer

        taskContainer.appendChild(mainSpan);

        storage();

        // make input empty once add task 
        inputText.value = "";
       
      // focus in filed 
      inputText.focus();

      calculatesTasks();
      


     
    }
}

// this function check if the task is exist before 


function isPresent(){
    let containerTasks = document.querySelectorAll(".task-box");
      
    var isPresent= false;
    for(i=0; i < containerTasks.length; i++) {
      if (containerTasks[i].childNodes[0].textContent == inputText.value){
         isPresent= true;
      }
  }
  return isPresent;
}


// add function that delete task and put line through in task 

document.addEventListener("click", function (e){

    // remove task by delete button 

    if(e.target.className == "delete"){
        e.target.parentNode.remove();

        if(taskContainer.childElementCount == 0){
            createNoMsg();
        }
    }

    if(e.target.classList.contains("task-box")){
        e.target.classList.toggle("finished");
    }

    calculatesTasks();

})


let deleteAllTask = document.createElement("Span");
let buttomDelete = document.createTextNode("Delete All Tasks");

deleteAllTask.appendChild(buttomDelete);
deleteAllTask.className = "Delete-Tasks";

document.querySelector(".task-stats").appendChild(deleteAllTask);


let removeAllTasks = document.querySelector(".Delete-Tasks");


removeAllTasks.onclick = function (){

    removeAllChildNodes(taskContainer);
    createNoMsg();
            
    }
    

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }


    
    let finishAllTask = document.createElement("Span");
    let buttomFinish = document.createTextNode("Finished");
    finishAllTask.className ="finished-through";
    finishAllTask.appendChild(buttomFinish);
    document.querySelector(".task-stats").appendChild(finishAllTask);

    let finishedLineThrough = document.querySelector(".finished-through");


    finishedLineThrough.onclick = function (){
        let containerTasks = document.querySelectorAll(".task-box");

        for(i=0; i < containerTasks.length; i++) {
            if (containerTasks[i].classList.contains("task-box")){
                containerTasks[i].classList.toggle("finished");
            }
    }

    
}
    


// create function no task message 

function createNoMsg(){

    let messageSpan = document.createElement("span");
    let addTextMessage = document.createTextNode("No tasks To show");
    messageSpan.appendChild(addTextMessage);
    messageSpan.className = "no-tasks-message";
    taskContainer.appendChild(messageSpan);

}


// function to calculate all tasks

function calculatesTasks(){

    taskCount.innerHTML = document.querySelectorAll(".task-box").length;
    taskCompleted.innerHTML = document.querySelectorAll(".finished").length;
}


function storage(){
    let task = inputText.value;
    localStorage.setItem("name", task);
    console.log(localStorage.getItem("name"));
}