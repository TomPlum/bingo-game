var modal = document.getElementById('popup');
var span = document.getElementsByClassName("close")[0];
var crossoff = document.getElementsByClassName("span")[2];

function loadModalMatrix(selected) {
    var modal_canvas = document.getElementById("modal_canvas");
    var ctx = modal_canvas.getContext("2d");
    modal_canvas.style.border = "transparent";

    ctx.clearRect(0, 0, 1000, 900); //Clear matrix for re-rendering
    console.log("X: " + x + ", Y: " + y + ", R: " + r);
    for (var i = 1; i < 11; i++) {
        for (var j = 1; j < 11; j++) {
                ctx.save(); //saving and restoring so shadow only applies to selected elements
                if (number == selected && selection.includes(number) == true || selection.includes(number) == true) {
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
                } else {
                    ctx.fillStyle = "rgba(128, 128, 128, 0.2)";
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
                //Increment + 1 each time, then offset x-ordinate value
                number += 1;
                x += offset;
        } //end of inner for loop
        //reset the x-ordinate back to its starting poisiton and render 10 more balls, then offset y for the next line
        x = 50;
        y +=offset;
    } //end of outer for loop

    //reset everything for the game matrix.
    number = 1;
    x = 50;
    y = 50;
}

/*UNCOMMENT IF YOU WANT MODAL TO CLOSE WHEN YOU CLICK OUTSIDE OF IT
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
*/

function measureCursor(e) {
    var rect = modal_canvas.getBoundingClientRect(); //need to use canvas coords, not page now.
    modal_canvas_x = e.clientX - rect.left; //The seleced ordinates. Differ from pickback.js since not @ (0, 0)
    modal_canvas_y = e.clientY - rect.top;
    console.log(modal_canvas_x + ", " + modal_canvas_y); //For debugging
    checkSelection(modal_canvas_x, modal_canvas_y);
}

var selection = [];

function checkSelection(x, y) {
    var x0 = 10;
    var x1 = 90;
    var y0 = 10;
    var y1 = 90;
    var num = 1;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 10; j++) {
            if (x >= x0 && x <= x1 && y >= y0 && y <= y1) { //Has the number matched?
                if (selection.length == 9) { //Is the array full?
                    if (selection.includes(num)) { //Is the user trying to deselect a ball, while array is full?
                        var tempIndex = selection.indexOf(num);
                        selection.splice(tempIndex, 1);
                    } else { //Is the user trying to select a ball when the array is full?
                        alert("You can only select 9 balls maximum!\n\nIf you're happy with your selection, press continue.");
                    }
                } else { //The array is not full
                    if (selection.includes(num) == true) { //Does the array contain the selected ball?
                        var tempIndex = selection.indexOf(num);
                        selection.splice(tempIndex, 1);
                    } else { //The array does not contain the selected ball
                        selection.push(num);
                    }
                }
                loadModalMatrix(num);
                console.log("Selected: " + num + ", Array: " + selection);
            }
            num++;
            x0 += 100;
            x1 += 100;
        }
        x0 = 10;
        x1 = 90;
        y0 += 100;
        y1 += 100;
    }
    if (selection.length == 0) {
        document.getElementById('ball_selection').innerHTML = "Please pick your numbers below.";
    } else {
        document.getElementById('ball_selection').innerHTML = selection.toString();
    }
}

function modalContinue() {
    if (selection.length == 9) {
        modal.style.display = "none"; //sets the display css attribute to none to hide it
    } else {
        alert("Sorry! You need to pick " + (9 - selection.length) + " more number(s) to continue.");
    }
}

function crossFunction() {
    modal.style.display = "none";
    for (var i = 0; i < selection.length; i++) {
        selection.slice(i); //clears the array since they've closed the modal.
    }
}

var line1 = 0;
var line2 = 0;
var line3 = 0;
var lineFlag1 = false;
var lineFlag2 = false;
var lineFlag3 = false;
var fullHouse = false;

