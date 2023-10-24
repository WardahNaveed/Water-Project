// Attaching click event listeners to each small cup
document.querySelectorAll(".cup-small").forEach((cupElement, index) => {
  cupElement.addEventListener("click", () => handleCupClick(index));
});

/**
* Handles the click event for a small cup
* @param {number} position - Index of the clicked cup
*/
function handleCupClick(position) {
  const allCups = [...document.querySelectorAll(".cup-small")];
  const selectedCup = allCups[position];

  // Determine if the clicked cup should be deselected based on its state and the state of the next cup
  const shouldDeselect = selectedCup.classList.contains("full") && 
      (!selectedCup.nextElementSibling || !selectedCup.nextElementSibling.classList.contains("full"));
  
  position = shouldDeselect ? position - 1 : position;

  // Update the class for each cup based on the clicked position
  allCups.forEach((cup, i) => {
      if (i <= position) {
          cup.classList.add("full");
      } else {
          cup.classList.remove("full");
      }
  });

  // Update the big cup display to reflect changes
  adjustBigCupDisplay();
}

/**
* Updates the display of the big cup based on how many small cups are filled
*/
function adjustBigCupDisplay() {
  const filledCupCount = document.querySelectorAll(".cup-small.full").length;
  const totalCupCount = document.querySelectorAll(".cup-small").length;

  // Calculate the ratio of filled cups to total cups
  const ratioFilled = filledCupCount / totalCupCount;

  const percentageElement = document.getElementById("percentage");
  const remainedElement = document.getElementById("remained");
  const litersElement = document.getElementById("liters");

  // Update the visibility and height of the percentage indicator based on filled cups
  if (filledCupCount > 0) {
      percentageElement.style.visibility = "visible";
      percentageElement.style.height = `${ratioFilled * 330}px`;
      percentageElement.textContent = `${Math.round(ratioFilled * 100)}%`;
  } else {
      percentageElement.style.visibility = "hidden";
  }

  // Update the visibility of the remained indicator based on filled cups
  remainedElement.style.visibility = filledCupCount === totalCupCount ? "hidden" : "visible";
  
  // Update the liters indicator based on filled cups
  if (filledCupCount !== totalCupCount) {
      litersElement.textContent = `${2 - (250 * filledCupCount) / 1000}L`;
  }
}
