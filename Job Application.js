window.onload = () => {
  localStorage.removeItem("employeeFormData");
  loadFormData();
};

function saveFormData() {
  const formData = new FormData(document.getElementById("employeeForm"));
  const data = {};
  formData.forEach((value, key) => {
    if (data[key]) {
      if (!Array.isArray(data[key])) data[key] = [data[key]];
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });
  console.log("Saved Data:", data);
  localStorage.setItem("employeeFormData", JSON.stringify(data));
}

function loadFormData() {
  const data = JSON.parse(localStorage.getItem("employeeFormData"));
  if (!data) return;
  console.log("Loaded Data:", data);
  const form = document.getElementById("employeeForm");
  for (const key in data) {
    const elements = form.elements[key];
    if (!elements) continue;

    if (Array.isArray(data[key])) {
      data[key].forEach((val, i) => {
        if (elements[i]) elements[i].value = val;
      });
    } else {
      if (elements.length && elements[0].type === "radio") {
        for (const el of elements) {
          if (el.value === data[key]) el.checked = true;
        }
      } else if (elements.type === "checkbox") {
        elements.checked = data[key];
      } else {
        elements.value = data[key];
      }
    }
  }
}

document.getElementById("employeeForm").addEventListener("input", saveFormData);
document.getElementById("employeeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const requiredFields = [
    "firstName", "lastName", "designation", "address1", "address2", "email", "phone", "city", "state", "gender","zipcode", "relationship", "dob", 
    "location", "notice", "expected", "current", "department"
  ];

  const form = document.getElementById("employeeForm");
  for (let field of requiredFields) {
    const element = form.elements[field];

    if (!element) continue;

    if (element.type === "radio" || element[0]?.type === "radio") {
      let checked = false;
      for (let radio of element) {
        if (radio.checked) checked = true;
      }
      if (!checked) {
        alert(`Please select a value for ${field}`);
        return;
      }
    } else if (!element.value.trim()) {
      alert(`Please fill out ${field}`);
      return;
    }
  }

  saveFormData();
  alert("Form submitted! Data saved.");
});

function addEducation() {
  const container = document.getElementById("educationContainer");
  const div = document.createElement("div");
  div.className = "dynamic-row";
  div.innerHTML = `
    <input type="text" name="course[]" placeholder="Course">
    <input type="text" name="university[]" placeholder="Board/University">
    <input type="text" name="year[]" placeholder="Passing Year">
    <input type="text" name="percentage[]" placeholder="Percentage">
    <button type="button" onclick="this.parentElement.remove()">-</button>
  `;
  container.appendChild(div);
  console.log("Added Education Row");
}

function addWork() {
  const container = document.getElementById("workContainer");
  const div = document.createElement("div");
  div.className = "dynamic-row";
  div.innerHTML = `
    <input type="text" name="company[]" placeholder="Company Name">
    <input type="text" name="designation[]" placeholder="Designation">
    <input type="text" name="from[]" placeholder="From">
    <input type="text" name="to[]" placeholder="To">
    <button type="button" onclick="this.parentElement.remove()">-</button>
  `;
  container.appendChild(div);
  console.log("Added Work Experience Row");
}

function addReference() {
  const container = document.getElementById("referenceContainer");
  const div = document.createElement("div");
  div.className = "dynamic-row";
  div.innerHTML = `
    <input type="text" name="refName[]" placeholder="Reference Name">
    <input type="text" name="refPhone[]" placeholder="Phone">
    <input type="text" name="refRelation[]" placeholder="Relation">
    <button type="button" onclick="this.parentElement.remove()">-</button>
  `;
  container.appendChild(div);
  console.log("Added Reference Row");
}