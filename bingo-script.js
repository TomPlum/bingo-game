var x = 50;
var y = 50;
var r = 40;
var gap = r / 2;
var offset = 2 * r  + gap;
var number = 1;
var bingoBalls = new Array(90); //Instantiate new array to store rolled balls
var styles = ["red", "blue", "green", "yellow", "purple"]; //store colours 0 - 4
var styleNo = new Array(90); //Array to hold 90 rand numbers 0-4.
var nickname = ["Kelly's Eye", "One Little Duck", "Cup of Tea", "Knock at the Door", "Man Alive", "Half a Dozen", "Lucky", "Gardens Gate",
                "Doctor's Orders", "Theresa's Den", "Legs Eleven", "One Dozen", "Unlucky for Some", "The Lawnmower", "Young and Keen",
                "Never been kissed", "Dancing Queen", "Coming of Age", "Goodbye Teens", "One Score", "Key of the Door", "Two Little Ducks",
                "The Lord is my Shepherd", "Knock at the Door", "Duck and Dive", "Two & Six, Half a Crown", "Duck and a Crutch",
                "Two & Eight, In a State", "Rise and Shine", "Burlington Bertie", "Get up and Run", "Buckle my Shoe", "All the Threes",
                "Ask for More", "Jump and Jive", "Three Dozen", "More than Eleven", "Christmas Cake", "Steps", "Naughty Forty", "Time for Fun",
                "Winnie-the-Pooh", "Down on your Knees", "Droopy Drawers", "Halfway There", "Up to Tricks", "Four and Seven", "Four Dozen",
                "P.C.", "It's a Bullseye!", "Tweak of the Thumb", "Chicken Vindaloo", "Here comes Herbie", "Egg and Sausage", "Musty Hive",
                "Shotts Buss", "Heinz Varieties", "Make them wait", "The Brighton Line", "Grandma's Getting Frisky", "Baker's Bun",
                "Tickety-Boo", "Tickle Me", "Almost Retired", "Stop Work", "Clickety Click", "Made in Heaven", "Saving Grace",
                "Anyway up. Meal for Two.", "Three Score & Ten", "Bang on the Drum", "Danny La Rue", "Queen Bee",
                "Candy Store", "Strive & Strive", "Trombones", "Two Little Crutches", "39 More Steps", "One More Time", "Gandhi's Breakfast",
                "Fat Lady with a Walking Stick", "Straight on Through", "Stop Farting!", "Seven Dozen", "Stayling Alive",
                "Between the Sticks", "Torquay in Devon", "Two Fat Ladies", "Nearly there, almost there", "Top of the shop"];
var ballsRolled = 0;
var loadFlag = true;
var count = 0;

