/* JAVASCRIPT_COMMON : _object 'article', _type 'carousel' */
$( function(){
  $(".fancyboxVideo").each(function() {
    var href = $(this).attr('href');
    var autoplay = $(this).data('autoplay');
console.log(autoplay);
    $(this).fancybox({
      type: 'iframe',
      width: 896,
      height: 504,
      padding: 0,
      href:'/videoframe?src=' + encodeURI(href) + (autoplay ? '&autoplay=true' : '')
    });
  });
})

/* JAVASCRIPT_COMMON : _object 'article', _type 'google_map' */


    
          var gmapParams = [
        { "featureType": "administrative", "elementType": "geometry", "stylers": [ { "lightness": 40 } ] }, 
        { "featureType": "landscape", "elementType": "geometry", "stylers": [ { "color": "#ffffff" } ] },
        { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [ { "color": "#FFFFFF" } ] },
        { "featureType": "transit", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, 
        { "featureType": "water", "elementType": "all", "stylers": [ { "lightness": 50 } ] }, 
        { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#EEF1F5" } ] }, 
        { "featureType": "water", "elementType": "geometry.stroke", "stylers": [ { "color": "#EEF1F5" } ] } 
      ];

/* JAVASCRIPT_COMMON : _object 'article', _type 'counter' */
$(document).ready(function() {
    $('.article-counter').each(function() {
        $(this).waypoint(function() {
            this.disable();
            var article = $(this.element);
            article.find('.countTo').countTo({
                speed: 1500,
                refreshInterval: 42
            });
        }, { offset: '80%' });
    });
});

/* JAVASCRIPT_COMMON : _object 'article', _type 'portraits' */
$( function(){
  $(".fancyboxVideo").each(function() {
    var href = $(this).attr('href');
    var autoplay = $(this).data('autoplay');
console.log(autoplay);
    $(this).fancybox({
      type: 'iframe',
      width: 896,
      height: 504,
      padding: 0,
      href:'/videoframe?src=' + encodeURI(href) + (autoplay ? '&autoplay=true' : '')
    });
  });
})

/* JAVASCRIPT_SPECIFIC : _object 'content', _type 'default', #content-1 */

jQ(document).ready(function() {
  jQ('#content-1 .row').slick({
      infinite: true,
      autoplaySpeed: 3000,
      autoplay: true,
      dots: true,

     

   
   



   slidesToShow: 1,
   slidesToScroll: 1,


   
         prevArrow: '<i class="fas fa-chevron-left" aria-hidden="true"></i>',
      nextArrow: '<i class="fas fa-chevron-right" aria-hidden="true"></i>',
      
     
      
   
        });
});

/* JAVASCRIPT_SPECIFIC : _object 'content', _type 'default', #content-2 */

jQ(document).ready(function() {
});

/* JAVASCRIPT_SPECIFIC : _object 'content', _type 'default', #content-3 */

jQ(document).ready(function() {
});

/* JAVASCRIPT_SPECIFIC : _object 'content', _type 'default', #content-4 */

jQ(document).ready(function() {
});

/* JAVASCRIPT_SPECIFIC : _object 'content', _type 'default', #content-5 */

jQ(document).ready(function() {
  jQ('#content-5 .row').slick({
      infinite: true,
      autoplaySpeed: 3000,
      autoplay: true,
      dots: false,

     

   
   



   slidesToShow: 3,
   slidesToScroll: 3,


   
         prevArrow: '<i class="fas fa-chevron-left" aria-hidden="true"></i>',
      nextArrow: '<i class="fas fa-chevron-right" aria-hidden="true"></i>',
      
     
              adaptiveHeight: true,
         responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                 arrows: false,
                 dots: false
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false,
                dots: false 
              }
            },
            {
              breakpoint: 520,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false 
              }
            }
          ],
      
   
        });
});

/* JAVASCRIPT_SPECIFIC : _object 'content', _type 'default', #content-6 */

jQ(document).ready(function() {
  jQ('#content-6 .row').slick({
      infinite: true,
      autoplaySpeed: 3000,
      autoplay: false,
      dots: false,

     

   
   



   slidesToShow: 5,
   slidesToScroll: 5,


   
         prevArrow: '<i class="fas fa-chevron-left" aria-hidden="true"></i>',
      nextArrow: '<i class="fas fa-chevron-right" aria-hidden="true"></i>',
      
     
              adaptiveHeight: true,
         responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                 arrows: false,
                 dots: false
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false,
                dots: false 
              }
            },
            {
              breakpoint: 520,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false 
              }
            }
          ],
      
   
        });
});

/* JAVASCRIPT_SPECIFIC : _object 'content', _type 'default', #content-7 */

jQ(document).ready(function() {
  jQ('#content-7 .row').slick({
      infinite: true,
      autoplaySpeed: 3000,
      autoplay: true,
      dots: false,

     

   
   



   slidesToShow: 4,
   slidesToScroll: 4,


   
         prevArrow: '<i class="fas fa-chevron-left" aria-hidden="true"></i>',
      nextArrow: '<i class="fas fa-chevron-right" aria-hidden="true"></i>',
      
     
              adaptiveHeight: true,
         responsive: [
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                 arrows: false,
                 dots: false
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false,
                dots: false 
              }
            },
            {
              breakpoint: 520,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false 
              }
            }
          ],
      
   
        });
});

/* JAVASCRIPT_SPECIFIC : _object 'content', _type 'default', #content-8 */

jQ(document).ready(function() {
});