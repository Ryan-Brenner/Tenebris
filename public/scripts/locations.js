console.log("Sanity Check: JS is working!");

$(document).ready(function() {

$('#recent_logs').on('click', function(e) {

//   var viewItem = $('#astroLogs'); 

//   if(viewItem.hasClass('active')) {

//      viewItem.css('display', 'none');
//      viewItem.removeClass('active');
//   } else {
  
//   viewItem.css('display', '');
//   viewItem.addClass('active');
// };
 
  $.get('/astroLogs').success(function (astroLogs) {
      console.log('app.js loaded!');
          astroLogs.forEach( function (astroLogs){
          renderAstroLog(astroLogs)
        });
        });
    });


function geoloc() {

navigator.geolocation.getCurrentPosition(function(position) {
   $('#lati').val( position.coords.latitude);
   $('#longi').val(position.coords.longitude);
});
};

geoloc();


$('#Tenebris').on('click', function(e) {

  $.get('/')
};



$('#astroLogCreate').on('click', function(e) {
    e.preventDefault();
    var formData = $(this.form).serialize();
    console.log($(this.form).serialize());
    $.post('/astrologs', formData, function(astrolog) {
      renderAstroLog(astrolog) });
   
    $(this.form).trigger("reset");

  });





function renderAstroLog(astrolog) {
  var astroLogHtml = $('#astroLog-template').html();
  var astroLogTemplateFunction = Handlebars.compile(astroLogHtml);
  var html = astroLogTemplateFunction(astrolog);
  $('#astroLogs').prepend(html);

}




 


$(".dropdown1").hover(            
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("400");
            $(this).toggleClass('open');        
        },
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("400");
            $(this).toggleClass('open');       
        }
    );


// APOD IMAGE

var apod_endpoint = "https://api.nasa.gov/planetary/apod?api_key=NNKOjkoul8n1CH18TWA9gwngW1s1SmjESPjNoUFo";

  $.get(apod_endpoint).success(function handleApodSuccess(apod){

      if("copyright" in apod) {
        $("#copyright").text("Image Credits: " + apod.copyright);
      }
      else {
        $("#copyright").text("Image Credits: " + "Public Domain");
      }
      
      if(apod.media_type == "video") {
        $("#apod_img").css("display", "none"); 
        $("#apod_vid").attr("src", apod.url);
      }
      else {
        $("#apod_vid").css("display", "none"); 
        $("#apod_img").attr("src", apod.url);
      }
      $("#reqObject").text(apod_endpoint);
      $("#returnObject").text(JSON.stringify(apod, null, 4));  
      $("#apod_explaination").text(apod.explanation);
      // $("#apod_title").text(apod.title);


  });





});


