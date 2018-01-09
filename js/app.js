// @codekit-prepend "resize.js";
// @codekit-prepend "animateSVG.js";

!(function($) {
  "use strict";

  $('#collapsedTestimonials').on('show.bs.collapse', function () {
    $('.show-testimonials').css('visibility', 'hidden');
  })

})(jQuery);
