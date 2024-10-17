$(document).ready(function() {

  $( "#sortable" ).sortable();

  $(".category__content").hide();
  $(".gender__wrapper-male").click(function(){
    $(".gender__content").hide();
    $(".category__content").fadeIn();
  });

  $(".gender__wrapper-female").click(function(){
    $(".gender__content").hide();
    $(".category__content").fadeIn();
  });

  $(".genderPrevBtn").click(function(){
    $(".gender__content").fadeIn();
    $(".category__content").hide();
  });


//  $('.carousel').mobileSwipe({ threshold: 50 });

//  $('.+6666').owlCarousel({
//     loop: true,
//     margin: 10,
//     responsiveClass: true,
//     smartSpeed:400,
//     responsive: {
//       0: {
//         items: 1,
//         nav: true
//       },
//       600: {
//         items: 3,
//         nav: false
//       },
//       1000: {
//         items: 5,
//         nav: true,
//         loop: false,
//         margin: 20
//       }
//     }
//   });

//   $('.testimonial-carousel').owlCarousel({
//     loop: true,
//     margin: 10,
//     responsiveClass: true,
//     smartSpeed:800,
//     responsive: {
//       0: {
//         items: 1,
//         nav: true
//       },
//       600: {
//         items: 1,
//         nav: false
//       },
//       1000: {
//         items: 1,
//         nav: true,
//         loop: false,
//         margin: 20
//       }
//     }
//   });

//   $('.packages-carousel').owlCarousel({
//     loop: true,
//     margin: 10,
//     responsiveClass: true,
//     smartSpeed:800,
//     responsive: {
//       0: {
//         items: 1,
//         nav: true
//       },
//       600: {
//         items: 1,
//         nav: false
//       },
//       1000: {
//         items: 1,
//         nav: true,
//         loop: false,
//         margin: 20
//       }
//     }
//   });

});

$(".add-details, .basic-workout, .add-instruction").hide();
$( "#sortable" ).sortable();
// /* ------ SLIDER RANGE START  ------ */
// $( "#setsWeights" ).slider({
//       range: "min",
//       value: 0,
//       min: 0,
//       max: 5,
//       slide: function( event, ui ) {
//         $( "#setsWeightsVal" ).val( ui.value );
//       }
//     });
// $( "#setsWeightsVal" ).val( $( "#setsWeights" ).slider( "value" ) );

// $( "#setsWeightsVal" ).on("change", function(){
//   $("#setsWeights").slider('value',$(this).val());
// });

// /*--------------*/

// $( "#reps" ).slider({
//       range: "min",
//       value: 0,
//       min: 0,
//       max: 10,
//       slide: function( event, ui ) {
//         $( "#repsVal" ).val( ui.value );
//       }
//     });
// $( "#repsVal" ).val( $( "#reps" ).slider( "value" ) );

// $( "#repsVal" ).on("change", function(){
//   $("#reps").slider('value',$(this).val());
// });

// /*--------------*/


// $( "#restPeriod" ).slider({
//       range: "min",
//       value: 0,
//       min: 0,
//       max: 60,
//       slide: function( event, ui ) {
//         $( "#restPeriodVal" ).val( ui.value );
//       }
//     });
// $( "#restPeriodVal" ).val( $( "#restPeriod" ).slider( "value" ) );

// $( "#restPeriodVal" ).on("change", function(){
//   $("#restPeriod").slider('value',$(this).val());
// });

// /* ------ SLIDER RANGE END   ------ */


$(".search__box__btn-exercise-open").click(function(){
  $(".search__box-exercise-closed").removeClass("search__box-exercise-closed");
});



// $(".videos a").click(function(){
//   var currentVideoUrl = $(this).find("video source").attr("src");
//   //console.log(currentVideoUrl);
//   $("body").append('<div class="video-popup__wrapper"><div class="video-pop zoomIn"><a href="#" class="close-video-pop"><i class="fas fa-times"></i></a><video _ngcontent-c3="" autoplay="" loop="" muted="" playsinline="" controls style="width: 100%;"><source _ngcontent-c3="" src="'+currentVideoUrl+'" type="video/mp4"></video></div></div>');

//     if($(".video-popup__wrapper").length !== 0){
//       $(".close-video-pop").click(function(){
//            $("body .video-popup__wrapper").removeClass("zoomIn");
//            $("body .video-popup__wrapper .video-pop").addClass("zoomOut");
//            $("body .video-popup__wrapper").fadeOut();
//             setTimeout(function() { $("body .video-popup__wrapper").remove(); }, 300);

