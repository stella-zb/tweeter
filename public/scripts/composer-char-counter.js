$(document).ready(function() {
  $( "#typeBox" ).on("input", function() {
    const maxLength = 140;
    const textLength = $(this).val().length;
    const counter = $(this).parent().children(".counter");
    if (textLength <= maxLength) {
      $(counter).removeClass('error');
    } else {
      $(counter).addClass('error');
    }
    $(counter).text(maxLength - textLength);
  });

  $( "#typeBox[data-autosize]").on("input", function() {
    const offset = this.offsetHeight - this.clientHeight;
    const resizeTextArea = (text) => {
      $(text).css('height', this.scrollHeight + offset);
    }
    resizeTextArea(this);
  });
});