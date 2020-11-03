window.addEventListener("scroll", (e) => {
  const navbar = document.getElementById("navbar");

  if (window.scrollY >= 100) {
    navbar.classList.add("sticky");
    navbar.classList.add("inset-0");
  } else if (window.scrollY <= 99) {
    if (navbar.classList.contains("sticky")) {
      navbar.classList.remove("sticky");
      navbar.classList.remove("inset-0");
    }
  }
});

window.addEventListener("click", (e) => {
  if (e.target.matches("#dropdown") || e.target.matches("#close-dropdown")) {
    const dropdown = document.getElementById("dropdown");
    const closeDropDown = document.getElementById("close-dropdown");
    const navmenu = document.getElementById("nav-menu");

    if (navmenu.classList.contains("hidden")) {
      navmenu.classList.remove("hidden");
      dropdown.classList.add("hidden");
      closeDropDown.classList.remove("hidden");
    } else {
      navmenu.classList.add("hidden");
      dropdown.classList.remove("hidden");
      closeDropDown.classList.add("hidden");
    }
  }

  if (e.target.href) {
    if (
      e.target.href.includes("main") ||
      e.target.href.includes("info") ||
      e.target.href.includes("whyus")
    ) {
      const dropdown = document.getElementById("dropdown");
      const closeDropDown = document.getElementById("close-dropdown");
      const navmenu = document.getElementById("nav-menu");

      navmenu.classList.add("hidden");
      dropdown.classList.remove("hidden");
      closeDropDown.classList.add("hidden");
    }
  }
});

const init = function () {
  if (document.forms.length === 0) return;

  document.getElementById("submit").addEventListener("click", submit);
};

const submit = function (e) {
  let contactNumber = document.getElementById("contactNumber").value;
  let vehicleReg = document.getElementById("vehicleReg").value;
  let postCode = document.getElementById("postCode").value;
  let mileage = document.getElementById("mileage").value;
  let starts = document.getElementById("starts").checked;
  let drives = document.getElementById("drives").checked;

  if (!contactNumber || !vehicleReg || !postCode || !mileage) return;

  console.log(starts, drives);

  starts = starts ? "The vehicle starts" : "The vehicle does not start";
  drives = drives ? "The vehicle is drivable" : "The vehicle is not drivable";

  console.log(starts, drives);

  let body = JSON.stringify({
    subject: "Quote",
    contactNumber,
    vehicleReg,
    postCode,
    mileage,
    starts,
    drives
  });

  e.preventDefault();
  e.stopPropagation();

  let status = document.getElementById("status");

  status.textContent = "Submitting, please stand by...";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body
  };

  fetch(`https://motorscrap.herokuapp.com/api/v1/mail/quote`, options)
    .then((res) => res.json() || res)
    .then((data) => {
      if (data.success) {
        status.textContent =
          "Submitted successfully. Thank you!";
        status.classList.add("text-green-500");
        document.getElementById(document.forms[0].id).reset();
        return;
      }

      status.textContent =
        "An error occurred while trying to submit. Try again later.";
      status.classList.add("text-red-500");
    })
    .catch(() => {
      status.textContent =
        "An error occurred while trying to submit. Try again later.";

      status.classList.add("text-red-500");
    });
};

document.addEventListener("DOMContentLoaded", init);
