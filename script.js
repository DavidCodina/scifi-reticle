/* =============================================================================
                            initialization
============================================================================= */


const crosshairContainer = document.querySelector('#crosshair-container');
const crosshairBorders   = crosshairContainer.querySelector('.borders');
const sciFiCircle        = crosshairContainer.querySelector('#scifi-circle-svg');
const previousPosition   = { x: 0, y: 0 };



function animateCrosshair(e){
  crosshairContainer.style.transition = 'all 0.35s linear';
  crosshairContainer.style.transform  = `translate(${e.pageX}px, ${e.pageY - window.scrollY}px)`;
  crosshairContainer.style.opacity    = '1';
  sciFiCircle.style.transition        = 'none';
  sciFiCircle.style.opacity           = '1';

  if (e.pageX > previousPosition.x){
    alert("Case 1: ", e.pageX);
    crosshairBorders.style.transform = 'rotate(180deg) scale(1.5)'; //could scale it as well.
    setTimeout(function(){ crosshairBorders.style.transform = 'rotate(180deg) scale(1)'; }, 200);
  } else {
    alert("Case 2: ",e.pageX);
    crosshairBorders.style.transform = 'rotate(-180deg) scale(1.5)';
    setTimeout(function(){ crosshairBorders.style.transform = 'rotate(-180deg) scale(1)'; }, 200);
  }

  previousPosition.x = e.pageX;
  previousPosition.y = e.pageY;

  setTimeout(function(){
    crosshairContainer.style.transition = 'all 2s linear';
    crosshairContainer.style.opacity    = '0.15';
    sciFiCircle.style.transition        = 'opacity 2s linear';
    sciFiCircle.style.opacity           = '';

    crosshairBorders.style.transition   = "none";
    crosshairBorders.style.transform    = 'rotate(0deg)';
    void(crosshairBorders.offsetHeight); //force reflow.
    crosshairBorders.style.transition   = "";
  }, 550);
}




document.onclick = animateCrosshair;
document.ontouchstart = function(e){
  e.preventDefault(); // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
  animateCrosshair(e);
};




setTimeout(function(){ document.querySelector('#intro-message').style.display = 'none';}, 5000);
