let currentStep = 0;
const formState = {};
showStep(currentStep);

function showStep(n) {
  const steps = document.querySelectorAll(".step");
  steps.forEach((step, index) => {
    step.classList.remove("active");
    if (index === n) step.classList.add("active");
  });

  document.getElementById("prevBtn").style.display = n === 0 ? "none" : "inline-block";
  document.getElementById("nextBtn").style.display = n === steps.length - 1 ? "none" : "inline-block";
  document.getElementById("submitBtn").style.display = n === steps.length - 1 ? "inline-block" : "none";
}

function nextPrev(n) {
  const steps = document.querySelectorAll(".step");
  if (n === 1 && !validateForm()) return;
  saveStepData(currentStep);
  currentStep += n;
  if (currentStep >= steps.length) return;
  showStep(currentStep);
}

function validateForm() {
  const currentFields = document.querySelectorAll(".step.active input[required], .step.active select[required]");
  for (let field of currentFields) {
    if (!field.value.trim()) {
      alert(`Please fill out: ${field.name}`);
      field.focus();
      return false;
    }
  }
  return true;
}

function saveStepData(stepIndex) {
  const step = document.querySelectorAll(".step")[stepIndex];
  const inputs = step.querySelectorAll("input, select");
  const stepData = {};
  inputs.forEach(input => {
    if (!input.name) return;
    if (input.type === "checkbox") {
      stepData[input.name] = input.checked;
      formState[input.name] = input.checked;
    } 
    else if (input.type === "radio") {
      if (input.checked) {
        stepData[input.name] = input.value;
        formState[input.name] = input.value;
      }
    } 
    else if (input.name.endsWith("[]")) {
      const key = input.name.slice(0, -2);
      if (!formState[key]) formState[key] = [];
      formState[key].push(input.value);
      if (!stepData[key]) stepData[key] = [];
      stepData[key].push(input.value);
    } 
    else {
      stepData[input.name] = input.value;
      formState[input.name] = input.value;
    }
  });
  console.log(`Step ${stepIndex + 1} Data Saved:`, stepData);
}

document.getElementById("employeeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validateForm()) return;
  saveStepData(currentStep);
  console.log("Final Submitted Data:", formState);
  alert("Form submitted successfully!.");
});

function addEducation() {
  const container = document.getElementById("educationContainer");
  const div = document.createElement("div");
  div.className = "dynamic-row";
  div.innerHTML = `
    <input type="text" name="course[]" placeholder="Course" required>
    <input type="text" name="university[]" placeholder="University" required>
    <input type="text" name="year[]" placeholder="Year" required>
    <input type="text" name="percentage[]" placeholder="Percentage" required>
    <button type="button" onclick="this.parentElement.remove()">-</button>
  `;
  container.appendChild(div);
}

function addWork() {
  const container = document.getElementById("workContainer");
  const div = document.createElement("div");
  div.className = "dynamic-row";
  div.innerHTML = `
    <input type="text" name="company[]" placeholder="Company" required>
    <input type="text" name="jobTitle[]" placeholder="Job Title" required>
    <input type="text" name="workFrom[]" placeholder="From" required>
    <input type="text" name="workTo[]" placeholder="To" required>
    <button type="button" onclick="this.parentElement.remove()">-</button>
  `;
  container.appendChild(div);
}

function addReference() {
  const container = document.getElementById("referenceContainer");
  const div = document.createElement("div");
  div.className = "dynamic-row";
  div.innerHTML = `
    <input type="text" name="refName[]" placeholder="Reference Name" required>
    <input type="text" name="refPhone[]" placeholder="Phone" required>
    <input type="text" name="refRelation[]" placeholder="Relation" required>
    <button type="button" onclick="this.parentElement.remove()">-</button>
  `;
  container.appendChild(div);
}