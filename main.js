let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    if (editIndex === -1) {
      // If editIndex is -1, add new data
      acceptData();
    } else {
      // Otherwise, update existing data
      updateData(editIndex);
      editIndex = -1; // Reset editIndex after updating
    }
    form.reset(); // Reset the form after adding or editing
    const modal = bootstrap.Modal.getInstance(form);
    modal.hide(); // Hide the modal after adding or editing
  }
};

let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

let updateData = (index) => {
  data[index].text = textInput.value;
  data[index].date = dateInput.value;
  data[index].description = textarea.value;

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
      <span class="fw-bold">${x.text}</span>
      <span class="small text-secondary">${x.date}</span>
      <p>${x.description}</p>

      <span class="options">
        <i onClick= "editTask(${y})" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
        <i onClick ="deleteTask(${y})" class="fas fa-trash-alt"></i>
      </span>
    </div>
    `);
  });

  resetForm();
};

let deleteTask = (index) => {
  data.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTasks();
};

let editIndex = -1;

let editTask = (index) => {
  let selectedTask = data[index];

  textInput.value = selectedTask.text;
  dateInput.value = selectedTask.date;
  textarea.value = selectedTask.description;

  editIndex = index; // Store the index of the element being edited

  // Close the modal after loading data for editing
  const modal = bootstrap.Modal.getInstance(form);
  modal.hide();
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

form.addEventListener("hidden.bs.modal", () => {
  resetForm();
});

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();

// Función para eliminar todos los videojuegos
function deleteAllGames() {
  const tasksContainer = document.getElementById('tasks');
  tasksContainer.innerHTML = ''; // Eliminar todos los videojuegos del contenedor
  localStorage.clear();
}

// Manejador del botón para eliminar todos los videojuegos
const deleteAllBtn = document.getElementById('delete-all-btn');
deleteAllBtn.addEventListener('click', () => {
  deleteAllGames();
});
