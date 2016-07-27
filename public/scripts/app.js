console.log("Sanity Check: JS is working!");

$(document).ready(function() {



var mun_endpoint = "http://api.burningsoul.in/moon/"


$.getJSON(mun_endpoint, function(data) {


var mun_stage = data['stage'];
var NFM = data['FM']['DT'];
var NNM = data['NNM']['DT'];
var distance = Math.floor(data['DFCOE']*0.621371)+"  miles";

$('#mun_stage').text("Moonphase: " + mun_stage);
$('#mun_FM').text("Next Full Moon: " + NFM);
$('#mun_NM').text("Next New Moon: " + NNM);
$('#dfe').text("Current Distance From Earth: " + distance);

})

  var ISS_endpoint = "http://api.open-notify.org/iss-pass.json?lat=37.78&lon=-122.44&alt=20&n=5&callback=?";
  var ISS_pass=[]
  var ISS_dur=[]


  $.getJSON( ISS_endpoint).success( function(data) {
      data['response'].forEach(function (d) {
          var date = new Date(d['risetime']*1000);

           // $('#isspass').append
           ISS_pass.push((date.toString().substring(0,21)));
           ISS_dur.push(Math.floor(d['duration']/60));
           for (var i=0; i<3; i++) {
           $('#pass'+(i+1)+'').text(ISS_pass[i]+ " "+"for "+" " + ISS_dur[i] + " seconds")
          
         }
      });
  });




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





$('#recent_logs').on('click', function(e) {

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

});



$('#delete-comment').on('click', function(e) {

$.delete('/astrologs/:id'),function(astrolog) {

  
      renderAstroLog(astrolog) };
});



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





// FORM WITH RATING
(function(e){var t,o={className:"autosizejs",append:"",callback:!1,resizeDelay:10},i='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',n=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],s=e(i).data("autosize",!0)[0];s.style.lineHeight="200px","200px"===e(s).css("lineHeight")&&n.push("lineHeight"),s.style.lineHeight="",e.fn.autosize=function(i){return this.length?(i=e.extend({},o,i||{}),s.parentNode!==document.body&&e(document.body).append(s),this.each(function(){function o(){var t,o;"getComputedStyle"in window?(t=window.getComputedStyle(u,null),o=u.getBoundingClientRect().width,e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,i){o-=parseInt(t[i],10)}),s.style.width=o+"px"):s.style.width=Math.max(p.width(),0)+"px"}function a(){var a={};if(t=u,s.className=i.className,d=parseInt(p.css("maxHeight"),10),e.each(n,function(e,t){a[t]=p.css(t)}),e(s).css(a),o(),window.chrome){var r=u.style.width;u.style.width="0px",u.offsetWidth,u.style.width=r}}function r(){var e,n;t!==u?a():o(),s.value=u.value+i.append,s.style.overflowY=u.style.overflowY,n=parseInt(u.style.height,10),s.scrollTop=0,s.scrollTop=9e4,e=s.scrollTop,d&&e>d?(u.style.overflowY="scroll",e=d):(u.style.overflowY="hidden",c>e&&(e=c)),e+=w,n!==e&&(u.style.height=e+"px",f&&i.callback.call(u,u))}function l(){clearTimeout(h),h=setTimeout(function(){var e=p.width();e!==g&&(g=e,r())},parseInt(i.resizeDelay,10))}var d,c,h,u=this,p=e(u),w=0,f=e.isFunction(i.callback),z={height:u.style.height,overflow:u.style.overflow,overflowY:u.style.overflowY,wordWrap:u.style.wordWrap,resize:u.style.resize},g=p.width();p.data("autosize")||(p.data("autosize",!0),("border-box"===p.css("box-sizing")||"border-box"===p.css("-moz-box-sizing")||"border-box"===p.css("-webkit-box-sizing"))&&(w=p.outerHeight()-p.height()),c=Math.max(parseInt(p.css("minHeight"),10)-w||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word",resize:"none"===p.css("resize")||"vertical"===p.css("resize")?"none":"horizontal"}),"onpropertychange"in u?"oninput"in u?p.on("input.autosize keyup.autosize",r):p.on("propertychange.autosize",function(){"value"===event.propertyName&&r()}):p.on("input.autosize",r),i.resizeDelay!==!1&&e(window).on("resize.autosize",l),p.on("autosize.resize",r),p.on("autosize.resizeIncludeStyle",function(){t=null,r()}),p.on("autosize.destroy",function(){t=null,clearTimeout(h),e(window).off("resize",l),p.off("autosize").off(".autosize").css(z).removeData("autosize")}),r())})):this}})(window.jQuery||window.$);

var __slice=[].slice;(function(e,t){var n;n=function(){function t(t,n){var r,i,s,o=this;this.options=e.extend({},this.defaults,n);this.$el=t;s=this.defaults;for(r in s){i=s[r];if(this.$el.data(r)!=null){this.options[r]=this.$el.data(r)}}this.createStars();this.syncRating();this.$el.on("mouseover.ratings","span",function(e){return o.syncRating(o.$el.find("span").index(e.currentTarget)+1)});this.$el.on("mouseout.ratings",function(){return o.syncRating()});this.$el.on("click.ratings","span",function(e){return o.setRating(o.$el.find("span").index(e.currentTarget)+1)});this.$el.on("ratings:change",this.options.change)}t.prototype.defaults={rating:void 0,numStars:5,change:function(e,t){}};t.prototype.createStars=function(){var e,t,n;n=[];for(e=1,t=this.options.numStars;1<=t?e<=t:e>=t;1<=t?e++:e--){n.push(this.$el.append("<span class='glyphicon .glyphicon-star-empty'></span>"))}return n};t.prototype.setRating=function(e){if(this.options.rating===e){e=void 0}this.options.rating=e;this.syncRating();return this.$el.trigger("ratings:change",e)};t.prototype.syncRating=function(e){var t,n,r,i;e||(e=this.options.rating);if(e){for(t=n=0,i=e-1;0<=i?n<=i:n>=i;t=0<=i?++n:--n){this.$el.find("span").eq(t).removeClass("glyphicon-star-empty").addClass("glyphicon-star")}}if(e&&e<5){for(t=r=e;e<=4?r<=4:r>=4;t=e<=4?++r:--r){this.$el.find("span").eq(t).removeClass("glyphicon-star").addClass("glyphicon-star-empty")}}if(!e){return this.$el.find("span").removeClass("glyphicon-star").addClass("glyphicon-star-empty")}};return t}();return e.fn.extend({ratings:function(){var t,r;r=arguments[0],t=2<=arguments.length?__slice.call(arguments,1):[];return this.each(function(){var i;i=e(this).data("star-rating");if(!i){e(this).data("star-rating",i=new n(e(this),r))}if(typeof r==="string"){return i[r].apply(i,t)}})}})})(window.jQuery,window);$(function(){return $(".ratings").ratings()})

$(function(){

  $('#get-review').autosize({append: "\n"});

  var reviewContainer = $('#submit-review');
  var getReview = $('#get-review');
  var showReviewTextarea = $('#show-review-textarea');
  var rejectReview = $('#reject-review');
  var selectStars = $('#hide-stars');
  var createlog = $('#astroLogCreate');

  showReviewTextarea.click(function(e)
  {
    reviewContainer.slideDown(500, function()
      {
        $('#get-review').trigger('autosize.resize');
        getReview.focus();
      });
    showReviewTextarea.fadeOut(200);
    rejectReview.show();
  });

  rejectReview.click(function(e)
  {
    e.preventDefault();
    reviewContainer.slideUp(400, function()
      {
        getReview.focus();
        showReviewTextarea.fadeIn(300);
      });
    rejectReview.hide();
  });

     createlog.click(function(e)
  {
    reviewContainer.slideUp(400, function()
      {
        getReview.focus();
        showReviewTextarea.fadeIn(300);
      });
    rejectReview.hide();

  });


  $('.ratings').on('ratings:change', function(e, value){
    selectStars.val(value);
  });


}); 

// 


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








});


