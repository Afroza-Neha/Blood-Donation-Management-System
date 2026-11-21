function resetFindDonorForm() {
    document.getElementById("bloodGroupError").textContent = "";
    document.getElementById("districtError").textContent = "";
    document.getElementById("locationError").textContent = "";
    document.getElementById("availabilityError").textContent = "";
    document.getElementById("noDonorMessage").textContent = "";
    document.getElementById("donorCardsContainer").innerHTML = "";
}

function validateFindDonorForm(event) {
    event.preventDefault();
    const bloodGroupInput = document.getElementById("bloodGroupFilter");
    const districtInput = document.getElementById("districtFilter");
    const locationInput = document.getElementById("locationFilter");
    const availableNowInput = document.getElementById("availableNow");
    const bloodGroupError = document.getElementById("bloodGroupError");
    const districtError = document.getElementById("districtError");
    const locationError = document.getElementById("locationError");
    const availabilityError = document.getElementById("availabilityError");
    const noDonorMessage = document.getElementById("noDonorMessage");
    const donorCardsContainer = document.getElementById("donorCardsContainer");
    bloodGroupError.textContent = "";
    districtError.textContent = "";
    locationError.textContent = "";
    availabilityError.textContent = "";
    noDonorMessage.textContent = "";
    donorCardsContainer.innerHTML = "";
    let isValid = true;
    if (districtInput.value.trim() !== "" && districtInput.value.trim().length < 2) {
        districtError.textContent = "District / City must be at least 2 characters.";
        districtError.style.color = "red";
        isValid = false;
    }
    if (locationInput.value.trim() !== "" && locationInput.value.trim().length < 2) {
        locationError.textContent = "Location / Area must be at least 2 characters.";
        locationError.style.color = "red";
        isValid = false;
    }
    const donors = [
        {
            name: "Tariqul Islam",
            bloodGroup: "O+",
            district: "Dhaka",
            location: "Dhanmondi",
            available: true,
            lastDonation: "2026-06-15",
            phone: "01711000001"
        },
        {
            name: "Masudur Rahman",
            bloodGroup: "A+",
            district: "Dhaka",
            location: "Mirpur",
            available: true,
            lastDonation: "2026-05-20",
            phone: "01711000002"
        },
        {
            name: "Nadia Sultana",
            bloodGroup: "B+",
            district: "Chattogram",
            location: "Agrabad",
            available: false,
            lastDonation: "2026-09-10",
            phone: "01711000003"
        },
        {
            name: "Farhan Ahmed",
            bloodGroup: "AB+",
            district: "Sylhet",
            location: "Zindabazar",
            available: true,
            lastDonation: "2026-04-12",
            phone: "01711000004"
        },
        {
            name: "Rashedul Karim",
            bloodGroup: "O-",
            district: "Dhaka",
            location: "Uttara",
            available: true,
            lastDonation: "2026-07-01",
            phone: "01711000005"
        }
    ];
    const selectedBloodGroup = bloodGroupInput.value.trim();
    const enteredDistrict = districtInput.value.trim().toLowerCase();
    const enteredLocation = locationInput.value.trim().toLowerCase();
    const onlyAvailable = availableNowInput.checked;
    const matchedDonorsArray = [];
    donors.forEach((donor) => {
        const groupMatch = selectedBloodGroup === "" || donor.bloodGroup === selectedBloodGroup;
        const districtMatch = enteredDistrict === "" || donor.district.toLowerCase().includes(enteredDistrict);
        const locationMatch = enteredLocation === "" || donor.location.toLowerCase().includes(enteredLocation);
        const availableMatch = !onlyAvailable || donor.available === true;
        if (groupMatch && districtMatch && locationMatch && availableMatch) {
            matchedDonorsArray.push(donor);
        }
    });
    console.log("Matched Donors Array:", matchedDonorsArray);
    if (!isValid) {
        return false;
    }
    if (matchedDonorsArray.length === 0) {
        noDonorMessage.textContent = "No donor found matching your search criteria.";
        noDonorMessage.style.color = "red";
    } else {
        matchedDonorsArray.forEach((donor) => {
            const card = document.createElement("div");
            card.className = "donor-card";
            let badgeHtml = "<span>Currently Unavailable</span>";
            if (donor.available) {
                badgeHtml = '<span class="available-badge">Available Now</span>';
            }
            card.innerHTML =
                badgeHtml +
                "<p>Name: " + donor.name + "</p>" +
                "<p>Blood Group: " + donor.bloodGroup + "</p>" +
                "<p>District & Location: " + donor.district + " - " + donor.location + "</p>" +
                "<p>Last Donation: " + donor.lastDonation + "</p>" +
                "<p>Phone: " + donor.phone + "</p>";
            donorCardsContainer.appendChild(card);
        });
    }
    return isValid;
}