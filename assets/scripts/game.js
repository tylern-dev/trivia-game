var questionTime = 10;
var timeRunning = false;
var questionTimedOut = false;
var intervalId;
var questionCount=0; 
var isAnswerCorrect;
var lastQuestion = false;
var hideQuestion = function(){$('#question-screen').addClass('hidden');}
var showQuestion = function(){$('#question-screen').removeClass('hidden');}
var hideAnswer = function(){$('#answer-screen').addClass('hidden');}
var showAnswer = function(){$('#answer-screen').removeClass('hidden');}


var questionArray = [
    {
        question: "What is Michael Scott's Middle Name?",
        answer: "Gary",
        answerList: ['Gary', 'A middle name was never mentioned', 'James', 'Michael'],
        wrongGifURL:'https://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif',
        rightGifURL:'https://media.giphy.com/media/MP1kygLQzjCve/giphy.gif'
    },
    {
        question: "Where does the show take place?",
        answer: 'Scranton, PA',
        answerList: ['Scranton, PA', 'Springfield, IL','Provo, UT','Pawnee, IN'],
        wrongGifURL: 'https://media.giphy.com/media/neoC4hLSwMPlu/giphy.gif',
        rightGifURL: 'https://media.giphy.com/media/wmvrrtSZ02lXi/giphy.gif' 
    },
    {
        question: "What does Dwight Schrute farm?",
        answer: 'Beets',
        answerList: ['Corn', 'Beets','Potatoes','Nothing'],
        wrongGifURL: 'https://media.giphy.com/media/neoC4hLSwMPlu/giphy.gif',
        rightGifURL: 'https://media.giphy.com/media/5DfqxlCj2wpfW/giphy.gif' 
    },
    {
        question: "What is the name of Pam and Jim's oldest child?",
        answer: 'Cecelia',
        answerList: ['Colette', 'Cecelia','Cece','Camille'],
        wrongGifURL: 'https://media.giphy.com/media/Yw8ybkgKnKC0E/giphy.gif',
        rightGifURL: 'https://media.giphy.com/media/13iGPnP5KvvuPS/giphy.gif' 
    },
    {
        question: "Where did Andy graduate from?",
        answer: 'Cornell University',
        answerList: ['Penn State', 'Columbia University','Northwestern University','Cornell University'],
        wrongGifURL: 'https://media.giphy.com/media/4A1am1JlzkJj2/giphy.gif',
        rightGifURL: 'https://media.giphy.com/media/8VrtCswiLDNnO/giphy.gif' 
    },

]


var scores = {
    correct:0,
    wrong:0,
    unanswered:0,
};


//////////////////////////////////
var gameTimer = {
    time:10,  

    restartTime: function(){
        gameTimer.time = 10;
    },
    start: function(){
        if(!timeRunning){
            gameTimer.time = 10;
            intervalID = setInterval(gameTimer.countDown, 1000);
            timeRunning = true;
        } 
    },
    stop: function(){
        clearInterval(intervalID);
        timeRunning = false;
    },
    countDown: function(){
        gameTimer.time--;
        $('#time-remaining').html(gameTimer.time);
        if (gameTimer.time === 0){
            
            gameTimer.stop();
            gameTimer.timedOut()
        }
    },
    timedOut: function(){
        outOfTime();
    }
}
////////////////////////////////////////////////////

function question(){
    gameTimer.start();
    $('.question-container').removeClass('hidden');

    //loops through question array and displays the question
    for(var i =0; i<questionArray.length; i++){
        if(questionCount === i){
            $('#question').html(questionArray[i].question);
        }
    }
    //loops through answers to dispaly them as buttons
    for (var i =0; i<questionArray[questionCount].answerList.length; i++){
        $('.question-screen').append('<button class="btn btn-primary btn-lg btn-block">'+questionArray[questionCount].answerList[i]+'</button>');
    }
    checkAnswer();
   

}

function checkAnswer(){
    $('button').on('click', function(event){
        var userSelect = event.currentTarget.innerHTML
        hideQuestion();
        showAnswer();
        
        if (userSelect === questionArray[questionCount].answer){
            isAnswerCorrect = true;
            gameTimer.stop();
            $('#header-title').html('Correct!')
            $('#right-wrong').html('The answer is: '+questionArray[questionCount].answer)
            $('.gif-image').attr('src', questionArray[questionCount].rightGifURL)
        }
        else{
            isAnswerCorrect = false;
            gameTimer.stop();
            $('#header-title').html('Wrong Answer!')
            $('#right-wrong').html('The answer is: '+questionArray[questionCount].answer)
            $('.gif-image').attr('src', questionArray[questionCount].wrongGifURL)
            
        }
        nextQuestion();
    });
}

//if the time runs out, this function is called
function outOfTime(){
    questionTimedOut = true;
    hideQuestion()
    showAnswer()
    $('#header-title').html('Out of Time!')
    $('#right-wrong').html('The answer is: '+questionArray[questionCount].answer)
    $('.gif-image').attr('src', questionArray[questionCount].rightGifURL) 
    nextQuestion();
}

//this function preps the next question. 
function nextQuestion(){
    setTimeout(function(){  
        questionCount++;
        //this if handles last question in array
        if(questionCount === questionArray.length){
            if(questionTimedOut){
                scores.unanswered++;
            } 
            else if (isAnswerCorrect){
                scores.correct++;
            } else {
                scores.wrong++;
            }
            gameTimer.stop();
            hideAnswer();
            $('button').remove();
            endGame();  
        }
        else{
            if(questionTimedOut){
                scores.unanswered++;
            } 
            else if (isAnswerCorrect){
                scores.correct++;
            } else {
                scores.wrong++;
            }
            hideAnswer();
            showQuestion();
            $('button').remove();
            init();
        }
       
    },1000*5);
}
//FINSIH THE END GAME
function endGame(){
    $('.container').append(
        '<div class="congrats">Game Over!'+
        '<div class="scores">You got '+scores.correct+' right!'+
        '<div class="scores">You got '+scores.wrong+' wrong! :('+
        '<div class="scores">You didn\'t guess on '+scores.unanswered+'!'
    );
    setTimeout(function(){
        $('.container').append(
            '<button id="play-again">Play Again?'+
            '<button id="quit">Quit'
        );
    
    $('button').on('click', function(event){
        var selection = event.currentTarget.id;
        
        if(selection === 'play-again'){
            newGame();
        } else{
            $('.container').empty();
            alert('Thanks for playing!')
        }
    })
    },1000*3)
    
}

function newGame(){
    questionCount = 0;
    scores.correct = 0;
    scores.unanswered = 0;
    scores.wrong = 0;
    $('.congrats').remove();
    $('.scores').remove();
    $('button').remove();
    showQuestion()
    question();

}


function init(){
    questionTimedOut = false;
    $('.time-remaining').html('10');
    question();
}

               

function start(){ 
    $('#start-game').on('click', function(event){
        $('.game-start-screen').addClass('hidden');
        question();
    });
}

start();