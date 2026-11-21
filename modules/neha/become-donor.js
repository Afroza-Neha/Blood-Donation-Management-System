function resetBecomeDonorForm() {
    document.getElementById("fullNameError").textContent = "";
    document.getElementById("genderError").textContent = "";
    document.getElementById("dobError").textContent = "";
    document.getElementById("bloodGroupError").textContent = "";
    document.getElementById("weightError").textContent = "";
    document.getElementById("phoneError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("districtError").textContent = "";
    document.getElementById("locationError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmPasswordError").textContent = "";
    document.getElementById("termsError").textContent = "";
    document.getElementById("regSuccess").textContent = "";
    document.getElementById("regError").textContent = "";
}

function validateBecomeDonorForm(event) {
    event.preventDefault();
    const fullNameInput = document.getElementById("fullName");
    const dobInput = document.getElementById("dob");
    const bloodGroupInput = document.getElementById("bloodGroup");
    const weightInput = document.getElementById("weight");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const districtInput = document.getElementById("district");
    const locationInput = document.getElementById("location");
    const addressInput = document.getElementById("address");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const termsInput = document.getElementById("terms");
    const fullNameError = document.getElementById("fullNameError");
    const genderError = document.getElementById("genderError");
    const dobError = document.getElementById("dobError");
    const bloodGroupError = document.getElementById("bloodGroupError");
    const weightError = document.getElementById("weightError");
    const phoneError = document.getElementById("phoneError");
    const emailError = document.getElementById("emailError");
    const districtError = document.getElementById("districtError");
    const locationError = document.getElementById("locationError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const termsError = document.getElementById("termsError");
    const regSuccess = document.getElementById("regSuccess");
    const regError = document.getElementById("regError");
    fullNameError.textContent = "";
    genderError.textContent = "";
    dobError.textContent = "";
    bloodGroupError.textContent = "";
    weightError.textContent = "";
    phoneError.textContent = "";
    emailError.textContent = "";
    districtError.textContent = "";
    locationError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    termsError.textContent = "";
    regSuccess.textContent = "";
    regError.textContent = "";
    let isValid = true;
    if (fullNameInput.value.trim() === "") {
        fullNameError.textContent = "Full Name must not be empty.";
        fullNameError.style.color = "red";
        isValid = false;
    }
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    if (!selectedGender) {
        genderError.textContent = "Please select a gender.";
        genderError.style.color = "red";
        isValid = false;
    }
    if (dobInput.value === "") {
        dobError.textContent = "Date of Birth must not be empty.";
        dobError.style.color = "red";
        isValid = false;
    } else {
        const birthDate = new Date(dobInput.value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (isNaN(age) || age < 18 || age > 120) {
            dobError.textContent = "Donor age must be between 18 and 60 years.";
            dobError.style.color = "red";
            isValid = false;
        }
    }
    if (bloodGroupInput.value === "") {
        bloodGroupError.textContent = "Please select a blood group.";
        bloodGroupError.style.color = "red";
        isValid = false;
    }
    const weightValue = parseFloat(weightInput.value);
    if (isNaN(weightValue) || weightValue < 50) {
        weightError.textContent = "Weight must be at least 50 kg.";
        weightError.style.color = "red";
        isValid = false;
    }
    if (phoneInput.value.trim() === "" || phoneInput.value.trim().length < 10) {
        phoneError.textContent = "Please enter a valid phone number.";
        phoneError.style.color = "red";
        isValid = false;
    }
    if (emailInput.value.trim() === "" || !emailInput.value.includes("@")) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.color = "red";
        isValid = false;
    }
    if (districtInput.value.trim() === "") {
        districtError.textContent = "District / City must not be empty.";
        districtError.style.color = "red";
        isValid = false;
    }
    if (locationInput.value.trim() === "") {
        locationError.textContent = "Location / Area must not be empty.";
        locationError.style.color = "red";
        isValid = false;
    }
    if (passwordInput.value === "" || passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordError.textContent = "Password and Confirm Password must match.";
        confirmPasswordError.style.color = "red";
        isValid = false;
    }
    if (!termsInput.checked) {
        termsError.textContent = "The terms checkbox must be ticked.";
        termsError.style.color = "red";
        isValid = false;
    }
    const selectedGenderArray = [];
    if (selectedGender) {
        selectedGenderArray.push(selectedGender.value);
    }
    console.log("Selected Gender Array:", selectedGenderArray);
    if (isValid) {
        regSuccess.textContent = "Donor registration completed successfully!";
        regSuccess.style.color = "green";
        alert("Donor registered successfully!");
    } else {
        regError.textContent = "Please fix the errors above before submitting.";
        regError.style.color = "red";
    }
    return isValid;
}