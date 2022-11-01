 //after window is loaded completely 
 window.onload = function(){
    //hide the preloader
    // document.querySelector(".load").style.display = "none";
    // document.querySelector(".load").classList.toggle('load-hide');
    $( ".loader-container" ).fadeOut( "slow", function() {
        // alert( "Animation complete." );
      });
}