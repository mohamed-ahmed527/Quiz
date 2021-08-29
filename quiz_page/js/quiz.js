/************* Question number *************/
let val = parseInt(document.getElementById("btn-num").value);
function btn_plus(){
  val++ ;
  document.getElementById("btn-num").innerText = "Q:" + val ;
};
function btn_minus(){
  val-- ;
  document.getElementById("btn-num").innerText = "Q:" +val ;
};
/**********************************/
// Variables
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const myQuestions = [
  {
    question: "Who invented JavaScript?",
    answers: {
      a: "Douglas Crockford",
      b: "Sheryl Sandberg",
      c: "Brendan Eich"
    },
    correctAnswer: "c"
  },
  {
    question: "JavaScript is ..... language?",
    answers: {
      a: "scripting",
      b: "programming",
      c: "application"
    },
    correctAnswer: "a"
  }
  ,{
    question: "Which one of these is a JavaScript package manager?",
    answers: {
      a: "Node.js",
      b: "TypeScript",
      c: "npm"
    },
    correctAnswer: "c"
  },
  {
    question: "the script Tag must be placed in?",
    answers: {
      a: "head",
      b: "head and body",
      c: "title and head"
    },
    correctAnswer: "b"
  }
  ,
  {
    question: "Javascript was invented at.....lap ?",
    answers: {
      a: "Google lap",
      b: "sun microsoft",
      c: "Netscape"
    },
    correctAnswer: "c"
  }
  ,
  {
    question: "Which tool can you use to ensure code quality?",
    answers: {
      a: "Angular",
      b: "jQuery",
      c: "RequireJS",
      d: "ESLint"
    },
    correctAnswer: "d"
  }
];
/****Random displaying of questions ******/
function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = 
    [array[randomIndex], array[currentIndex]];
  }
  return array;
}
shuffle(myQuestions);
/********* build quiz ********/
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];

      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;

      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {

        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });

      // show number of correct answers out of total
      const myResult=
      `<div  class="slide active-slide" >
        <p id="correctQ">Number of correct questions: <span> ${numCorrect} </span> </p>
        <p id="allQ">Number of all questions: ${myQuestions.length} </p>
        <p id="fr"> The Result : ${numCorrect} out of ${myQuestions.length}</p>
      </div>`;
      
   if ( myQuestions.length >= slides.length  ){
    console.log("getting myresult");
    quizContainer.innerHTML+=myResult;
    document.querySelector(".active-slide").classList.remove("active-slide");
    slides=document.querySelectorAll(".slide") ||document.querySelector(".active-slide") ;
    document.querySelector("#mark-list").style.display="none";
    document.querySelector(".btns-group").style.display="none";
    document.querySelector(".quiz-content").style.width = "100%"; 
    currentSlide=5;
    showNextSlide();
   }
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      };
    }

    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
    /*******************start of mark **************/
    function markElement(){
      showSlide(currentSlide);

      let selected_q = document.querySelector(".active-slide .question").textContent ;
      let num = document.createElement("span");
      let ele = document.createElement("p");

      let num_val = document.createTextNode( "Q "+ val + " : ");
      let ele_text = document.createTextNode( selected_q );

      num.appendChild(num_val);
      ele.appendChild(num);
      ele.appendChild(ele_text);
      
      document.getElementById("mark-list").appendChild(ele);
      console.log( selected_q );

      /****** start of delete ele from marked list ******/
      function deleteElement() {
        this.style.display = 'none';
      };
      ele.style.cursor = 'pointer';
      ele.addEventListener("click", deleteElement);
      /****** end of delete ele from marked list *****/
    };
    let mark_btn = document.getElementById("mark");
    mark_btn.addEventListener("click",markElement);
    /******************* end of mark function **************/

    // Kick things off
    buildQuiz();

    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    let slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);

    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);

    /**********time function********/
    function intBarCount(){
      var  divTimeLeft = document.getElementById("divTimeLeft");
      var divCountdownBar = document.getElementById("divCountdownBar");
      var startTimer = setInterval(barCount,12);
      function barCount(){
        if (divTimeLeft.clientWidth < divCountdownBar.clientWidth){
          const width=divTimeLeft.style.width;
          const new_width=Number(width.substring(0,width.length-2))+1;
          
          divTimeLeft.style.width = `${new_width}px`;
        }
        else{
          divTimeLeft.style.width = divCountdownBar.clientWidth + "px";
          clearInterval(startTimer);
        }
      }
    };
    setTimeout(showResults,18600);
