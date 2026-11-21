function resetRequestBloodForm() {
    document.getElementById("patientNameError").textContent = "";
    document.getElementById("patientAgeError").textContent = "";
    document.getElementById("patientBloodGroupError").textContent = "";
    document.getElementById("requiredBloodGroupError").textContent = "";
    document.getElementById("unitsError").textContent = "";
    document.getElementById("componentError").textContent = "";
    document.getElementById("hospitalNameError").textContent = "";
    document.getElementById("hospitalLocationError").textContent = "";
    document.getElementById("hospitalAddressError").textContent = "";
    document.getElementById("requiredDateError").textContent = "";
    document.getElementById("requiredTimeError").textContent = "";
    document.getElementById("urgencyError").textContent = "";
    document.getElementById("reasonError").textContent = "";
    document.getElementById("contactNameError").textContent = "";
    document.getElementById("relationshipError").textContent = "";
    document.getElementById("contactPhoneError").textContent = "";
    document.getElementById("termsError").textContent = "";
    document.getElementById("requestSuccess").textContent = "";
    document.getElementById("requestError").textContent = "";
    document.getElementById("requestStatusBox").innerHTML = "";
}

function validateRequestBloodForm(event) {
    event.preventDefault();
    const patientNameInput = document.getElementById("patientName");
    const patientAgeInput = document.getElementById("patientAge");
    const patientBloodGroupInput = document.getElementById("patientBloodGroup");
    const requiredBloodGroupInput = document.getElementById("requiredBloodGroup");
    const unitsNeededInput = document.getElementById("unitsNeeded");
    const hospitalNameInput = document.getElementById("hospitalName");
    const hospitalLocationInput = document.getElementById("hospitalLocation");
    const hospitalAddressInput = document.getElementById("hospitalAddress");
    const requiredDateInput = document.getElementById("requiredDate");
    const requiredTimeInput = document.getElementById("requiredTime");
    const urgencyLevelInput = document.getElementById("urgencyLevel");
    const reasonInput = document.getElementById("reason");
    const contactNameInput = document.getElementById("contactName");
    const relationshipInput = document.getElementById("relationship");
    const contactPhoneInput = document.getElementById("contactPhone");
    const termsInput = document.getElementById("terms");
    const patientNameError = document.getElementById("patientNameError");
    const patientAgeError = document.getElementById("patientAgeError");
    const patientBloodGroupError = document.getElementById("patientBloodGroupError");
    const requiredBloodGroupError = document.getElementById("requiredBloodGroupError");
    const unitsError = document.getElementById("unitsError");
    const componentError = document.getElementById("componentError");
    const hospitalNameError = document.getElementById("hospitalNameError");
    const hospitalLocationError = document.getElementById("hospitalLocationError");
    const hospitalAddressError = document.getElementById("hospitalAddressError");
    const requiredDateError = document.getElementById("requiredDateError");
    const requiredTimeError = document.getElementById("requiredTimeError");
    const urgencyError = document.getElementById("urgencyError");
    const reasonError = document.getElementById("reasonError");
    const contactNameError = document.getElementById("contactNameError");
    const relationshipError = document.getElementById("relationshipError");
    const contactPhoneError = document.getElementById("contactPhoneError");
    const termsError = document.getElementById("termsError");
    const requestSuccess = document.getElementById("requestSuccess");
    const requestError = document.getElementById("requestError");
    const requestStatusBox = document.getElementById("requestStatusBox");
    patientNameError.textContent = "";
    patientAgeError.textContent = "";
    patientBloodGroupError.textContent = "";
    requiredBloodGroupError.textContent = "";
    unitsError.textContent = "";
    componentError.textContent = "";
    hospitalNameError.textContent = "";
    hospitalLocationError.textContent = "";
    hospitalAddressError.textContent = "";
    requiredDateError.textContent = "";
    requiredTimeError.textContent = "";
    urgencyError.textContent = "";
    reasonError.textContent = "";
    contactNameError.textContent = "";
    relationshipError.textContent = "";
    contactPhoneError.textContent = "";
    termsError.textContent = "";
    requestSuccess.textContent = "";
    requestError.textContent = "";
    requestStatusBox.innerHTML = "";
    let isValid = true;
    if (patientNameInput.value.trim() === "") {
        patientNameError.textContent = "Patient Name must not be empty.";
        patientNameError.style.color = "red";
        isValid = false;
    }
    const ageValue = parseInt(patientAgeInput.value, 10);
    if (isNaN(ageValue) || ageValue < 1 || ageValue > 120) {
        patientAgeError.textContent = "Patient Age must be between 1 and 120.";
        patientAgeError.style.color = "red";
        isValid = false;
    }
    if (patientBloodGroupInput.value === "") {
        patientBloodGroupError.textContent = "Please select Patient Blood Group.";
        patientBloodGroupError.style.color = "red";
        isValid = false;
    }
    if (requiredBloodGroupInput.value === "") {
        requiredBloodGroupError.textContent = "Please select Required Blood Group.";
        requiredBloodGroupError.style.color = "red";
        isValid = false;
    }
    const unitsValue = parseInt(unitsNeededInput.value, 10);
    if (isNaN(unitsValue) || unitsValue < 1) {
        unitsError.textContent = "Units / Bags Needed must be at least 1.";
        unitsError.style.color = "red";
        isValid = false;
    }
    const selectedComponent = document.querySelector('input[name="bloodComponent"]:checked');
    if (!selectedComponent) {
        componentError.textContent = "Please select a Blood Component.";
        componentError.style.color = "red";
        isValid = false;
    }
    if (hospitalNameInput.value.trim() === "") {
        hospitalNameError.textContent = "Hospital Name must not be empty.";
        hospitalNameError.style.color = "red";
        isValid = false;
    }
    if (hospitalLocationInput.value.trim() === "") {
        hospitalLocationError.textContent = "Hospital Location / Area must not be empty.";
        hospitalLocationError.style.color = "red";
        isValid = false;
    }
    if (hospitalAddressInput.value.trim() === "") {
        hospitalAddressError.textContent = "Hospital Full Address must not be empty.";
        hospitalAddressError.style.color = "red";
        isValid = false;
    }
    if (requiredDateInput.value === "") {
        requiredDateError.textContent = "Required Date must not be empty.";
        requiredDateError.style.color = "red";
        isValid = false;
    }
    if (requiredTimeInput.value === "") {
        requiredTimeError.textContent = "Required Time must not be empty.";
        requiredTimeError.style.color = "red";
        isValid = false;
    }
    if (requiredDateInput.value !== "" && requiredTimeInput.value !== "") {
        const selectedDateTime = new Date(requiredDateInput.value + "T" + requiredTimeInput.value);
        const nowDateTime = new Date();
        if (selectedDateTime < nowDateTime) {
            requiredDateError.textContent = "Required Date and Time cannot be in the past.";
            requiredDateError.style.color = "red";
            requiredTimeError.textContent = "Required Date and Time cannot be in the past.";
            requiredTimeError.style.color = "red";
            isValid = false;
        }
    }
    if (urgencyLevelInput.value === "") {
        urgencyError.textContent = "Please select Urgency Level.";
        urgencyError.style.color = "red";
        isValid = false;
    }
    if (reasonInput.value === "") {
        reasonError.textContent = "Please select Reason / Disease.";
        reasonError.style.color = "red";
        isValid = false;
    }
    if (contactNameInput.value.trim() === "") {
        contactNameError.textContent = "Contact Person Name must not be empty.";
        contactNameError.style.color = "red";
        isValid = false;
    }
    if (relationshipInput.value.trim() === "") {
        relationshipError.textContent = "Relationship with Patient must not be empty.";
        relationshipError.style.color = "red";
        isValid = false;
    }
    if (contactPhoneInput.value.trim() === "" || contactPhoneInput.value.trim().length < 10) {
        contactPhoneError.textContent = "Please enter a valid Contact Phone Number.";
        contactPhoneError.style.color = "red";
        isValid = false;
    }
    if (!termsInput.checked) {
        termsError.textContent = "The terms checkbox must be ticked.";
        termsError.style.color = "red";
        isValid = false;
    }
    const selectedComponentsArray = [];
    if (selectedComponent) {
        selectedComponentsArray.push(selectedComponent.value);
    }
    console.log("Selected Blood Component Array:", selectedComponentsArray);
    if (isValid) {
        const requestStatus = "Pending";
        const emergencyBadge = urgencyLevelInput.value === "Emergency"
            ? '<div class="emergency-badge">Emergency Request</div>'
            : "";
        requestSuccess.textContent = "Blood request submitted successfully!";
        requestSuccess.style.color = "green";
        requestStatusBox.innerHTML =
            "<p><strong>Request Status:</strong> " + requestStatus + "</p>" +
            "<p><strong>Urgency Level:</strong> " + urgencyLevelInput.value + "</p>" +
            emergencyBadge;
        alert("Blood request submitted successfully! Status: " + requestStatus);
    } else {
        requestError.textContent = "Please fix the errors above before submitting.";
        requestError.style.color = "red";
    }
    return isValid;
}