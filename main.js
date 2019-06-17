let canvas;
let canvasContext;
var ballX = 50;
var ballSpeedX = 5;
var ballY = 50;
var ballSpeedY = 4;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

function calculateMousePos (e){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = e.clientX - rect.left - root.scrollLeft;
    var mouseY = e.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}


window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    var framesPerSecond = 30;
    setInterval(callBoth, 1000/framesPerSecond);;

    canvas.addEventListener('mousemove',
    function(e){
        var mousePos = calculateMousePos(e);
        paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
    });
}

function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
};

function moveEverything () {
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    if (ballX > canvas.width) {
            //ballSpeedX = -ballSpeedX;
            if(ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
                ballSpeedX = -ballSpeedX;
            } else {
                ballReset();
            }
    }
    if (ballX < 0) {
        //ballSpeedX = -ballSpeedX;
        if(ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
        }
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
}

function callBoth () {
    moveEverything();
    drawEverything();
}

function drawEverything() {

    // next line blanks out the screen with black
    colorRect(0,0,canvas.width,canvas.height,'black');

    // next line is for left player paddle
    colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT, 'white');

    // next line is for right computer paddle
    colorRect(canvas.width-10,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT, 'white');

    // next line is for ball
    colorCircle(ballX, ballY, 10,'red');
}

function colorRect (leftX,topY,width,height,drawColor){
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width,height);
}

function colorCircle (centerX, centerY, radius, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, 10,0, Math.PI*2, true)
    canvasContext.fill();
}