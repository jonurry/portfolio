// @codekit-prepend "resize.js";
// @codekit-prepend "animateSVG.js";
if (typeof jQuery === 'undefined') {
  var jQuery = '';
}
!(function($) {
  'use strict';

  $('.collapsed-testimonials').on('show.bs.collapse', function() {
    $('.show-testimonials').css('visibility', 'hidden');
  });

  // new data attribute for hiding the alerts
  $(function() {
    $('[data-hide]').on('click', function() {
      $(this)
        .closest('.' + $(this).attr('data-hide'))
        .hide();
    });
  });

  // email form validation
  $(document).ready(function() {
    const form = document.querySelector('form');
    form.onsubmit = async function(event) {
      // stop default form submission behavior
      event.preventDefault();
      if (form.checkValidity() === false) {
        form.classList.add('was-validated');
      } else {
        // Prepare data to send
        const data = {};
        const formElements = Array.from(form);
        formElements.map(input => (data[input.name] = input.value));
        try {
          // send the email
          let response = await fetch(form.action, {
            body: JSON.stringify(data),
            headers: {
              Accept: 'application/json',
              'content-type': 'application/json'
            },
            method: 'POST'
          });
          if (response.ok) {
            // The form submission was successful
            // show acknowledgement message. Auto dismiss after 5 seconds.
            $('#contact-message-sent').show();
            setTimeout(function() {
              $('#contact-message-sent').hide();
            }, 5000);
            // clear the form fields
            form.reset();
          } else {
            // The form submission failed
            console.error(response);
            // show failure message.
            $('#contact-message-failed').show();
          }
          console.log(response);
        } catch (error) {
          // show failure message.
          $('#contact-message-failed').show();
        }
      }
    };
  });
})(jQuery);
