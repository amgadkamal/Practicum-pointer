//this is the source for the most of the code,https://github.com/victordibia/handtrack.js/
//this link helped me https://www.w3schools.com/graphics/game_controllers.asp
const video = document.getElementById("myvideo");
video.width=300;
video.height=300
const handimg = document.getElementById("handimage");
const canvas2 = document.getElementById("canvas");
const canvas = document.getElementById("canvas2");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let nextImageButton = document.getElementById("nextimagebutton");
let updateNote = document.getElementById("updatenote");
let image=document.getElementById("img")

function startGame() {
    window.scrollTo(0,0);
    mybutton = new component(100, 100, "blue", 600, 600);
    Pointer = new component(10, 10, "red", 150, 150);
    area.start();
}

var area = {//area for pointer
    canvas : document.getElementById("canvas"),
    start : function() {
        this.canvas.width = 300;
        this.canvas.height = 300;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);}}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = area.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#6f2da8";
        ctx.fillRect(0, 0, 50, 50)}
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;}}

function updateGameArea() {//update the area with spped and new position
    area.clear();
    Pointer.newPos();
    mybutton.newPos();
    Pointer.update();
    Pointer.speedX=0;
    Pointer.speedY=0;}

let imgindex = 1
let isVideo = false;
let model = null;
const modelParams = {
    flipHorizontal: true,   // flip e.g for video  
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.8,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold for predictions.
}

function startVideo() {//start video function for detection
    handTrack.startVideo(video).then(function (status) {
        console.log("video started", status);
        if (status) {
            updateNote.innerText = "move your hand left or right"
            isVideo = true
            runDetection()
        } else {
            updateNote.innerText = "Please enable video"}});}

function toggleVideo() {
    if (!isVideo) {
        updateNote.innerText = "Starting video"
        startVideo();
    } else {
        updateNote.innerText = "Stopping video"
        handTrack.stopVideo(video)
        isVideo = false;
        updateNote.innerText = "Video stopped"}}

trackButton.addEventListener("click", function(){
    toggleVideo();});


async function runDetection (){
    model.detect(video).then(predictions => {
    model.renderPredictions(predictions, canvas, context, video);
        if (isVideo) {requestAnimationFrame(runDetection);
        if (predictions[0]) {
            let midval = predictions[0].bbox[0] 
            let midval2 = predictions[0].bbox[1] 
            if((Pointer.x< 50 && Pointer.x > 0)&&(Pointer.y< 50 && Pointer.y > 0))
                
            {      
            //I commented the next part because it makes the browser not responding with timeout. if I used "await sleep" here I got an error although the function is async.    
            //while (i<4)
            //{
            //function counter() {i=i+1;}    
            //setTimeout(counter, 3000);    
            // if ((Pointer.x> 50 && Pointer.x < 0)&&(Pointer.y> 50 && P.y < 0)){
                 
              //   break;
            // }
             //if (i==3){
                 image.src="yellow.png"
             //}}
                     }
          
           Pointer.x=midval;//the pointer follows the hand x and y position
           Pointer.y=midval2;}}});}


// Load the model.
handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel
    updateNote.innerText = "Loaded Model!"   
    trackButton.disabled = false});
