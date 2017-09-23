/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//  var tweetData = {
// "user": {
//  "name": "Newton",
//  "avatars": {
//    "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//    "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//    "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//  },
//  "handle": "@SirIsaac"
// },
// "content": {
//  "text": "If I have seen further it is by standing on the shoulders of giants"
// },
// "created_at": 1461116232227
// }
//
// //
//


$(function() {

  $("form").submit(function(event) {
    event.preventDefault();

  if($('.tweet-entry-field').val() == "") {
      alert("Please enter a tweet. Please!")
      return
  }
  if ($('.tweet-entry-field').val().length > 140) {
      alert("Please enter 140 characters or less")
      return
  }

  $.ajax({
    type: "POST",
    url: "/tweets",
    data: $( this ).serialize(), //Get the string representation of the from
    // error(xhr, status, error) {
    //   alert(error);
    // },
    error: function (xhr, status, error) {
      alert(error);
    },
    success: function () {
      $('.tweet-entry-field').val('');
      loadTweets();

      // clear out the text box
      // reload all tweets
    }
    // success: success,
      // dataType: dataType
    });
  });

  function createTweetElement(data) {

    var $tweet = $("<article>").addClass('tweet');

    var $tweetHeader = $("<header>").addClass("tweet-header");
    var $userImg = $("<img>").addClass("user-image");
    var $tweetAuthor = $("<span>").addClass("author");
    var $authorHandle = $("<span>").addClass("handle");

    var $tweetText = $("<p>").addClass("tweet-text");

    var $tweetFooter = $("<footer>").addClass("tweet-footer");
    var $tweetTime = $("<span>").addClass("tweet-time");
    var $tweetOptions = $("<span>").addClass("tweet-options");

    $tweetAuthor.text(data.user.name);
    $authorHandle.html(data.user.handle);
    $userImg.attr("src", data.user.avatars.small)

    $tweetText.html(data.content.text)

    $tweetTime.html(data.created_at)

    $tweetHeader.append($userImg);
    $tweetHeader.append($tweetAuthor);
    $tweetHeader.append($authorHandle);

    $tweetFooter.append($tweetTime);
    $tweetFooter.append($tweetOptions);

    $tweet.append($tweetHeader);
    $tweet.append($tweetText);
    $tweet.append($tweetFooter);

    // $tweet.text('hello');



// Test / draiver code (temporary)
// console.log($tweet); // to see what it looks like
    return $tweet
  };

  function renderTweets(tweets) {
    var tweetcontainer = $("#alltweets")
    tweetcontainer.empty();
    tweets.forEach(function (tweetz) {
      tweetcontainer.prepend(createTweetElement(tweetz))
    })
    // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
  }

  // var data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
  //         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
  //         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
  //       },
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
  //         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
  //         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
  //       },
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   },
  //   {
  //     "user": {
  //       "name": "Johann von Goethe",
  //       "avatars": {
  //         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
  //         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
  //         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
  //       },
  //       "handle": "@johann49"
  //     },
  //     "content": {
  //       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
  //     },
  //     "created_at": 1461113796368
  //   }
  // ];

//below is shorthand version of a classical AJAX

  function loadTweets() {
    $.get('/tweets', function(data){
      renderTweets(data);
    });
  }

  loadTweets();

  // var $tweet = createTweetElement(tweetData);
  // var $tweet = createTweetElement()
  // $('#alltweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    // renderTweets(data)
});
