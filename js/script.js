var destinations = [
  { id: "giza", name: "Giza Pyramids & Sphinx", img: "./pic/pyramids.jpeg", prices: { egyptian: 60, arab: 400, foreign: 700 }, },
  { id: "philae", name: "Philae Temple", img: "./pic/Philae.jpeg", prices: { egyptian: 50, arab: 350, foreign: 600 }, },
  { id: "valley", name: "Valley of the Kings", img: "./pic/valley.jpeg", prices: { egyptian: 60, arab: 380, foreign: 650 }, },
  { id: "abusimbel", name: "Abu Simbel Temples", img: "./pic/Simbel.jpeg", prices: { egyptian: 30, arab: 200, foreign: 750 }, },
  { id: "karnak", name: "Karnak Temple", img: "./pic/karnak.jpeg", prices: { egyptian: 40, arab: 450, foreign: 600 }, },
  { id: "NMEC", name: "National Museum Of Egyptian Civilization", img: "./pic/NMEC.webp", prices: { egyptian: 90, arab: 450, foreign: 550 }, },
  { id: "GEM", name: "Grand Egyptian Museum", img: "./pic/GEM.jpeg", prices: { egyptian: 200, arab: 900, foreign: 1200 }, },
];
var activeId = "giza";

for (var i = 0; i < destinations.length; i++) {
  var btn = document.createElement("button");
  btn.textContent = destinations[i].name;
  btn.dataset.id = destinations[i].id;
  btn.className =destinations[i].id === activeId ? "destBtn active" : "destBtn";

  btn.onclick = function () {
    activeId = this.dataset.id;
    updatePage();
  };

  var container = document.getElementById("destTabs");
  container.appendChild(btn);
}

function updatePage() {
  var dest ;
  for (var i = 0; i < destinations.length; i++) {
    if (destinations[i].id === activeId) {
      dest = destinations[i];
    }
  }

  var allTabs = document.querySelectorAll(".destBtn");
  for (var i = 0; i < allTabs.length; i++) {
    allTabs[i].className =
      allTabs[i].dataset.id === activeId ? "destBtn active" : "destBtn";
  }

  var img = document.getElementById("destImg");
  img.style.opacity = "0";
  setTimeout(function () {
    img.src = dest.img;
    img.style.opacity = "1";
  }, 500);

  document.getElementById("captionTitle").textContent = dest.name;

  var nationality = document.getElementById("nationality").value;
  var adults = parseInt(document.getElementById("adults").value);
  var children = parseInt(document.getElementById("children").value);
  var adultPrice = dest.prices[nationality];
  var total = adultPrice * adults + adultPrice * 0.5 * children;

  document.getElementById("totalPrice").innerHTML = "EGP " + total ;
  document.getElementById("prinfo").innerHTML= adults + " Adults " +" - " + children +" Children ";
}

var today = new Date();
var year  = today.getFullYear();
var month = today.getMonth() + 1;
var day   = today.getDate();
if (month < 10) { month = "0" + month; }
if (day   < 10) { day   = "0" + day;   }
document.getElementById("Date").min = year + "-" + month + "-" + day;

function handleBook() {
  var name = document.getElementById("fullName");
  var email = document.getElementById("email");
  var date = document.getElementById("Date");

  if (name.value === "") {
    showError(name);
    return;
  }
  if (email.value.indexOf("@") === -1) {
    showError(email);
    return;
  }
  if (date.value === "") {
    showError(date);
    return;
  }

  var bookedM = document.getElementById("bookedM");
  bookedM.classList.add("show");
  setTimeout(function () {
    bookedM.classList.remove("show");
  }, 4000);
}

function showError(field) {
  field.style.borderColor = "#f7220a";
  field.focus();
  setTimeout(function () {
    field.style.borderColor = "";
  }, 2000);
}

updatePage();
