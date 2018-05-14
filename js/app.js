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
      //event.stopPropagation();
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
            body: JSON.stringify(data), // must match 'Content-Type' header
            //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, same-origin, *omit
            headers: {
              Accept: 'application/json',
              'content-type': 'application/json'
            },
            method: 'POST' // *GET, POST, PUT, DELETE, etc.
            //mode: 'no-cors' // no-cors, cors, *same-origin
            //redirect: 'follow', // manual, *follow, error
            //referrer: 'no-referrer' // *client, no-referrer
          });
          //response = await response.json();
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

          // // Construct an HTTP request
          // var xhr = new XMLHttpRequest();
          // xhr.open(form.method, form.action, true);
          // xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
          // xhr.setRequestHeader(
          //   'Content-Type',
          //   'application/json; charset=UTF-8'
          // );

          // // Send the collected data as JSON
          // xhr.send(JSON.stringify(data));

          // // Callback function
          // xhr.onloadend = response => {
          //   if (response.target.status === 200) {
          //     // The form submission was successful
          //     // show acknowledgement message. Auto dismiss after 5 seconds.
          //     $('#contact-message-sent').show();
          //     setTimeout(function() {
          //       $('#contact-message-sent').hide();
          //     }, 5000);
          //     // clear the form fields
          //     form.reset();
          //   } else {
          //     // The form submission failed
          //     console.error(JSON.parse(response.target.response).message);
          //     // show failure message.
          //     $('#contact-message-failed').show();
          //   }
          // };
        } catch (error) {
          //console.error(JSON.parse(response.target.response).message);
          // show failure message.
          $('#contact-message-failed').show();
        }
      }
    };
  });
})(jQuery);
