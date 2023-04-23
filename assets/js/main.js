let users = JSON.parse(localStorage.getItem("users")) || [];

const create = (event) => {
  if (event) {
    event.preventDefault();
  }

  const user = readAndSaveForm();

  if (user) {
    createRowTable(user);
    saveUsersDataLocalStorage();
    clearForm();
  }
};

const addButton = document.getElementById("add");
addButton.addEventListener("click", create);

const readAndSaveForm = () => {
  const nameInput = document.getElementById("name");
  const lastnameInput = document.getElementById("lastname");
  const genderInput = document.getElementById("gender");
  const descInput = document.getElementById("description");

  const user = {
    id: Date.now(),
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

const createRowTable = (user) => {
  const tbody = document.getElementById("tbody");

  tbody.innerHTML += `
        <tr id="tr${user.id}">
              <td>${user.id}</td>
              <td>${user.name}</td>
              <td>${user.lastname}</td>
              <td>${user.gender}</td>
              <td>${user.desc}</td>
             
              <td>
                  <button class="edit btn btn-outline-warning btn-sm" onclick="editRowTable('${user.id}')">Editar</button>
                  <button class="delete btn btn-outline-danger btn-sm" onclick="deleteRowTable('${user.id}')">Eliminar</button>
              </td>
        </tr>
      `;
};

const saveUsersDataLocalStorage = () => {
  localStorage.setItem("users", JSON.stringify(users));
};

const readFromLocalStorage = () => {
  users.forEach((user) => {
    createRowTable(user);
  });
};

const deleteRowTable = (idUser) => {
  const positionUser = users.findIndex((user) => user.id == idUser);
  users.splice(positionUser, 1);

  saveUsersDataLocalStorage();

  const idRowDelete = `tr${idUser}`;

  const trTable = document.getElementById(idRowDelete);
  trTable.remove();
};

const editRowTable = (idUser) => {
  const idRowTable = `tr${idUser}`;

  const tr = document.getElementById(idRowTable);

  const childrens = Array.from(tr.children); // obtenemos los hijos del tr

  const arrayValuesInputs = [];

  childrens.forEach((children) => {
    const value = children.innerHTML;

    arrayValuesInputs.push(value);
  });

  const nameInput = document.getElementById("name");
  nameInput.value = arrayValuesInputs[1];

  const lastnameInput = document.getElementById("lastname");
  lastnameInput.value = arrayValuesInputs[2];

  const genderInput = document.getElementById("gender");
  genderInput.value = arrayValuesInputs[3];

  const descInput = document.getElementById("description");
  descInput.value = arrayValuesInputs[4];

  const btnAdd = document.getElementById("add");

  if (btnAdd) {
    btnAdd.remove();
  }

  const btnUpdate = document.createElement("button");
  btnUpdate.id = "btn-uddate";
  btnUpdate.name = idUser;
  btnUpdate.classList.add("btn");
  btnUpdate.classList.add("btn-outline-warning");
  btnUpdate.classList.add("btn-sm");
  btnUpdate.innerHTML = "Editar";
  btnUpdate.addEventListener("click", update);

  const contentBtn = document.getElementById("content-btn");

  if (contentBtn.children.length == 0) {
    contentBtn.appendChild(btnUpdate);
  }

  if (contentBtn.children.length > 0) {
    btnUpdate.name = idUser;
  }
};

update = () => {
  const btnUpdate = document.getElementById("btn-uddate");

  create();
  deleteRowTable(btnUpdate.name);

  const btnAdd = document.createElement("button");
  btnAdd.id = "add";
  btnAdd.classList.add("btn");
  btnAdd.classList.add("btn-outline-success");
  btnAdd.classList.add("btn-sm");
  btnAdd.innerHTML = "Agregar";
  btnAdd.addEventListener("click", create);

  const contentBtn = document.getElementById("content-btn");

  contentBtn.appendChild(btnAdd);

  btnUpdate.remove();
};

readFromLocalStorage();
