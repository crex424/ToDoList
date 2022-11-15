// @ts-ignore: ignoring issue with js-datepicker lack of intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date()); // sets to today

class ToDoItem {
    title:string;
    dueDate:Date;
    isCompleted:boolean

}
/*
let item = new ToDoItem();
item.title = "Testing";
item.dueDate = new Date(2022, 11, 15);
item.isCompleted = false;
*/
window.onload = function(){
    let addItem = getById("add");
    addItem.onclick = tryAddItem;
}

function getById(id:string):HTMLElement {
    return document.getElementById(id);
}

function getInput(id: string):HTMLInputElement {
    return <HTMLInputElement>document.getElementById(id);
}

function createElement(tag) {
    return document.createElement(tag);
}
/**
 * If the user input is true, call getToDoItem 
 * then display it
 */
function tryAddItem() {
    if (isValid()) {
        let item = getToDoItem();
        displayToDoItem(item);
    }
}

/**
 * Check form data is valid
 */
function isValid():boolean {
    return true;
}
/**
 * Get all input off form and wrap in 
 * a ToDoItem object
 */
function getToDoItem():ToDoItem {
    let userItem = new ToDoItem();
    //Get title
    let titleInput = getInput("title");
    userItem.title = titleInput.value;

    // Get dueDate
    let dueDateInput = getInput("due-date");
    userItem.dueDate = new Date(dueDateInput.value);

    // Get isComplete
    let isCompleted = getInput("is-completed")
    userItem.isCompleted = isCompleted.checked;

    return userItem;
}
/**
 * Display given ToDoItem on the web page
 * @param item 
 */
function displayToDoItem(item:ToDoItem):void {
    // <h3>Unload laundry</h3>
    let itemText = createElement("h3");
    itemText.innerText = item.title;

    // ex. <p>November 29st 2022</p>
    let itemDate = createElement("p");
    itemDate.innerText = item.dueDate.toDateString();

    // creates a div to hold everything
    // <div class = "todo completed"></div> or <div class = "todo">
    let itemDiv = createElement("div");

    itemDiv.onclick = markAsComplete;

    itemDiv.classList.add("todo")
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }

    // Grabs itemDate and itemText and 
    // contains them in the itemDiv
    // <div class = "completed">
    //     <h3>Unload laundry</h3>
    //     <p>November 29st 2022</p>
    // </div>
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if (item.isCompleted) {
        let completedToDos = getById("complete-items");
        completedToDos.appendChild(itemDiv);
    }

    else {
        let incompleteToDos = getById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }


}

function markAsComplete() {
    let itemDiv = <HTMLElement>this;
    itemDiv.classList.add("completed");

    let completeItems = getById("complete-items");
    completeItems.appendChild(itemDiv);
}

// Task: Allow user to mark a ToDoItem as completed