function bingoCard() {
    var number_card = document.getElementById('number-card');
    var ctx = number_card.getContext("2d");
    number_card.style.border = "black";
    var selectCount = 0;
    var x = 110; //changing from 50 for layout in canvas
    var y = 100;
    ctx.clearRect(0, 0, 500, 350);

    if (selection.length == 9) { //I.e. has the user selected the balls and clicked continue. else, dont render card.
        //Card Title
        ctx.font = "20px Verdana";
        ctx.fillStyle = "black";
        ctx.fillText("-- My Bingo Card --", 110, 50);

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var tempSelection = selection[selectCount];
                ctx.save(); //saving and restoring so shadow only applies to selected elements
                if (rand == tempSelection) {
                    ctx.fillStyle = "rgba(128, 128, 128, 0.2)"; //Dim the ball when matched
                    if (selectCount <= 2 && line1 <= 3) { //This checks if line 1, 2 or 3 is full.
                        line1++;
                    } else if (selectCount >= 3 && selectCount <= 5 && line2 <= 3) {
                        line2++;
                    } else if (selectCount >= 6 && selectCount <= 8 && line3 <= 3) {
                        line3++;
                    }
                } else if (bingoBalls.includes(tempSelection) == true) {
                    ctx.fillStyle = "rgba(128, 128, 128, 0.2)"; //Dim the ball when matched
                } else {
                    if (tempSelection < 11) {
                        ctx.fillStyle = "red";
                    } else if (tempSelection > 10 && tempSelection < 21) {
                        ctx.fillStyle = "orange";
                    } else if (tempSelection > 20 && tempSelection < 31) {
                        ctx.fillStyle = "yellow";
                    } else if (tempSelection > 30 && tempSelection < 41) {
                        ctx.fillStyle = "green";
                    } else if (tempSelection > 40 && tempSelection < 51) {
                        ctx.fillStyle = "blue";
                    } else if (tempSelection > 50 && tempSelection < 61) {
                        ctx.fillStyle = "indigo";
                    } else if (tempSelection > 60 && tempSelection < 71) {
                        ctx.fillStyle = "violet";
                    } else if (tempSelection > 70 && tempSelection < 81) {
                        ctx.fillStyle = "red";
                    } else if (tempSelection > 80 && tempSelection < 91) {
                        ctx.fillStyle = "orange";
                    }
                }
                ctx.beginPath();
                ctx.arc(x, y, r, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "black";
                ctx.shadowColor = "black";
                ctx.shadowBlur = 5;
                ctx.fill();
                ctx.stroke();
                ctx.restore(); //save and restore wrapped around inital arc element means shadow is applied only to this element

                //Small White Circle In The Middle
                if (rand == tempSelection) {
                    ctx.fillStyle = "rgba(128, 128, 128, 0.2)"; //Dim the ball when matched
                } else if (bingoBalls.includes(tempSelection) == true) {
                    ctx.fillStyle = "rgba(128, 128, 128, 0.2)"; //Dim the ball when matched
                } else {
                    ctx.fillStyle = "white";
                }
                ctx.beginPath();
                ctx.arc(x, y, r / 1.5, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();

                //Bigger White Outline Around Middle Circle
                ctx.fillStyle = "transparent";
                ctx.strokeStyle = "rgba(255, 255, 255, 1)";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(x, y, r / 1.3, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.stroke();
                ctx.fill();

                //The Number
                ctx.font = "20px Verdana";
                if (rand == tempSelection) {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; //Dim the ball when matched
                } else if (bingoBalls.includes(tempSelection) == true) {
                    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; //Dim the ball when matched
                } else {
                    ctx.fillStyle = "rgba(0, 0, 0, 1)";
                }

                if (tempSelection < 10) {
                    ctx.fillText(tempSelection, x - ctx.measureText(tempSelection).width / 2, y + ctx.measureText(tempSelection).width / 1.5);
                } else if (tempSelection > 9 && tempSelection < 100) {
                    ctx.fillText(tempSelection, x - ctx.measureText(tempSelection).width / 2, y + ctx.measureText(tempSelection).width / 3);
                } else {
                    ctx.fillText(tempSelection, x - ctx.measureText(tempSelection).width / 2, y + ctx.measureText(tempSelection).width / 4);
                }

                x += offset;
                selectCount++;

            } //end of inner for loop

            //reset the x-ordinate back to its starting poisiton and render 10 more balls, then offset y for the next line
            x = 110;
            y +=offset;

        } //end of outer for loop
        ctx.save();
        /*Horizonal Validation - Has the user matched 3 balls on a horizontal line*/
        if (line1 == 3 && lineFlag1 == false) {
            var line1X = 70;
            ctx.strokeStyle = "Black";
            ctx.lineWidth = 6;
            ctx.moveTo(70, 100);
            for (var i = 0; i < 28; i++) {
                setTimeout(function() {
                    ctx.lineTo(line1X, 100);
                    ctx.stroke();
                    line1X += 10;
                }, 20 * i);
            }
            lineFlag1 = true;
        } else if (line2 == 3 && lineFlag2 == false) {
            var line2X = 70;
            ctx.strokeStyle = "Black";
            ctx.lineWidth = 6;
            ctx.moveTo(70, 200);
            for (var i = 0; i < 28; i++) {
                setTimeout(function() {
                    ctx.lineTo(line2X, 200);
                    ctx.stroke();
                    line2X += 10;
                }, 20 * i);
            }
            lineFlag2 = true;
        } else if (line3 == 3 && lineFlag3 == false) {
            var line3X = 70;
            ctx.strokeStyle = "Black";
            ctx.lineWidth = 6;
            ctx.moveTo(70, 300);
            for (var i = 0; i < 28; i++) {
                setTimeout(function() {
                    ctx.lineTo(line3X, 300);
                    ctx.stroke();
                    line3X += 10;
                }, 20 * i);
            }
            lineFlag3 = true;
        }
        /*These if statements keep the line drawn after matching a whole line*/
        if (lineFlag1 == true) {
            ctx.strokeStyle = "Black";
            ctx.lineWidth = 6;
            ctx.moveTo(70, 100);
            ctx.lineTo(350, 100);
            ctx.stroke();
        }
        if (lineFlag2 == true) {
            ctx.strokeStyle = "Black";
            ctx.lineWidth = 6;
            ctx.moveTo(70, 200);
            ctx.lineTo(350, 200);
            ctx.stroke();
        }
        if (lineFlag3 == true) {
            ctx.strokeStyle = "Black";
            ctx.lineWidth = 6;
            ctx.moveTo(70, 300);
            ctx.lineTo(350, 300);
            ctx.stroke();
        }
        if (lineFlag1 == true && lineFlag2 == true && lineFlag3 == true && fullHouse == false) {
            alert("Full House! BINGO!");
            fullHouse = true;
        }
        ctx.restore();
        console.log("Flag1: " + lineFlag1 + ", Flag2: " + lineFlag2 + ", Flag3: " + lineFlag3+ "\n Line1: " + line1 + ", Line2: " + line2 + ", Line3: " + line3);
        //reset everything for the game matrix.
        number = 1;
        x = 50;
        y = 50;
    }
}

function generateRandomCard() {
    if (selection.length == 9) {
        alert("You've already rolled your numbers. Please press continue.");
    } else if (selection.length > 0 && selection.length < 9) {
        alert("Please un-select your chosen numbers to generate random ones.");
    } else {
        for (var i = 0; i < 9; i++) {
            var randCard = Math.floor(Math.random() * 90 + 1);
            //Checks if the rolled ball is in the array. If so, re-roll indefinitely until it's not.
            if (selection.includes(randCard) == true) {
                while (selection.includes(randCard) == true) {
                    randCard = Math.floor(Math.random() * 90 + 1)
                }
            }
            selection.push(randCard);
            document.getElementById('ball_selection').innerHTML = selection.toString();
        }
        loadModalMatrix(randCard);
    }
}
