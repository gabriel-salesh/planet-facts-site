const elPlanetShowcase = document.querySelector("#showcase img")
const elPlanetName = document.getElementById("planet-name")
const elInfoDisplay = document.getElementById("info-display")
const sourceLink = document.getElementById("source-link")
const elRotation = document.getElementById("rotation")
const elRevolution = document.getElementById("revolution")
const elRadius = document.getElementById("radius")
const elTemperature = document.getElementById("temperature")

const mainNav = document.querySelector("#main-nav ul")
const mobileNav = document.querySelector("#mobile-nav ul")

const planetInfoNav = document.getElementsByClassName("planet-info-navigation")[0]
const mobilePlanetInfoNav = document.getElementsByClassName("mobile-planet-info-navigation")[0]

let planetName, activeBtn
planetName = "Mercury"
activeBtn = document.getElementsByClassName("btn-active")[0]

let planetsData;
let xhr = new XMLHttpRequest()
xhr.open("GET", "data.json", true)
xhr.send()
xhr.onload = function() {
  planetsData = JSON.parse(this.response)
  displayPlanetData(planetName);
}

mainNav.addEventListener("click", function(e) {
  let infoToDisplay
  planetName = e.target.firstChild.nodeValue
  infoToDisplay = activeBtn.lastChild.nodeValue.toLowerCase().trim()
  activeBtn.classList.value = `nav-btn btn-active ${planetName.toLowerCase()}`

  switch (infoToDisplay) {
    case "overview":
      displayOverview(planetName)
      break
    case "internal structure":
      displayInternalStructure(planetName)
      break
    case "surface geology":
      displayGeology(planetName)
      break
    default:
      displayOverview(planetName)
      break
  }

  displayPlanetData(planetName)
  updateMobileNavActiveBtn(activeBtn, planetName)
})


planetInfoNav.addEventListener("click", function(e) {
  e.preventDefault()
  if (e.target.nodeName != "UL") {
    let infoToDisplay = e.target.lastChild.nodeValue.toLowerCase().trim()
    switch (infoToDisplay) {
      case "overview":
        displayOverview(planetName)
        break
      case "internal structure":
        displayInternalStructure(planetName)
        break
      case "surface geology":
        displayGeology(planetName)
        break
      default:
        displayOverview(planetName)
        break
    }

    activeBtn.classList.value = "nav-btn"
    e.target.classList.value = `nav-btn btn-active ${planetName.toLowerCase()}`
    activeBtn = e.target
    updateMobileNavActiveBtn(activeBtn, planetName)
  }
})

mobilePlanetInfoNav.addEventListener("click", function(e) {
  e.preventDefault();
  let infoToDisplay = e.target.firstChild.nodeValue.toLowerCase().trim()
  switch (infoToDisplay) {
    case "overview":
      displayOverview(planetName)
      break;
    case "structure":
      displayInternalStructure(planetName)
      break;
    case "surface":
      displayGeology(planetName)
      break;
  }

  let children = mobilePlanetInfoNav.children
  for (let i = 0; i < children.length; i++) {
    if (children[i].firstChild.firstChild.nodeValue.toLowerCase() === infoToDisplay) {
      children[i].firstChild.classList.value = `mobile-planet-info-nav-active ${planetName.toLowerCase()}`;
    } else {
      children[i].firstChild.classList.value = "";
    }
  }

  let active = document.getElementsByClassName(`mobile-planet-info-nav-active ${planetName.toLowerCase()}`)[0];
  updateDesktopNavActiveBtn(active)
})

