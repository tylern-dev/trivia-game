// -------Pseudo Code--------
//questionTimer
//answerTimer
//questionTimeRunning = true/false

//scores
    // correctAnswer:
    // wrongAnswer:
    // unanswers:

//questionArray=[
//     {
//         question:
//         answer:
//         gifURL:
//         alerternateAnswers:[]


// ]


// start game
//     loop through questions
//         display question
//             start question timer
//             if correct answer
//                 start answer timer
//                 display correct screen 
//                 answer ++
//             if wrong answer
//                 start answer timer
//                 display wrong screen
//                 wrong ++
//             if time ends with no answer 
//                 start answer timer
//                 display out of time screen
//                 unanswered ++


var questionArray = [
    {
        question: "What is Michael Scott's Middle Name?",
        answer: "Gary",
        answerList: ["Gary", 'A middle name was never mentioned', 'James', 'Michael'],
        wrongGifURL:'https://media.giphy.com/media/12XMGIWtrHBl5e/giphy.gif',
        rightGifURL:'https://media.giphy.com/media/MP1kygLQzjCve/giphy.gif'
    },
    {
        question: "Where does the show take place?",
        answer: 'Scranton, OH',
        answerList: ['Scranton, OH', 'Springfield, IL','Provo, UT','Pawnee, IN'],
        gifURL: 'http://gph.is/Kql6Ul'
    },
]

var scores = [
    {
        correct:0,
        wrong:0,
        unanswered:0,
    }
];

var questionTime = 10;
var intervalId;
var questionCount=0; 
var isAnswerCorrect;


// ---------Timer functions-------------
function questionCountdown(){
    questionTime --;
    $('#time-remaining').html(questionTime);
    if(questionTime === 0){
        clearInterval(intervalId)
    }
}

function startQuestionTime(){
    intervalId = setInterval(questionCountdown, 1000);
}

function resetTime(){
    clearInterval(intervalId);
    
}
// ------------------------------------------



function question(){
    $('.question-container').removeClass('hidden');
  
    startQuestionTime();

    //displays the question. questionCount keeps track of what question to use
    $('#question').html(questionArray[questionCount].question); 

    //creates buttons for the list of possible answers
    for(var i = 0; i<questionArray[questionCount].answerList.length; i++){
        $('.question-screen').append('<button>'+questionArray[questionCount].answerList[i]+'</button>');
    }

    //calls nextQuestion() depending on what button was pressed. Hides #question-screen div to dispay the results
    $('button').on('click', function(event){
        var userSelect = event.currentTarget.innerHTML
        if (userSelect === questionArray[questionCount].answer){
            isAnswerCorrect = true;
            $('#question-screen').addClass('hidden');
            $('#correct-answer-screen').removeClass('hidden');
            $('#right-image').attr('src', questionArray[questionCount].rightGifURL)
            nextQuestion();
        } 
        else{
            isAnswerCorrect = false;
            $('#question-screen').addClass('hidden');
            $('#wrong-answer-screen').removeClass('hidden')
            $('#correct-answer').html(questionArray[questionCount].answer)
            $('#wrong-image').attr('src', questionArray[questionCount].wrongGifURL)
            nextQuestion();
        }
    });
}

//this function preps the next question. 
function nextQuestion(){
    setTimeout(function(){
        //increases questionCount so that the next question and answers will be populated
        questionCount++;

        //hides and shows specific divs depending on how the question was answered -- starts next question()
        if(isAnswerCorrect){
            $('#question-screen').removeClass('hidden');
            $('#correct-answer-screen').addClass('hidden');
            $('button').remove(); //need to remove old answer buttons
            question()
        } else{
            $('#question-screen').removeClass('hidden');
            $('#wrong-answer-screen').addClass('hidden');
            $('button').remove(); //need to remove old answer buttons
            question();
        }
        
    },1000*5);
}

//handles the beginning start button.
function start(){
    
    $('#start-game').on('click', function(event){
        $('.game-start-screen').addClass('hidden');
        question();
    });
    
}


start();



