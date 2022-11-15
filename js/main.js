var picker = datepicker("#due-date");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addItem = getById("add");
    addItem.onclick = tryAddItem;
};
function getById(id) {
    return document.getElementById(id);
}
function getInput(id) {
    return document.getElementById(id);
}
function createElement(tag) {
    return document.createElement(tag);
}
function tryAddItem() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
    }
}
function isValid() {
    return true;
}
function getToDoItem() {
    var userItem = new ToDoItem();
    var titleInput = getInput("title");
    userItem.title = titleInput.value;
    var dueDateInput = getInput("due-date");
    userItem.dueDate = new Date(dueDateInput.value);
    var isCompleted = getInput("is-completed");
    userItem.isCompleted = isCompleted.checked;
    return userItem;
}
function displayToDoItem(item) {
    var itemText = createElement("h3");
    itemText.innerText = item.title;
    var itemDate = createElement("p");
    itemDate.innerText = item.dueDate.toDateString();
    var itemDiv = createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("todo");
    if (item.isCompleted) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.isCompleted) {
        var completedToDos = getById("complete-items");
        completedToDos.appendChild(itemDiv);
    }
    else {
        var incompleteToDos = getById("incomplete-items");
        incompleteToDos.appendChild(itemDiv);
    }
}
function markAsComplete() {
    var itemDiv = this;
    itemDiv.classList.add("completed");
    var completeItems = getById("complete-items");
    completeItems.appendChild(itemDiv);
}
