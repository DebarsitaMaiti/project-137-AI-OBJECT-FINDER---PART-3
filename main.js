objects=[];
video="";
status="";

function preload(){
}

function setup(){
    webcam=createCapture(VIDEO);
    webcam.hide();
    webcam.size(480,380);

    canvas=createCanvas(480,380);
    canvas.center();
}

function draw(){
    image(webcam,0,0,480,380);

    if(status!=""){
        objectDetector.detect(webcam, gotResult);

        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of objects detected are: "+objects.length;
            
            percentage=floor(objects[i].confidence*100);
            fill("red");
            stroke("red");
            text(objects[i].label +" "+percentage+"%", objects[i].x +15, objects[i].y +15);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label==object_name){
                webcam.stop();
                objectDetector.detect(gotResult);
                
                document.getElementById("number_of_objects").innerHTML=object_name+" is Found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+"is found");
                synth.speek(utterThis);
            }
            else{
                document.getElementById("number_of_objects").innerHTML=object_name+" is not Found";
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function start(){
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="status: Detecting Objects";

    object_name=document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("Model is loaded");
    status=true;
}