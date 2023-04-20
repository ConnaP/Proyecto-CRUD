let users = [];

const create = (event) => {
  event.preventDefault();
  const user = readform();

  if (user) {
    createRow(user);
    limpiarFormalurio();
    saveDataLS(user);
  }
};

const addButton = document.getElementById("add");
addButton.addEventListener("click", create);

const readform = () => {
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

  console.log(name);

  if (
    name.trim() == "" ||
    lastname.trim() == "" ||
    gender.trim() == "" ||
    desc.trim() == ""
  ) {
    users.push(user);
    return alert("Existe un campo vacio");
  }

  return user;
};

const limpiarFormalurio = () => {
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

const saveDataLS = (user) => {
  users.push(user);
  // JSON.stringify()
  localStorage.setItem("users", JSON.stringify(users));
};

const readFromLS = () => {
  //  const users = JSON.parse(localStorage.getItem('users'))
  //  tareas.forEach((el)=> createRow(el))

  // correcta
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach(user => { 
    createRow(user);
    
  });
  console.log(users);
};

readFromLS();
