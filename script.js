/* =============================================================================
                            initialization
============================================================================= */


const crosshairContainer = document.querySelector('#crosshair-container');
const crosshairBorders   = crosshairContainer.querySelector('.borders');
const sciFiCircle        = crosshairContainer.querySelector('#scifi-circle-svg');
const previousPosition   = { x: 0, y: 0 };


function animateCrosshair(e){
  const eventDataDiv       = document.querySelector('#event-data');
  eventDataDiv.textContent = e.type;

  const x                             = e.pageX;
  const y                             = e.pageY - window.scrollY;
  crosshairContainer.style.transition = 'all 0.35s linear';
  crosshairContainer.style.transform  = `translate(${x}px, ${y}px)`;
  crosshairContainer.style.opacity    = '1';
  sciFiCircle.style.transition        = 'none';
  sciFiCircle.style.opacity           = '1';


  //https://stackoverflow.com/questions/35186768/safari-css-bug-animation-rotation-direction-incorrect
  if (x > previousPosition.x){
    crosshairBorders.style.transform = 'rotate(179deg) scale(1.5)';
    setTimeout(function(){
      crosshairBorders.style.transform = 'rotate(179deg) scale(1)';
    }, 200);
  } else {
    crosshairBorders.style.transform  = 'rotate(-179deg) scale(1.5)';
    setTimeout(function(){
      crosshairBorders.style.transform = 'rotate(-179deg) scale(1)';
    }, 200);
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



// The old version  explicitly checked for touch, bu that's not actually necessary.
// function animateCrosshair(e){
//   const eventDataDiv       = document.querySelector('#event-data');
//   eventDataDiv.textContent = e.type;
//
//   let x = 0;
//   let y = 0;
//
//   if (e.type === 'touchstart'){
//     x = e.touches[0].clientX;
//     y = e.touches[0].clientY;
//   } else {
//     x = e.pageX;
//     y = e.pageY - window.scrollY;
//   }
//
//   crosshairContainer.style.transition = 'all 0.35s linear';
//   crosshairContainer.style.transform  = `translate(${x}px, ${y}px)`;
//   crosshairContainer.style.opacity    = '1';
//   sciFiCircle.style.transition        = 'none';
//   sciFiCircle.style.opacity           = '1';
//
//
//   //https://stackoverflow.com/questions/35186768/safari-css-bug-animation-rotation-direction-incorrect
//   if (x > previousPosition.x){
//     crosshairBorders.style.transform = 'rotate(179deg) scale(1.5)';
//     setTimeout(function(){
//       crosshairBorders.style.transform = 'rotate(179deg) scale(1)';
//     }, 200);
//   } else {
//     crosshairBorders.style.transform  = 'rotate(-179deg) scale(1.5)';
//     setTimeout(function(){
//       crosshairBorders.style.transform = 'rotate(-179deg) scale(1)';
//     }, 200);
//   }
//
//   previousPosition.x = x;
//   previousPosition.y = y;
//
//   setTimeout(function(){
//     crosshairContainer.style.transition    = 'all 2s linear';
//     crosshairContainer.style.opacity       = '0.15';
//     sciFiCircle.style.transition           = 'opacity 2s linear';
//     sciFiCircle.style.opacity              = '';
//
//     crosshairBorders.style.transition      = "none";
//     crosshairBorders.style.transform       = 'rotate(0deg)';
//     void(crosshairBorders.offsetHeight); //force reflow.
//     crosshairBorders.style.transition      = "";
//   }, 550);
// }


////////////////////////////////////////////////////////////////////////////////
//
//  Prevent click when touchstart is fired.
//
//
//  https://makandracards.com/makandra/51956-event-order-when-clicking-on-touch-devices
//  Note that an event handler bound to a parent element (here document) can NOT cancel the sequence:
//  document.addEventListener('touchstart', (event) => event.preventDefault());
//  This this won't work:
//
//    document.addEventListener('touchstart', function(e){
//        e.preventDefault();
//      animateCrosshair(e);
//    });
//
//   document.addEventListener('click', function(e){
//     animateCrosshair(e);
//   });
//
//
//   Nor will this:
//
//    document.querySelector('BODY').addEventListener('touchstart', function(e){
//        e.preventDefault();
//      animateCrosshair(e);
//    });
//
//   document.querySelector('BODY').addEventListener('click', function(e){
//     animateCrosshair(e);
//   });
//
//
//  However, this DOES work!
//
//    document.querySelector('MAIN').addEventListener('touchstart', function(e){
//      e.preventDefault();
//      animateCrosshair(e);
//    });
//
//   document.querySelector('MAIN').addEventListener('click', animateCrosshair);
//
//
//  That said clicks will still work on touch devices, so there shouldn't be a need
//  to double bind like this. At least not in this case.
//  Also if you use a touchstart event listener it will also trigger when the user
//  tries to scroll, which is undesired.
//
///////////////////////////////////////
//
//  You could do this, but that would then permanently remove the click handler,
//  which would not be ideal for devices that can use both clicks and touches.
//
//
//  function removeClickHandler(){
//    document.querySelector('BODY').removeEventListener('click', animateCrosshair);
//    setTimeout(function(){ document.removeEventListener('touchstart', removeClickHandler); }, 1000);
//  }
//
//  document.addEventListener('touchstart', removeClickHandler);
//
////////////////////////////////////////////////////////////////////////////////


document.querySelector('MAIN').addEventListener('click', animateCrosshair);


setTimeout(function(){ document.querySelector('#intro-message').style.display = 'none';}, 5000);