function renderMatrix(rand) {
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext("2d");
    myCanvas.style.border = "transparent";
    ctx.clearRect(0, 0, 1000, 900);

    for (var i = 0; i < 9; i++) {
        for (j = 0; j < 10; j++) {
            ctx.save(); //saving and restoring so shadow only applies to selected elements
            //Checks if ball number matches random number, also checks if it exists in array. Sets colour accordingly
            if (rand == number) { //Checks if rand number = ball number, if so, change to gray and reduce opacity.
                ctx.fillStyle = "rgba(128, 128, 128, 0.2)";
            } else if (bingoBalls.includes(number) == true) { //checks if ball already been called.
                ctx.fillStyle = "rgba(128, 128, 128, 0.2)";
            } else {
                if (number < 11) {
                    ctx.fillStyle = "red";
                } else if (number > 10 && number < 21) {
                    ctx.fillStyle = "orange";
                } else if (number > 20 && number < 31) {
                    ctx.fillStyle = "yellow";
                } else if (number > 30 && number < 41) {
                    ctx.fillStyle = "green";
                } else if (number > 40 && number < 51) {
                    ctx.fillStyle = "blue";
                } else if (number > 50 && number < 61) {
                    ctx.fillStyle = "indigo";
                } else if (number > 60 && number < 71) {
                    ctx.fillStyle = "violet";
                } else if (number > 70 && number < 81) {
                    ctx.fillStyle = "red";
                } else if (number > 80 && number < 91) {
                    ctx.fillStyle = "orange";
                }
                //ctx.fillStyle = styles[ styleNo[number - 1] ]; //UNCOMMENT FOR RANDOM COLOURS
                //ctx.fillStyle = "red";
            }
            /*
            if (loadFlag == true) { //Sets the ball colours on page load, the if statement above doesn't get executed on page load.
                ctx.fillStyle = styles[ styleNo[number - 1] ];
            }*/
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            ctx.shadowColor = "black";
            ctx.shadowBlur = 5;
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore(); //save and restore wrapped around inital arc element means shadow is applied only to this element

            //Small White Circle In The Middle
            if (rand == number) {
                ctx.fillStyle = "rgba(255, 255 ,255, 0.1)";
            } else if (bingoBalls.includes(number) == true) {
                ctx.fillStyle = "rgba(255, 255 ,255, 0.1)";
            } else {
                ctx.fillStyle = "white";
            }
            ctx.beginPath();
            ctx.arc(x, y, r / 1.5, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();

            //Bigger White Outline Around Middle Circle
            ctx.fillStyle = "transparent";
            /*
            if (rand == number) {
                ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            } else if (bingoBalls.includes(rand) == true) {
                ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            } else {
                ctx.strokeStyle = "rgba(255, 255, 255, 1)";
            }*/
            ctx.strokeStyle = "rgba(255, 255, 255, 1)"
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(x, y, r / 1.3, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();

            //The Number
            ctx.font = "20px Verdana";
            if (rand == number) {
                ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
            } else if (bingoBalls.includes(number) == true) {
                ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
            } else {
                ctx.fillStyle = "rgba(0, 0, 0, 1)";
            }
            //ctx.fillStyle = "black";
            if (number < 10) {
                ctx.fillText(number, x - ctx.measureText(number).width / 2, y + ctx.measureText(number).width / 1.5);
            } else if (number > 9 && number < 100) {
                ctx.fillText(number, x - ctx.measureText(number).width / 2, y + ctx.measureText(number).width / 3);
            } else {
                ctx.fillText(number, x - ctx.measureText(number).width / 2, y + ctx.measureText(number).width / 4);
            }

            document.getElementById("nickname").innerHTML = nickname[rand - 1];

            //Increment + 1 each time, then offset x-ordinate value
            number += 1;
            x += offset;
        } //end of inner for loop
    //reset the x-ordinate back to its starting poisiton and render 10 more balls, then offset y for the next line
    x = 50;
    y +=offset;
    } //end of outer for loop
} //end of renderMatrix

function renderCurrentBall() {
    var myCanvas2 = document.getElementById("myCanvas2");
    var ctx = myCanvas2.getContext("2d");
    myCanvas2.style.border = "transparent";
    ctx.clearRect(0, 0, 520, 520);

    //Big coloured background circle
    ctx.save();
    //ctx.fillStyle = styles[  styleNo[rand - 1] ]; //takes the colour of the respective ball on the matrix
    if (rand < 11) {
        ctx.fillStyle = "red";
    } else if (rand > 10 && rand < 21) {
        ctx.fillStyle = "orange";
    } else if (rand > 20 && rand < 31) {
        ctx.fillStyle = "yellow";
    } else if (rand > 30 && rand < 41) {
        ctx.fillStyle = "green";
    } else if (rand > 40 && rand < 51) {
        ctx.fillStyle = "blue";
    } else if (rand > 50 && rand < 61) {
        ctx.fillStyle = "indigo";
    } else if (rand > 60 && rand < 71) {
        ctx.fillStyle = "violet";
    } else if (rand > 70 && rand < 81) {
        ctx.fillStyle = "red";
    } else if (rand > 80 && rand < 91) {
        ctx.fillStyle = "orange";
    }
    ctx.beginPath();
    ctx.arc(myCanvas2.width / 2, myCanvas2.height / 2, 240, 0, 2*Math.PI);
    ctx.closePath();
    ctx.shadowColor = "black";
    ctx.shadowBlur = 5;
    ctx.lineWidth = "10";
    ctx.strokeStyle = "black";
    ctx.stroke();
    ctx.fill();
    ctx.restore();

    //Inner medium white circle
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(myCanvas2.width / 2, myCanvas2.height / 2, 170, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();

    //Inner white circle outline (Stroke)
    ctx.fillStyle = "transparent";
    ctx.strokeStyle = "white";
    ctx.lineWidth = "12";
    ctx.beginPath();
    ctx.arc(myCanvas2.width / 2, myCanvas2.height / 2, 185, 0, 2*Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    //The Current number
    ctx.save();
    ctx.font = "130px Verdana";
    ctx.fillStyle = "black";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 5;
    if (bingoBalls[0] < 10) {
        ctx.fillText(bingoBalls[0], (myCanvas2.width / 1.7) - ctx.measureText(number).width / 2, (myCanvas2.height / 2) + ctx.measureText(number).width / 3);
    } else if (bingoBalls[0] > 9 && bingoBalls[0] < 100) {
        ctx.fillText(bingoBalls[0], (myCanvas2.width / 2) - ctx.measureText(number).width / 2, (myCanvas2.height / 2) + ctx.measureText(number).width / 3);
    } else if (bingoBalls[0] == undefined) { //ensures the current ball is blank on page load.
        ctx.fillText("", myCanvas2.width / 2, myCanvas2.height / 2)
    } else {
        ctx.fillText(bingoBalls[0], (myCanvas2.width / 2) - ctx.measureText(number).width / 2, (myCanvas2.height / 2) + ctx.measureText(number).width / 4);
    }
    ctx.restore();
}

function genRand() {
    if (loadFlag == true) {
        initmatrix(); //on first click of 'Start' button, run the animated matrix render function
        animateCurrentBall(); //"      " same but for current ball
        loadFlag = false; //set this flag to false so that the next time the button is pressed, it generates balls

        //change the button text to Generate Ball after init click
        if (document.getElementById("start").innerHTML == "Start") {
            document.getElementById("start").innerHTML = "Generate Ball";
        }

        //Stops Welcome banner
        clearTimeout(welcome);
        ctx.clearRect(0, 0, 1750, 100);
        ctx.font = "30px Verdana";

        banner.width = 0;
        banner.height = 0;

        document.getElementById('nickname').innerHTML = ""; //set nickname to nothing on page load, instead of undefined.

        if (selection.length == 9) {
            bingoCard(); //loads the users chosen balls into the card
        }
    } else {
        //reset coords
        x, y = 50;
        number = 1;

        //generate rand number between 1 and 90
        rand = Math.floor(Math.random() * 90 + 1);

        //Checks if the rolled ball is in the array. If so, re-roll indefinitely until it's not.
        if (bingoBalls.includes(rand) == true) {
            while (bingoBalls.includes(rand) == true && count !== 90) {
                rand = Math.floor(Math.random() * 90 + 1)
            }
        }

        //The ball number is now unique, so push it into the array.
        bingoBalls.unshift(rand);

        //Re render the ball matrix and pass the next rolled ball number
        renderMatrix(rand);

        //For debugging purposes
        console.log(bingoBalls);

        //Outputs the array to a <p> attribute in the HTML body (Updates each time)
        var arrayString = "";
        for (var i = 0; i < 19; i++) {
            if (bingoBalls[i] == undefined) {
                i++;
            } else {
                arrayString += bingoBalls[i] + ", ";
            }
        }
        document.getElementById("arrayOutput").innerHTML = arrayString;

        //Counts Balls rolled
        ballsRolled++;
        document.getElementById("ballsRolled").innerHTML = ballsRolled;
        var ballsLeft = 90 - ballsRolled;
        document.getElementById("ballsLeft").innerHTML = ballsLeft;

        //Update Current Ball on Big Screen
        renderCurrentBall();

        //Checks if array is full, if so, alerts user end of game
        if (count == 90) {
            alert("Game Over. Press 'OK' to reload the board.\n" + "The balls rolled in order were: " + arrayString);
            endGameReset();
        } else {
            count++;
        }

        if (ballsRolled == 90) {
            document.getElementById("start").innerHTML = "End Game";
        }

        bingoCard(); //Re-render bingo card to check if your ball has been rolled.
    }

}
function renderBanner() {
    if (banner_x > banner.width) {
        var banner_length = ctx.measureText("Welcome to the Bolton University Bingo Game! Press 'Start'").width;
        banner_x = -banner_length;
    } else {
        ctx.clearRect(0, 0, 1900, 50);
        ctx.beginPath();
        ctx.font = "25px Verdana";
        ctx.fillText("Welcome to the Bolton University Bingo Game! Press 'Start'", banner_x, banner_y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }
}

function bannerAnimation() {
    renderBanner();
    banner_x += banner_dx;
}

function autoGameCountdown() {
    var c = document.getElementById('countdown');
    var time = 5;
    setInterval(function() {
        c.innerHTML = time;
        time--;
        if (time == -1) {
            c.innerHTML = "Roll";
            time = 5;
        }
    }, 1000);
}

function populateColourStyleArray() {
    for (i = 0; i < 90; i++) {
        var randColour = Math.floor(Math.random() * 5); //rand int 0, 1, 2, 3 or 4
        styleNo.unshift(randColour); //pushes number to start of array
    }
    console.log(styleNo); //logs array to console for debugging purposes
}

function init() {
    document.getElementById("ballsRolled").innerHTML = ballsRolled; //Set balls rolled to 0 on page load
    var ballsLeft = 90 - ballsRolled; //set ballsleft on page load to 0
    document.getElementById("ballsLeft").innerHTML = ballsLeft; //set balls left to 0 on page load
    document.getElementById("start").innerHTML = "Start";
    rand = 0;

    //For Banner Animation
    var banner = document.getElementById("banner");
    ctx = banner.getContext("2d");

    //setting banner attributes
    banner_x = 10;
    banner_y = (banner.height / 2) + 9;
    banner_dx = 1;

    //Runs banner increment every 20 milliseconds
    welcome = setInterval("bannerAnimation()", 3.5);
}

function autoPlay() {
    if (loadFlag == true) {
        alert("Please press 'Start' to load the ball matrix before you auto-roll.")
    } else {
        genRand(); //Run once straight away
        autoGameCountdown();
        setInterval(function() {
            genRand();
        }, 5000); //Then roll ball every 5 seconds
    }
}
/*----------------------------------------------DATE/TIME FUNCTIONS--------------------------------------*/
function convertDay(x) {
    var dayNames = new Array("Sunday", "Monday", "Tuesday", "Wednesday",
                            "Thursday", "Friday", "Saturday");
    return dayNames[x];
}

function convertMonth(y) {
    var monthNames = new Array("January", "February", "March", "April",
                                "May", "June", "July", "August", "September",
                                 "October", "November", "December");
    return monthNames[y];
}

// This function is invoked automatically every 1 second (1000 milliseconds)
function displayTime(){
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();

    var day = now.getDay(); //0-7
    var dayName = convertDay(day); //Sun - Sat

    var date = now.getDate(); //1 - 31

    var month = now.getMonth(); //0-11
    var monthName = convertMonth(month);//Jan-Dec

    var year = now.getFullYear(); //YYYY

    var dateString = dayName;
    dateString += " " + date;
    if (date > 3 && date < 21) {
        dateString += "th";
    } else {
        switch (month % 10) {
        case 1:
            dateString += "st";
        case 2:
            dateString += "nd";
        case 3:
            dateString += "rd";
        default:
            dateString += "th";
        }
    }
    dateString += " " + monthName;
    dateString += " " + year + " ";
    dateString += " - ";
    dateString += " " + hours > 12 ? hours - 12 : hours;
    dateString += minutes < 10 ? ":0" : ":";
    dateString += minutes;
    dateString += seconds < 10 ? ":0" : ":";
    dateString += seconds + " ";
    dateString += " " + hours > 12 ? "PM" : "AM";
    document.getElementById("date").innerHTML = dateString;
}
/*----------------------------------------END OF DATE/TIME FUNCTIONS-----------------------------------*/
function clearCanvas() {
    if (loadFlag == true) {
        alert("You can't reset the game, it hasn't even begun yet!\n\n Press 'Start' below to begin.");
    } else {
        var c = confirm("Are you sure you want to reset? \nYou will lose your current game progress."); //Double checks with user
        if (c == true) {
            x, y = 50;
            number = 1;
            bingoBalls = new Array(90); //re-instantiate array in order to clear rolled balls
            ballsRolled = 0; //reset balls rolled
            document.getElementById("ballsRolled").innerHTML = ballsRolled; //reset the balls rolled output text
            var ballsLeft = 90 - ballsRolled; //reset balls left
            document.getElementById("ballsLeft").innerHTML = ballsLeft; //reset balls left output text
            document.getElementById("arrayOutput").innerHTML = "Your ball numbers will appear here."; //reset arrayString output
            document.getElementById("nickname").innerHTML = ""; //set nickname to nothing on page load, instead of undefined.
            document.getElementById("start").innerHTML = "Start"; //resets Generate Ball button back to Start
            //renderMatrix(0); //re-render matrix and pass 0 in as rand, this will not match array or number and load fresh balls
            renderCurrentBall(); //re-renders current ball canvas in order to clear it
            count = 0; //reset the count variable
        } else {
            event.preventDefault(); //If user select 'cancel' or crosses off the alert window, their game will continue
        }
    }
}

function endGameReset() {
    x = 50;
    clearInterval(y_offset); //stop it from increasing indefinitely
    y = 50;
    r = 40;
    offset = 2 * r + gap;
    number = 1;
    bingoBalls = new Array(90); //re-instantiate array in order to clear rolled balls
    ballsRolled = 0; //reset balls rolled
    document.getElementById("ballsRolled").innerHTML = ballsRolled; //reset the balls rolled output text
    var ballsLeft = 90 - ballsRolled; //reset balls left
    document.getElementById("ballsLeft").innerHTML = ballsLeft; //reset balls left output text
    document.getElementById("arrayOutput").innerHTML = "Your ball numbers will appear here."; //reset arrayString output
    document.getElementById("nickname").innerHTML = ""; //set nickname to nothing on page load, instead of undefined.
    document.getElementById("start").innerHTML = "Start"; //resets Generate Ball button back to Start
    renderMatrix(0); //re-render matrix and pass 0 in as rand, this will not match array or number and load fresh balls
    renderCurrentBall(); //re-renders current ball canvas in order to clear it
    count = 0; //reset the count variable
    modal.style.display = "block"; //load the modal again
    document.getElementById('ball_selection').innerHTML = "Please pick your numbers below."; //reset this string
}
