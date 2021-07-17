img = "";
status = "";
objects = [];
function preload(){
}
function gotResult(error, results) {
  if (error) {  
    console.log(error);
  }
  console.log(results);
  objects = results;
  
}
function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide();
  objectDetector =  ml5.objectDetector('cocossed', modelLoaded);
  document.getElementById("status").innerHTML = "STATUS : DETECTING OBJECTS";
}
function modelLoaded() {
console.log("Model Loaded!")
status = true;
objectDetector.detect(video, gotResult);
}
function draw() {
  image(video, 0, 0, 380, 380);
  if(status !="")
  {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++)
    {
      document.getElementById("status").innerHTML = "Status : OBJECT DETECTED";
      document.getElementById("number_of_objects").innerHTML = "NUMBER OF OBJECTS DETECTED ARE :"+objects.length;
      fill(r, g, b);
      percent = floor(objects[i].confidence * 100);
      text(objects[i].lable +""+ percent +"%", objects[i].x, objects[i].y);
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}