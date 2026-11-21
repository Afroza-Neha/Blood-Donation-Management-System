
function validateContact() {

    var name = document.forms["contactForm"]["fullname"].value;
    var email = document.forms["contactForm"]["email"].value;
    var subject = document.forms["contactForm"]["subject"].value;
    var message = document.forms["contactForm"]["message"].value;

    if (name == "") {
        alert("Please enter your name");
        return false;
    }

    if (email == "" || !email.includes("@")|| !email.includes(".") ) {
        alert("Please enter a valid email");
        return false;
    }

    if (subject == "") {
        alert("Please enter a subject");
        return false;
    }

    if (message == "") {
        alert("Please enter your message");
        return false;
    }

    alert("You Sent a messege successfuly!");
    return false;
}
