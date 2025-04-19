const form = document.getElementById("studentForm");
const table = document.querySelector("#studentTable tbody");
const fullTable = document.getElementById("studentTable");

let editIndex = null;

const password = document.getElementById("password");
const passError = document.getElementById("passError");

function validatePassword(pwd) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,10}$/;
  return regex.test(pwd);
}

password.addEventListener("input", function () {
  if (!validatePassword(password.value)) {
    passError.textContent = "Must have 1 capital, 1 small, 1 number, 1 special, 6–10 characters.";
  } else {
    passError.textContent = "";
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!validatePassword(password.value)) {
    passError.textContent = "Invalid password!";
    return;
  }

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.querySelector("input[name='gender']:checked").value;
  const course = document.getElementById("course").value;
  const email = document.getElementById("email").value;
  const pass = password.value;
  const maskedPass = "•".repeat(pass.length);

  if (editIndex === null) {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${name}</td>
      <td>${age}</td>
      <td>${course}</td>
      <td>${gender}</td>
      <td>${email}</td>
      <td>${maskedPass}</td>
      <td>
        <button class="btn-action edit-btn">Edit</button>
        <button class="btn-action delete-btn">Delete</button>
      </td>
    `;
    addRowEvents(row);
  } else {
    const row = table.rows[editIndex];
    row.cells[0].textContent = name;
    row.cells[1].textContent = age;
    row.cells[2].textContent = course;
    row.cells[3].textContent = gender;
    row.cells[4].textContent = email;
    row.cells[5].textContent = maskedPass;
    editIndex = null;
    document.getElementById("submitBtn").textContent = "Save";
  }

  fullTable.style.display = "table";
  form.reset();
  passError.textContent = "";
});

function addRowEvents(row) {
  const editBtn = row.querySelector(".edit-btn");
  const deleteBtn = row.querySelector(".delete-btn");

  editBtn.onclick = function () {
    editIndex = row.rowIndex - 1;
    const cells = row.cells;
    document.getElementById("name").value = cells[0].textContent;
    document.getElementById("age").value = cells[1].textContent;
    document.getElementById("course").value = cells[2].textContent;
    document.querySelector(`input[name='gender'][value="${cells[3].textContent}"]`).checked = true;
    document.getElementById("email").value = cells[4].textContent;
    password.value = "";
    document.getElementById("submitBtn").textContent = "Update";
  };

  deleteBtn.onclick = function () {
    table.deleteRow(row.rowIndex - 1);
    if (table.rows.length === 0) {
      fullTable.style.display = "none";
    }
  };
}