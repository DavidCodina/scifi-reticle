const crosshairContainer = document.querySelector('#crosshair-container');
const crosshairBorders   = crosshairContainer.querySelector('.borders');
const sciFiCircle        = crosshairContainer.querySelector('#scifi-circle-svg');
const previousPosition   = { x: 0, y: 0 };


/* =============================================================================

============================================================================= */


function animateCrosshair(e){
  const x                             = e.pageX;
  const y                             = e.pageY - window.scrollY;
  crosshairContainer.style.transition = 'all 0.35s linear';
  crosshairContainer.style.transform  = `translate(${x}px, ${y}px)`;
  crosshairContainer.style.opacity    = '1';
  sciFiCircle.style.transition        = 'none';
  sciFiCircle.style.opacity           = '1';

  // https://stackoverflow.com/questions/35186768/safari-css-bug-animation-rotation-direction-incorrect
  if (x > previousPosition.x){
    crosshairBorders.style.transform                        = 'rotate(179deg) scale(1.5)';
    setTimeout(function(){ crosshairBorders.style.transform = 'rotate(179deg) scale(1)'; }, 200);
  } else {
    crosshairBorders.style.transform                        = 'rotate(-179deg) scale(1.5)';
    setTimeout(function(){ crosshairBorders.style.transform = 'rotate(-179deg) scale(1)'; }, 200);
  }

  previousPosition.x = x;
  previousPosition.y = y;

  setTimeout(function(){
    crosshairContainer.style.transition    = 'all 2s linear';
    crosshairContainer.style.opacity       = '0.15';
    sciFiCircle.style.transition           = 'opacity 2s linear';
    sciFiCircle.style.opacity              = '';

    crosshairBorders.style.transition      = "none";
    crosshairBorders.style.transform       = 'rotate(0deg)';
    void(crosshairBorders.offsetHeight); //force reflow.
    crosshairBorders.style.transition      = "";
  }, 550);
}


/* =============================================================================
                            initialization
============================================================================= */


document.querySelector('MAIN').addEventListener('click', animateCrosshair);
setTimeout(function(){ document.querySelector('#intro-message').style.display = 'none';}, 5000);
