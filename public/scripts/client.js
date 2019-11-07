/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary).
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(function() {
  const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
    for (const tweet of tweets) {
      $('.tweets-container').append(createTweetElement(tweet));
    }
  }
  
  const createTweetElement = (tweet) => {
    let $tweet = $('<article>').addClass('tweet');

    let tweetTime = new Date(tweet.created_at);
    const tweetMarkup = `
      <header>
        <img src="${tweet.user.avatars}">
        <h2 id="userName">${tweet.user.name}</h2>
        <div class="handle">${tweet.user.handle}</div>
      </header>
      <p>${tweet.content.text}</p>
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

  renderTweets(data);
});
