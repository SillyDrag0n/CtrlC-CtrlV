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
      updateToDoListOnScreen();
    })

    checkboxElement.addEventListener("change", event => {
      this.#erledigt = !this.#erledigt;
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

let todos = [
  new ToDo("Zugticket kaufen", false),
  new ToDo("Wäsche waschen", true),
  new ToDo("Hausaufgaben machen", true),
];

function updateToDoListOnScreen() {
  const todoListElement = document.getElementById("todolist");

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
}

document.addEventListener("DOMContentLoaded", (event) => {
  updateToDoListOnScreen();
  let todoInput = document.getElementById("neuesToDo");
  let deleteChecked = document.getElementById("aufraeumen");

  todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && todoInput.value != "") {
      const newElement = new ToDo(todoInput.value, false);
      todos.push(newElement);
      todoInput.value = "";
      updateToDoListOnScreen();
    }
  });

  deleteChecked.addEventListener("click", (event) => {
    todos = todos.filter((todo) => !todo.erledigt);
    updateToDoListOnScreen();
  })
});

