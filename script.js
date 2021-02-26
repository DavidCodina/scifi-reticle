/* =============================================================================
                            initialization
============================================================================= */


const crosshairContainer = document.querySelector('#crosshair-container');
const crosshairBorders   = crosshairContainer.querySelector('.borders');
const sciFiCircle        = crosshairContainer.querySelector('#scifi-circle-svg');
const previousPosition   = { x: 0, y: 0 };



function animateCrosshair(e){
  const eventDataDiv       = document.querySelector('#event-data');
  eventDataDiv.textContent = '';
  eventDataDiv.textContent = e.type;

  setTimeout(function(){
    if (e.originalEvent.touches){
      let touch = e.originalEvent.touches[0];
      eventDataDiv.textContent = touch.pageX + ", " + touch.pagY;
    }
  }, 2000);




  crosshairContainer.style.transition = 'all 0.35s linear';
  crosshairContainer.style.transform  = `translate(${e.pageX}px, ${e.pageY - window.scrollY}px)`;
  crosshairContainer.style.opacity    = '1';
  sciFiCircle.style.transition        = 'none';
  sciFiCircle.style.opacity           = '1';

  if (e.pageX > previousPosition.x){
    crosshairBorders.style.transform                        = 'rotate(180deg) scale(1.5)';
    setTimeout(function(){ crosshairBorders.style.transform = 'rotate(180deg) scale(1)'; }, 200);
  } else {
    crosshairBorders.style.transform                        = 'rotate(-180deg) scale(1.5)';
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





////////////////////////////////////////////////////////////////////////////////
//
//  https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
//  https://developer.mozilla.org/en-US/docs/Web/API/Touch_events
//  https://stackoverflow.com/questions/6780965/why-onclick-event-suppressed-when-preventdefault-is-called-for-the-touchstart
//
//  https://makandracards.com/makandra/51956-event-order-when-clicking-on-touch-devices
//  Note that an event handler bound to a parent element (here document) can NOT cancel the sequence:
//  document.addEventListener('touchstart', (event) => event.preventDefault());
//  This this won't work:
//
// document.querySelector('BODY').addEventListener('touchstart', function(e){
//   e.preventDefault();
//   animateCrosshair(e);
// });
//
// document.querySelector('BODY').addEventListener('click', function(e){
//   animateCrosshair(e);
// });
//
////////////////////////////////////////////////////////////////////////////////


function removeClickHandler(){
  document.querySelector('BODY').removeEventListener('click', animateCrosshair);
  setTimeout(function(){ document.removeEventListener('touchstart', removeClickHandler); }, 1000);
}
document.addEventListener('touchstart', removeClickHandler);


document.querySelector('BODY').addEventListener('touchstart', function(e){
  e.preventDefault();
  animateCrosshair(e);
});

document.querySelector('BODY').addEventListener('click', animateCrosshair);








setTimeout(function(){ document.querySelector('#intro-message').style.display = 'none';}, 5000);
