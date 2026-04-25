'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// EmailJS form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Disable button and show sending state
  formBtn.setAttribute("disabled", "");
  formBtn.querySelector("span").textContent = "Sending...";

  // Prepare template parameters
  const templateParams = {
    name: form.querySelector('[name="fullname"]').value,
    email: form.querySelector('[name="email"]').value,
    message: form.querySelector('[name="message"]').value
  };

  emailjs.send("service_fjekzvp", "template_elel6xy", templateParams)
    .then(function () {
      // Success
      formBtn.querySelector("span").textContent = "Message Sent!";
      formBtn.style.color = "#4CAF50";
      form.reset();

      // Reset button after 3 seconds
      setTimeout(function () {
        formBtn.querySelector("span").textContent = "Send Message";
        formBtn.style.color = "";
        formBtn.setAttribute("disabled", "");
      }, 3000);
    })
    .catch(function (error) {
      // Error
      console.error("EmailJS Error:", error);
      formBtn.querySelector("span").textContent = "Failed! Try again";
      formBtn.style.color = "#f44336";
      formBtn.removeAttribute("disabled");

      // Reset button after 3 seconds
      setTimeout(function () {
        formBtn.querySelector("span").textContent = "Send Message";
        formBtn.style.color = "";
      }, 3000);
    });
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}