mobileNav.addEventListener("click", function(e) {
  e.preventDefault()
  let nodeName = e.target.nodeName;
  switch (nodeName) {
    case "SPAN":
      planetName = e.target.nextSibling.nodeValue.trim()
      break;
    case "A":
      planetName = e.target.innerText.trim()
      break;
    case "I":
      planetName = e.target.parentElement.innerText.trim()
      break;
    case "IMG":
      planetName = e.target.parentElement.parentElement.innerText.trim();
      break;
    case "LI":
      planetName = e.target.innerText.trim();
  }

  planetName = planetName.charAt(0).toUpperCase() + planetName.slice(1).toLowerCase()
  infoToDisplay = activeBtn.lastChild.nodeValue.toLowerCase().trim()

  let children = mobilePlanetInfoNav.children;
  for (let i = 0; i < children.length; i++) {
    switch (infoToDisplay) {
      case "overview":
        if (children[i].firstChild.firstChild.nodeValue.trim().toLowerCase() == "overview") {
          children[i].firstChild.classList.value = `mobile-planet-info-nav-active ${planetName.toLowerCase()}`
          displayPlanetData(planetName)
          displayOverview(planetName)
        }
        break;
      case "internal structure":
        if (children[i].firstChild.firstChild.nodeValue.trim().toLowerCase() == "structure") {
          children[i].firstChild.classList.value = `mobile-planet-info-nav-active ${planetName.toLowerCase()}`
          displayPlanetData(planetName)
          displayInternalStructure(planetName)
        }
        break;
      case "surface geology":
        if (children[i].firstChild.firstChild.nodeValue.trim().toLowerCase() == "surface") {
          children[i].firstChild.classList.value = `mobile-planet-info-nav-active ${planetName.toLowerCase()}`
          displayPlanetData(planetName)
          displayGeology(planetName)
        }
        break;
    }
  }
  
  activeBtn.classList.value = `nav-btn btn-active ${planetName.toLowerCase()}`
  mobileNav.parentElement.classList.toggle("show")
})

function displayOverview(planetName) {
  for (i = 0; i < planetsData.length; i++) {
    if (planetsData[i].name === planetName) {
      elPlanetShowcase.setAttribute("src", planetsData[i].images.planet)
      elPlanetName.firstChild.nodeValue = planetName;
      elInfoDisplay.firstChild.nodeValue = planetsData[i].overview.content
      sourceLink.setAttribute("href", planetsData[i].overview.source)
    }
  }
}

function displayInternalStructure(planetName) {
  for (i = 0; i < planetsData.length; i++) {
    if (planetsData[i].name === planetName) {
      elPlanetShowcase.setAttribute("src", planetsData[i].images.internal)
      elPlanetName.firstChild.nodeValue = planetName;
      elInfoDisplay.firstChild.nodeValue = planetsData[i].structure.content
      sourceLink.setAttribute("href", planetsData[i].structure.source)
    }
  }
}

function displayGeology(planetName) {
  for (i = 0; i < planetsData.length; i++) {
    if (planetsData[i].name === planetName) {
      elPlanetShowcase.setAttribute("src", planetsData[i].images.geology)
      elPlanetName.firstChild.nodeValue = planetName;
      elInfoDisplay.firstChild.nodeValue = planetsData[i].geology.content
      sourceLink.setAttribute("href", planetsData[i].geology.source)
    }
  }
}


function displayPlanetData(planetName) {
  for (i = 0; i < planetsData.length; i++) {
    if (planetsData[i].name === planetName) {
      elRotation.firstChild.nodeValue = planetsData[i].rotation
      elRevolution.firstChild.nodeValue = planetsData[i].revolution
      elRadius.firstChild.nodeValue = planetsData[i].radius
      elTemperature.firstChild.nodeValue = planetsData[i].temperature
    }
  }
}

function updateMobileNavActiveBtn(activeBtn, planetName) {
  let infoToDisplay = activeBtn.lastChild.nodeValue.toLowerCase().trim()

  switch (infoToDisplay) {
    case "overview":
      infoToDisplay = "overview"
      break;
    case "internal structure":
      infoToDisplay = "structure"
      break;
    case "surface geology":
      infoToDisplay = "surface"
      break;
  }

  let children = mobilePlanetInfoNav.children
  for (let i = 0; i < children.length; i++) {
    if (children[i].firstChild.firstChild.nodeValue.toLowerCase() === infoToDisplay) {
      children[i].firstChild.classList.value = `mobile-planet-info-nav-active ${planetName.toLowerCase()}`;
    } else {
      children[i].firstChild.classList.value = "";
    }
  }
}

function updateDesktopNavActiveBtn(active) {
  let infoToDisplay = active.firstChild.nodeValue.trim().toLowerCase()
  switch (infoToDisplay) {
    case "overview":
      infoToDisplay = "overview"
      break;
    case "structure":
      infoToDisplay = "internal structure"
      break;
    case "surface":
      infoToDisplay = "surface geology"
      break;
  }

  let children = planetInfoNav.children
  for (let i = 0; i < children.length; i++) {
    if (children[i].firstChild.lastChild.nodeValue.trim().toLowerCase() === infoToDisplay) {
      children[i].firstChild.classList.value = `nav-btn btn-active ${planetName.toLowerCase().trim()}`;
      activeBtn = children[i].firstChild;
    } else {
      children[i].firstChild.classList.value = "nav-btn";
    }
  }
}
