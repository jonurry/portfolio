// @codekit-prepend "resize.js";
// @codekit-prepend "animateSVG.js";
if (typeof jQuery === 'undefined') {
  var jQuery = '';
}
!(function($) {
  'use strict';

  $('#collapsedTestimonials').on('show.bs.collapse', function() {
    $('.show-testimonials').css('visibility', 'hidden');
  });
})(jQuery);
