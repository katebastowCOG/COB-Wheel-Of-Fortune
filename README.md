##COB Spin the Wheel

#Staging Asset

******************************

<style>
  .breadcrumb {
  display: none;
  }
  #main {
  padding: 0;
  }
  #header{
  display: none;
  }
  /* WHEEL STYLING */
  @media screen and (min-width: 768px) {
  .spin-wheel-container {
  margin: 0 auto;
  margin-top: 5vw;
  margin-bottom: 10vw;
  max-width: 90%;
  }
  }
  @media screen and (max-width: 768px) {
  .spin-wheel-container {
  margin-top: 10vw;
  margin-bottom: 30vw;
  }
  }
  #wheelcontainer {
  width: 400px;
  height: 400px;
  margin: 0 auto;
  position: relative;
  }
  @media screen and (min-width: 768px) {
  .wheel-intro-copy {
  margin-bottom: 3vw;
  }
  }
  @media screen and (max-width: 768px) {
  .wheel-intro-copy {
  margin-bottom: 10vw;
  }
  }
  .wheel-heading {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2.4rem;
  color: #EFA9D2;
  text-align: center;
  }
  @media screen and (max-width: 768px) {
  .wheel-heading {
  font-size: 1.8rem;
  line-height: 1.8rem;
  margin-bottom: 2vw;
  }
  }
  .wheel-para {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
  color: #EFA9D2;
  text-align: center;
  }
  .display-wheel-prize, .display-end-message {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 100px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.6rem;
  margin: 1vw auto;
  color: #EFA9D2;
  }
  .wheel-marker {
  position: absolute;
  width: 60px;
  left: 172px;
  top: -20px;
  z-index: 2;
  }
  .spin-wheel {
  width: 100%;
  height: 100%;
  }
  .wheel-button {
  position: absolute;
  width:100px;
  left: 150px;
  top: 150px;
  z-index: 2;
  cursor: pointer;
  }
  .wheel-blur {
  animation: blur 5s;
  }
  @keyframes wheel-blur {
  0% {
    filter: blur(0.5px);
  }
  80% {
    filter: blur(1px);
  }
  100% {
    filter: blur(0px);
  }
  }
</style>



<div class="spin-wheel-container">
  <div class="wheel-intro-copy">
     <h2 class="wheel-heading">Spin to Win with <br class="hide-for-large">Cotton On BODY!</h2>
     <p class="wheel-para">Spin the wheel to claim your prize.</p>
  </div>
  <div id="wheelcontainer">
     <img class="wheel-marker" src="images/landing-pages/body_spin_wheel_marker.png?$staticlink$" />
     <img class="spin-wheel" src="images/landing-pages/body_spin_wheel_project.png?$staticlink$" />
     <img class="wheel-button" src="images/landing-pages/body_spin_wheel_button.png?$staticlink$" />
     <div class="display-wheel-prize"> </div>
     <div class="display-end-message"> </div>
  </div>
</div>



<!-- WHEEL SCRIPT -->

<script>
  // Immediately invoked function expression
  // to not pollute the global scope
  (function() {
      const wheel = document.querySelector('.spin-wheel');
      const startButton = document.querySelector('.wheel-button');
      const display = document.querySelector('.display-wheel-prize');
      const displayMessage = document.querySelector('.display-end-message');
      
      // Divide 360 degrees by the number of segments on the wheel - Set for 12 segments
      let deg = 0;
      let zoneSize = 30; // deg 
    
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
    
      
</script>