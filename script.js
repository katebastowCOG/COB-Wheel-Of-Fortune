// Immediately invoked function expression
// to not pollute the global scope
(function() {
  const wheel = document.querySelector('.spin-wheel');
  const startButton = document.querySelector('.wheel-button');
  const display = document.querySelector('.display-wheel-prize');
  const displayMessage = document.querySelector('.display-end-message');
  
  // Divide 360 degrees by the number of segments on the wheel - Set for 12 segments
  let deg = 0;
  let zoneSize = 30; // 

  // Label the wheel contents in counter clockwise order
  const symbolSegments = {
    1: "Better luck next time...",
    2: "20% OFF",
    3: "Better luck next time...",
    4: "30% OFF",
    5: "Better luck next time...",
    6: "25% OFF",
    7: "Better luck next time...",
    8: "15% OFF",
    9: "Better luck next time...",
    10: "10% OFF",
    11: "Better luck next time...",
    12: "40% OFF",
  }

  const handleWin = (actualDeg) => {
    const winningSymbolNr = Math.ceil(actualDeg / zoneSize);
    display.innerHTML = symbolSegments[winningSymbolNr];
  }

  // Counter to track click events
  let clickCount = 0;

  startButton.addEventListener('click', () => {

    // Reset display
    display.innerHTML = " ";
    // Disable button during spin
    startButton.style.pointerEvents = 'none';
    // Calculate a new rotation between 5000 and 10 000
    deg = Math.floor(5000 + Math.random() * 5000);
    // Set the transition on the wheel
    wheel.style.transition = 'all 3s ease-out';
    // Rotate the wheel
    wheel.style.transform = `rotate(${deg}deg)`;
    // Apply the blur
    wheel.classList.add('wheel-blur');

    // Prevent user from spinning wheel after 3 clicks
    clickCount++;
    if (clickCount === 3) {
      setTimeout(() => {
      displayMessage.innerHTML = "Thanks for playing!";
      }, 3000); //delay message display until wheel has stopped spinning
    } else if (clickCount > 3) {
      return;
    }
  });

  wheel.addEventListener('transitionend', () => {
    // Remove blur
    wheel.classList.remove('wheel-blur');
    // Enable button when spin is over
    startButton.style.pointerEvents = 'auto';
    // Need to set transition to none as we want to rotate instantly
    wheel.style.transition = 'none';
    // Calculate degree on a 360 degree basis to get the "natural" real rotation
    // Important because we want to start the next spin from that one
    // Use modulus to get the rest value
    const actualDeg = deg % 360;
    // Set the real rotation instantly without animation
    wheel.style.transform = `rotate(${actualDeg}deg)`;
    // Calculate and display the winning symbol
    handleWin(actualDeg);
  });
})();