//       });
//     }
// });



/*$(".login__with-social-google, .login__with-social-facebook").hide();

$(".login-google").click(function(){
  $('.login__with-social-facebook').hide();
  $('.login__with-social-google').fadeIn();
});

$(".login-facebook").click(function(){
  $('.login__with-social-google').hide();
  $('.login__with-social-facebook').fadeIn();
});*/


// $(".signUp__fileds").hide();

// $(".signUp__link").click(function(){
//   $('.login__fileds').hide();
//   $('.signUp__fileds').fadeIn();
// });


// $(".videos__search__lactions div a video").mouseenter(function(){
//   $(this).attr("controls","controls");
// }).mouseleave(function(){
//   $(".videos__search__lactions div a video").removeAttr("controls","");
// });

// $(".imgFileUpload").on("click",function(){
// $("#imgFileUpload").trigger("click");
// event.preventDefault();
// });
// $(".videoFileUpload").on("click",function(){
//   $("#videoFileUpload").trigger("click");
//   event.preventDefault();
//   });

// $("body").click(function(){
// $(".error_alert_msg").addClass("error_alet_msg_show")
// })


function exerciseDetails(showExerciseDetails, current){

$(".add-details, .add-video, .basic-workout, .add-instruction").hide();
var currentTab = current;

if(showExerciseDetails == "addVideo") {
  $(".add-video").fadeIn();
  $(".exercise__add-items").removeClass("active");
  $(currentTab).addClass("active");
}
if(showExerciseDetails == "addDetails") {
  $(".add-details").fadeIn();
  $(".exercise__add-items").removeClass("active");
  $(currentTab).addClass("active");
}
if(showExerciseDetails == "basicWorkout") {
  $(".basic-workout").fadeIn();
  $(".exercise__add-items").removeClass("active");
  $(currentTab).addClass("active");
}
if(showExerciseDetails == "addInstructions") {
  $(".add-instruction").fadeIn();
  $(".exercise__add-items").removeClass("active");
  $(currentTab).addClass("active");
}
}


$('input[type="text"], textarea').keyup(function() {
  if($(this).val() !== '') {
     // $(':input[type="button"]').prop('disabled', false);
     document.getElementById("nextBtn").removeAttribute("disabled");
  }else {
     document.getElementById("nextBtn").setAttribute("disabled");
  }
});

$("#nextBtn").click(function(){
  if($(this).closest("form").find("#profileFormSection .active input[type='text']").val() == ""){
    document.getElementById("nextBtn").setAttribute("disabled","disabled");
  }else{
    document.getElementById("nextBtn").removeAttribute("disabled");
  }
});


// var currentTab = 0; // Current tab is set to be the first tab (0)
// showTab(currentTab); // Display the crurrent tab
// document.getElementById("submitBtn").style.display = "none";
// function showTab(n) {
// // This function will display the specified tab of the form...
// var x = document.getElementsByClassName("formTab");
// //x[n].style.display = "flex";

// x[n].classList.add("active");
// x[n].classList.add("slidenRight");
// //... and fix the Previous/Next buttons:
// if (n !== 0) {
//   document.getElementById("prevBtn").removeAttribute("disabled");
// }
// if (n == 0) {
//   document.getElementById("prevBtn").setAttribute("disabled","disabled");

// }
// if (n == (x.length - 1)) {
//   document.getElementById("nextBtn").style.display = "none";
//   document.getElementById("submitBtn").style.display = "inline";
// } else {
//   document.getElementById("nextBtn").style.display = "inline";
//   document.getElementById("submitBtn").style.display = "none";
// }

// //... and run a function that will display the correct step indicator:
// // fixStepIndicator(n)
// console.log(n);
// }


// function nextPrev(n) {
// // This function will figure out which tab to display
// var x = document.getElementsByClassName("formTab");
// // Hide the current tab:
// x[currentTab].classList.remove("slidenRight");
// x[currentTab].classList.add("slidenLeft");
// //x[currentTab].style.display = "none";
// x[currentTab].classList.remove("active");
// // Increase or decrease the current tab by 1:
// currentTab = currentTab + n;
// // if you have reached the end of the form...
// if (currentTab >= x.length) {
//   // ... the form gets submitted:
//   document.getElementById("regForm").submit();
//   return false;
// }
// // Otherwise, display the correct tab:
// showTab(currentTab);
// }


