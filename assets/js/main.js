let users = [];

const create = (event) => {
  event.preventDefault();
  const user = readForm();

  if (user) {
    createRowTable(user);
    clearForm();
    saveDataLocalStorage(user);
  }
};

const addButton = document.getElementById("add");
addButton.addEventListener("click", create);

const readForm = () => {
  const nameInput = document.getElementById("name");
  const lastnameInput = document.getElementById("lastname");
  const genderInput = document.getElementById("gender");
  const descInput = document.getElementById("description");

  const user = {
    name: nameInput.value,
    lastname: lastnameInput.value,
    gender: genderInput.value,
    desc: descInput.value,
  };

  const { name, lastname, gender, desc } = user;

  if (
    name.trim() == "" ||
    lastname.trim() == "" ||
    gender.trim() == "" ||
    desc.trim() == ""
  ) {
    return alert("Existe un campo vacio");
  }

  users.push(user);

  return user;
};

const clearForm = () => {
  const form = document.getElementById("form");
  form.reset();
};

const createRow = (user) => {
  const tbody = document.getElementById("tbody");

  tbody.innerHTML += `
          <tr>
              <td>${user.name}</td>
              <td>${user.lastname}</td>
              <td>${user.gender}</td>
              <td>${user.desc}</td>
             
              <td>
                  <button class="edit btn btn-outline-warning btn-sm" onclick="editar()">Editar</button>
                  <button class="delete btn btn-outline-danger btn-sm">Eliminar</button>
              </td>
          </tr>
      `;
};

const saveDataLocalStorage = (user) => {
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

const readFromLocalStorage = () => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach(user => { 
    createRow(user);
    
  });
  console.log(users);
};

readFromLocalStorage();
