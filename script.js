// data structures involved:
// list - ["pneumonoultramicroscopicslicovolcanoconiosis"]

// dictionary - keeps data in key-value pairs
/*
    {
     "pneumonoultramicroscopicsilicovolcanoconiosis" : "lung disease caused by silica dust"
    }
*/




const database1 = [
    {
        question : "What does pneumonoultramicroscopicsilicovolcanoconiosis mean?",
        options : ["A heart disease caused by dust","A lung disease caused by silica dust", "A small volcano eruption", "A disease caused by metal dust"],
        answer : "A lung disease caused by silica dust"
    },

    {
        question : "What year was Minecraft officailly released?",
        options : ["2000","2009", "2011", "2010"],
        answer : "2011"
    },

    {
        question : "What does supercalifragilisticexpialidocious mean?",
        options : ["Very happy","Extremely good", "Good", "Extremely excited"],
        answer : "Extremely good"
    },

    {
        question : "What year was Roblox officailly released?",
        options : ["2006","2009", "2011", "2000"],
        answer : "2006"
    },

    {
        question : "What is the rarest minecraft mineral?",
        options : ["Ancient Debris","Diamond ore", "Deepslate emerald ore", "Deepslate coal ore"],
        answer : "Deepslate emerald ore"
    },

    {
        question : "Who is the creator of youtube?",
        options : ["Notch","Fusajiro Yamauchi", "David Baszuki and Erik Cassel", "Jawed Karim, Steve Chen and Chad Hurley"],
        answer : "Jawed Karim, Steve Chen and Chad Hurley"
    },
];

const DropDown = document.getElementById("drop-down");
const StartButton = document.getElementById("start-btn");
const TimerLabel = document.getElementById("timer-label");
const QuestionLabel = document.getElementById("question");
const OptionContainer = document.getElementById("option-container")
const ScoreLabel = document.getElementById("score-label");
const FeedbackLabel = document.getElementById("feedback-label"); 
const ProgressBar = document.getElementById("progress-bar-fill")   

const BgmSelector = document.getElementById("bgm-selector")
const MusicBtn = document.getElementById("music-btn")

let CurrentSong = null;
let IsMusicPlaying = false;
MusicBtn.textContent = "🔇Music Off"
 
// on bgm dropdown change
BgmSelector.addEventListener("change", () => {
    const SelectedSong = BgmSelector.value;

    // quit the function if the song cannot be found
    if(!SelectedSong) return;

    // stop and reset previous song if it's being played
    if(CurrentSong)
    {
        CurrentSong.pause();
        CurrentSong.currentTime = 0;
    }

     // loud and play the newly selected song
     CurrentSong = new Audio(SelectedSong);
     CurrentSong.loop = true;
     CurrentSong.volume = 0.2;
     CurrentSong.play()
     IsMusicPlaying = true;
     MusicBtn.textContent = "🔊 Music On"

});


MusicBtn.addEventListener("click", () =>  {
    if(IsMusicPlaying)
    {
        CurrentSong.pause();
        MusicBtn.textContent = "🔇Music Off"
        IsMusicPlaying = false;
    } else
    {
       CurrentSong.play()
     MusicBtn.textContent = "🔊 Music On" 
     IsMusicPlaying = true;
    }
});















StartButton.addEventListener('click', StartQuiz);

let timer;
let question_index = 0;
let score = 0;

function StartQuiz()
{
    DropDown.style.display = 'none';
    StartButton.style.display = 'none';
    LoadQuestion();
}

function LoadQuestion()
{
    if (question_index < database1.length)
    { 
        // reset the timer
        TimerLabel.textContent = 15;

        // clear feedback label text
        FeedbackLabel.textContent = "";

        // adjust progress bar's width
        ProgressBar.style.width = `${((question_index + 1) / database1.length) * 100}%`;

        // load a question fron the database
        const CurrentQuestionSet = database1[question_index];
        QuestionLabel.textContent = CurrentQuestionSet.question;

        // erase all previous option buttons
        OptionContainer.innerHTML = '';

        // create a button for each option associated to a question
        CurrentQuestionSet.options.forEach((item) => {
            const button = document.createElement('button');
            button.textContent = item;
            button.classList.add('option-btn');
            OptionContainer.appendChild(button);

            button.addEventListener('click', () => {
                DisableAllOptionButtons();
                CheckAnswer(item);
            });
                
        });



        // turn on timer 
        timer = setInterval(() => {
            // reduce timer text by 1
            TimerLabel.textContent = parseInt(TimerLabel.textContent) - 1;

            if(parseInt(TimerLabel.textContent) === 0)
            {
                clearInterval(timer); //to turn off the timer
                ShowFeedback(null);
            }
        }, 1000);
    } else
    {
        EndQuiz();
    }
}




function EndQuiz()
{
    clearInterval(timer);
    QuestionLabel.textContent = "good job!"
    OptionContainer.style.display = 'none';
    FeedbackLabel.style.display = 'none';
    TimerLabel.textContent = ' ⭐ ';
}


function DisableAllOptionButtons()
{
    // batch select all option buttons out there
    const all_option_buttons = document.querySelectorAll('.option-btn');

    all_option_buttons.forEach(button => {
        button.disabled = true;
    });
}



// 'item' refers to the player selected option
function CheckAnswer(item)
{
    const actual_ans = database1[question_index].answer;

    if(item === actual_ans)
    {
       score = score + 1;
    }

    ScoreLabel.textContent = `You scored ${score} points`;
    clearInterval(timer);
    ShowFeedback(item);

}

function ShowFeedback(item)
{
    const CurrentQuestionSet = database1[question_index];
    let message = "";

    if(item === CurrentQuestionSet.answer)
    {
        message = "You scored a point!"

    } else if (item === null)
    {
        message = "Too bad! Try again next time."
    } else 
    {
       message = ` Incorrect! The correct answer was ${CurrentQuestionSet.answer}.`;
    }

    FeedbackLabel.textContent = message + "Please wait 2 seconds thank you";
    FeedbackLabel.style.color = "rgb(0, 0, 0)";

    // hold for 2 seconds
    setTimeout(() => {
        question_index = question_index + 1;
        LoadQuestion();
    }, 2000);
}