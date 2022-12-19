
class ToDo {
  #titel = "";
  #erledigt = "";

  constructor(titel, erledigt) {
    this.#titel = titel;
    this.#erledigt = erledigt;
  }

  get titel() {
    return this.#titel;
  }

  set titel(titel) {
    this.#titel = titel;
  }

  get erledigt() {
    return this.#erledigt;
  }

  set erledigt(erledigt) {
    this.#erledigt = erledigt;
  }

  element() {
    const listElement = document.createElement("li");
    const divElement = document.createElement("div");
    const checkboxElement = document.createElement("input");
    const spanElement = document.createElement("span");
    const buttonElement = document.createElement("button");

    listElement.appendChild(divElement);

    divElement.appendChild(checkboxElement);
    divElement.appendChild(spanElement);
    divElement.appendChild(buttonElement);

    checkboxElement.setAttribute("type", "checkbox");

    buttonElement.className = "loeschen";
    buttonElement.addEventListener("click", event => {
      todos.splice(todos.indexOf(this), 1);
      uploadLocalStorage();
      updateToDoListOnScreen();
    })

    checkboxElement.addEventListener("change", event => {
      this.#erledigt = !this.#erledigt;
      uploadLocalStorage();
      updateToDoListOnScreen();
    })

    spanElement.innerText = this.#titel;
    buttonElement.innerText = "Löschen";

    if (this.#erledigt) {
      checkboxElement.setAttribute("checked", "checked");
      divElement.className = "erledigt";
    }

    return listElement;
  }
}

let todos = [] ;

function updateToDoListOnScreen() {
  if(localStorage.getItem("firstTime") == "false"){
    todos = [] ;
for(const todoIn of JSON.parse(localStorage.getItem("ToDo's"))){
todos.push(new ToDo(todoIn.titel,todoIn.erledigt ==true));
}

  }else{
    todos=[
      new ToDo("Migu Umarmen", false),
      new ToDo("Minecraft Server machen", false),
      new ToDo("Luca mit Last Christmas nerven", true),
    
    ];
  }


  let todoListElement = document.getElementById("todolist");

  // Liste leeren
  todoListElement.innerHTML = "";

  // ToDo's einfügen
    for (const todo of todos) {
      const toDoListEntry = todo.element();
      todoListElement.appendChild(toDoListEntry);
    }
  

  // offene ToDo's
  const offeneToDos = todos.filter((offen) => !offen.erledigt);
  const elementAnzahl = document.getElementById("anzahl");
  elementAnzahl.textContent = `${offeneToDos.length} ToDo's offen`;

  uploadLocalStorage();
  if(localStorage.getItem("firstTime") == "false"){
    console.log(localStorage.getItem("ToDo's"));
  }

}

document.addEventListener("DOMContentLoaded", (event) => {
  let todoInput = document.getElementById("neuesToDo");
  let deleteChecked = document.getElementById("aufraeumen");

  todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && todoInput.value != "") {
      const newElement = new ToDo(todoInput.value, false);
      todos.push(newElement);
      todoInput.value = "";
      uploadLocalStorage();
      updateToDoListOnScreen();
    }
  });

  deleteChecked.addEventListener("click", (event) => {
    todos = todos.filter((todo) => !todo.erledigt);
    uploadLocalStorage();
    updateToDoListOnScreen();
    
  })
        updateToDoListOnScreen();
});

function uploadLocalStorage() {
  localStorage.clear();
  localStorage.setItem("ToDo's", JSON.stringify(todos, ["titel", "erledigt"]));
  localStorage.setItem("firstTime","false");
  
}
