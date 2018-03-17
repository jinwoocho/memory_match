var firstCard = null;
var secondCard = null;
var firstCardBack;
var secondCardBack;
var clickAble = true;
var attemptCount = 0;
var gamePlayed = 0;
var matchCount = 0;
var accuracy = 0;

$(document).ready(function(){
    console.log("document ready");
    cards = $('.card').remove();
    random(cards);
    clickHandler();
});
function clickHandler(){
    $('.back').click(function () {
        if(clickAble) {
            flipTheCard(this);
        }
        //console.log("inside of doc ready click: ",this);
    });
    $('#resetButton').click(function(){
        random(cards);
        reset();
        values();
        // console.log('reset button is clicking', this);
    });
    $('#mixAgain').click(function(){
        random(cards);
    });
}
function flipTheCard(card_back){
    $(card_back).addClass('flip');
   // console.log("inside of clickhandler: " ,card_back);
    //console.log("this is working?");
    if (firstCard === null){
         firstCard = $(card_back).parent().find('.front img').attr('alt');
         firstCardBack = card_back;
      //  console.log("firstcardclicked: " + firstCard);
    } else if(secondCard === null) {
        secondCard = $(card_back).parent().find('.front img').attr('alt');
        secondCardBack = card_back;
       // console.log("scondcardclicked: " + secondCard);
        if (firstCard === secondCard) {
          //  console.log("matched");
            firstCard=null;
            secondCard=null;
            matchCount++;
            attemptCount++;
            $('.attempts').text(attemptCount);
            accuracy = Math.round((matchCount/attemptCount)*100);
            values();
        } else if ( firstCard !== secondCard) {
          //  console.log("not_matched");
            clickAble = false;
            timeset();
            firstCard=null;
            secondCard=null;
            attemptCount++;
            accuracy = Math.round((matchCount/attemptCount)*100);
            values();
        }
    }
}
function timeset() {
    setTimeout(function(){
        $(firstCardBack).removeClass("flip");
        $(secondCardBack).removeClass("flip");
        clickAble = true;
    }, 1000);
}
function reset(){
    //onclick resetting the game.
    $('.back').removeClass('flip');
    gamePlayed++;
    attemptCount = 0;
    accuracy = 0;
    matchCount = 0;
    //console.log(gamePlayed);
}

function values(){
    $('.attempts').text(attemptCount);
    $('.game_played').text(gamePlayed);
    $('.accuracy').text(accuracy+'%');
}
//카드 섞는거
function random(cardsarr) {
    for (var i = cardsarr.length -1; i >= 0; i--) {
        var mix = Math.floor(Math.random()*(i+1));
        var save = cardsarr[i];
        cardsarr[i] = cardsarr[mix];
        cardsarr[mix] = save;
    }
    $('#gameArea').append(cardsarr);
    $('.card').css('visibility','visible');
    //clickhandler();
}