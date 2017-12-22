!(function($) {
  "use strict";

  function resize() {
    $(".project-content").each(function() {
      var height;
      height = $(this).height();
      height += $(window).height() * 0.8;
      height += "px";
      $(this)
        .parent()
        .css("min-height", height);
    });
  }

  $(document).ready(resize);
  $(window).resize(resize);
})(jQuery);
