function initmatrix() {
    var myCanvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext("2d");
    myCanvas.style.border = "transparent";

    var y_offset = setInterval(function() {x = 50; y +=offset;}, 200);

    for (var i = 1; i < 11; i++) {
        for (j = 1; j < 11; j++) {
            setTimeout(function() {
                ctx.save(); //saving and restoring so shadow only applies to selected elements
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
                ctx.fillStyle = "white";
                ctx.beginPath();
                ctx.arc(x, y, r / 1.5, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();

                //Bigger White Outline Around Middle Circle
                ctx.fillStyle = "transparent";
                ctx.strokeStyle = "rgba(255, 255, 255, 1)"
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(x, y, r / 1.3, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();

                //The Number
                ctx.font = "20px Verdana";
                ctx.fillStyle = "rgba(0, 0, 0, 1)";
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
            }, 180 * j);
        } //end of inner for loop
    } //end of outer for loop

    //The Grid
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgb(76, 76, 76)";
    ctx.beginPath();
    var x_ordinate = 0;
    var y_ordinate = 0;

    //Generate vertical lines
    for (var i = 0; i < 11; i++) {
        ctx.moveTo(x_ordinate, y_ordinate);
        ctx.lineTo(x_ordinate, y_ordinate + 900);
        x_ordinate += 100;
        ctx.stroke();
    }

    //Generate horizontal lines
    for (var i = 0; i < 10; i++) {
        ctx.moveTo(x_ordinate, y_ordinate);
        ctx.lineTo(x_ordinate - 1100, y_ordinate);
        y_ordinate += 100;
        ctx.stroke();
    }
}

var outerCircleRad = 24;
var strokeRad = 17;
var innerCircleRad = 18.5;
var fontSize = 5;
var endOfAnimation = false;

function animateCurrentBall() {
    var interval = setInterval(function() {
        ctx.clearRect(0, 0, 500, 500);
        initCurrentBall(randNum);
        outerCircleRad += (outerCircleRad * 0.05);
        strokeRad += (strokeRad * 0.05);
        innerCircleRad += (innerCircleRad * 0.05);
        fontSize += 2.5;
        //console.log(outerCircleRad);
    }, 35);

    var colourInterval = setInterval(function() {
        randNum = Math.floor(Math.random() * 5); //rand int 0, 1, 2, 3 or 4
        outerCircleColour = styles[randNum];
        randNum2 = Math.floor(Math.random() * 90 + 1); //Generate a new number as frequently as the colour changes
    }, 100);

    setTimeout(function() {
        clearInterval(interval); //Stop the growing of the bingo ball
        clearInterval(colourInterval); //stop the colours from changing

        //reset the ball and display with some text for added effect
        ctx.clearRect(0, 0, 500, 500);
        endOfAnimation = true; //boolean flag which affects an if statement in the initCurrentBall().
        randNum2 = "GO!";
        outerCircleRad = 240;
        strokeRad = 170;
        innerCircleRad = 185;
        fontSize = 130;
        initCurrentBall();
    }, 1785);

    ctx.clearRect(0, 0, 500, 500);
}

function initCurrentBall(randomColour) {
    var myCanvas2 = document.getElementById("myCanvas2");
    var ctx = myCanvas2.getContext("2d");
    myCanvas2.style.border = "transparent";

    //Big coloured background circle
    ctx.save();
    var outerCircleColour = ctx.fillStyle = styles[randomColour];
    ctx.beginPath();
    ctx.arc(myCanvas2.width / 2, myCanvas2.height / 2, outerCircleRad, 0, 2*Math.PI);
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
    ctx.arc(myCanvas2.width / 2, myCanvas2.height / 2, strokeRad, 0, 2*Math.PI);
    ctx.closePath();
    ctx.fill();

    //Inner white circle outline (Stroke)
    ctx.fillStyle = "transparent";
    ctx.strokeStyle = "white";
    ctx.lineWidth = "12";
    ctx.beginPath();
    ctx.arc(myCanvas2.width / 2, myCanvas2.height / 2, innerCircleRad, 0, 2*Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    //The Current number / Text
    ctx.save();
    ctx.font = fontSize + "px Verdana";
    ctx.fillStyle = "black";
    ctx.shadowColor = "black";
    ctx.shadowBlur = 5;
    if (endOfAnimation == false) {
        ctx.fillText(randNum2, ((myCanvas2.width / 2) - 5) - ctx.measureText(randNum).width, ((myCanvas2.height / 2) - 30) + ctx.measureText(randNum).width);
    } else {
        ctx.fillText(randNum2, ((myCanvas2.width / 2) - 40) - ctx.measureText(randNum).width, ((myCanvas2.height / 2) - 30) + ctx.measureText(randNum).width);
    }
    ctx.restore();
}
