document.addEventListener("DOMContentLoaded", function () {
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = "0%";
});
function nextStep(step) {
  // Add validation logic for the current step
  const personal = document.getElementById("personal");
  const payment = document.getElementById("payment");
  const progressWidth = (step / 3) * 100;

  if (step === 1) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const nameInput = document.querySelector("input[name=name]");
    const emailInput = document.querySelector("input[name=email]");
    const phoneInput = document.querySelector("input[name=phone]");
    const addressInput = document.querySelector("input[name=address]");

    if (name === "") {
      nameInput.classList.add("is-invalid");
      return;
    } else {
      nameInput.classList.remove("is-invalid");
    }

    if (!validateEmailFormat(email)) {
      emailInput.classList.add("is-invalid");
      return;
    } else {
      emailInput.classList.remove("is-invalid");
    }

    if (phone === "") {
      phoneInput.classList.add("is-invalid");
      return;
    } else {
      phoneInput.classList.remove("is-invalid");
    }

    if (address === "") {
      addressInput.classList.add("is-invalid");
      return;
    } else {
      addressInput.classList.remove("is-invalid");
    }

    personal.classList.add("active");
  }

  if (step === 2) {
    const image = document.getElementById("image");
    if (!validateImageFile(image)) {
      image.classList.add("is-invalid");
      return;
    }
    payment.classList.add("active");
  }

  if (step === 3) {
    const checkbox = document.getElementById("termsConditionCheck");

    if (!checkbox.checked) {
      checkbox.classList.add("is-invalid");
      return;
    } else {
      checkbox.classList.remove("is-invalid");
    }
    submitForm();
  }

  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = `${progressWidth}%`;

  document.getElementById(`step-${step}`).style.display = "none";
  if (step !== 3) {
    document.getElementById(`step-${step + 1}`).style.display = "block";
  }
}

function prevStep(step) {
  const progressWidth = ((step - 1) / 3) * 100;

  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = `${progressWidth}%`;

  if (step === 2) {
    personal.classList.remove("active");
  }

  if (step === 3) {
    payment.classList.remove("active");
  }

  document.getElementById(`step-${step}`).style.display = "none";
  document.getElementById(`step-${step - 1}`).style.display = "block";
}

// submit form
function submitForm() {
  document.getElementById(`msform`).style.display = "none";
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const image = document.getElementById("image").files[0];
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;

  // Validate that the checkbox is checked in the last step
  const checkbox = document.getElementById("termsConditionCheck");
  if (!checkbox.checked) {
    checkbox.classList.add("is-invalid");
    return;
  } else {
    checkbox.classList.remove("is-invalid");
  }

  // Display user data in the result div
  document.getElementById("heading").textContent = "General Information";
  document.getElementById("paragraph").textContent =
    "Please Check your details";
  document.getElementById("result-name").textContent = name;
  document.getElementById("result-fname").textContent = name;
  document.getElementById("result-email").textContent = email;
  document.getElementById("result-phone").textContent = phone;
  document.getElementById("result-address").textContent = address;

  // Preview the uploaded image
  const imageDisplay = document.getElementById("result-image");
  const reader = new FileReader();

  reader.onload = function (e) {
    imageDisplay.src = e.target.result;
  };

  reader.readAsDataURL(image);

  // Show the result div
  document.getElementById("result").style.display = "block";
}

//with onChange
function validateName(input) {
  const name = input.value;
  const nameInput = document.querySelector("input[name=name]");
  if (name === "") {
    nameInput.classList.add("is-invalid");
  } else {
    nameInput.classList.remove("is-invalid");
  }
}

function validateEmail(input) {
  const email = input.value;
  const emailInput = document.querySelector("input[name=email]");
  if (!validateEmailFormat(email)) {
    emailInput.classList.add("is-invalid");
  } else {
    emailInput.classList.remove("is-invalid");
  }
}

function validatePhone(input) {
  const phone = input.value;
  const phoneInput = document.querySelector("input[name=phone]");
  if (phone === "") {
    phoneInput.classList.add("is-invalid");
  } else {
    phoneInput.classList.remove("is-invalid");
  }
}

function validateAddress(input) {
  const address = input.value;
  const addressInput = document.querySelector("input[name=address]");
  if (address === "") {
    addressInput.classList.add("is-invalid");
  } else {
    addressInput.classList.remove("is-invalid");
  }
}

function validateImageInput(input) {
  if (!validateImageFile(input)) {
    input.classList.add("is-invalid");
  } else {
    input.classList.remove("is-invalid");
  }
}

// validation regex and logics
function validateTermsCondition(input) {
  if (!input.checked) {
    input.classList.add("is-invalid");
  } else {
    input.classList.remove("is-invalid");
  }
}

function validateEmailFormat(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateImageFile(input) {
  const file = input.files[0];
  if (file) {
    const validExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const validSize = file.size / 1024 / 1024 < 5; // 5MB limit

    return validExtensions.includes(fileExtension) && validSize;
  }
  return false;
}
