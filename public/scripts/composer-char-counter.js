$(document).ready(function() {
  $( "#typeBox" ).on("input", function() {
    let maxLength = 140;
    let textLength = $(this).val().length;
    let counter = $(this).parent().children(".counter");
    if (textLength <= maxLength) {
      $(counter).removeClass('error');
    } else {
      $(counter).addClass('error');
    }
    $(counter).text(maxLength - textLength);
  });

  $( "#typeBox[data-autosize]").on("input", function() {
    let offset = this.offsetHeight - this.clientHeight;
    const resizeTextArea = (text) => {
      $(text).css('height', this.scrollHeight + offset);
    }
    resizeTextArea(this);
  });
});