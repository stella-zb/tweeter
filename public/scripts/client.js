/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  // // change navbar when scrolling
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {
      $("nav").addClass("scrolled");
    } else {
      $("nav").removeClass("scrolled");
    }
  });

  $(".tweet-button").click(function() {
    $(".new-tweet").slideToggle();
    $("#typeBox").focus();
  });

  // function handle the sumbit request from html
  $("#submitForm").submit(function(event) {
    event.preventDefault();
    
    const inputLength = $("#typeBox").val().length;
    if (inputLength === 0) {
      return alert("Yoo, you need to type something!");
    }
    if (inputLength > 140) { 
      return alert("Opp, too much characters");
    }

    // post data to server
    $.ajax({ 
      data: $("#submitForm").serialize(),
      method: "POST",
      url: "/tweets",
      dataType: "json"
    })
    .then(function(input) {
      $(".tweets-container").prepend(createTweetElement(input));
    })
    .fail(function(err) {
      alert( `error: ${err.status}`);
    });
  
  });
  
  // function load the posts from server
  const loadtweets = () => {
    // get data from server
    $.ajax({
      url: "/tweets",
      method: "GET",
    })
    .then(function(tweets) {
      renderTweets(tweets)
    });
  }

  loadtweets();

  // function loop through tweets, callback createTweetElement function
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      $(".tweets-container").prepend(createTweetElement(tweet));
    }
  }
  
  // function generate HTML template for tweet object
  const createTweetElement = (tweet) => {
    const escape =  function(str) {
      const div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    }

    const $tweet = $("<article>").addClass("tweet");
    
    const tweetTime = new Date(tweet.created_at);
    const tweetMarkup = `
      <header>
        <img src="${tweet.user.avatars}">
        <h2 id="userName">${tweet.user.name}</h2>
        <div class="handle">${tweet.user.handle}</div>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer>
        <p>${tweetTime.toLocaleString()}</p>
        <div id="icons">
          <i class="material-icons">flag</i>
          <i class="material-icons">repeat</i>
          <i class="material-icons">favorite</i>
        <div>
      </footer>
    `;
    $tweet.append(tweetMarkup)

    return $tweet;
  }

});
