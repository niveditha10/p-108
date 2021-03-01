
prediction_1="";
prediction_2="";
Webcam.set({
    width:300,
    height:300,
    image_format:'png',
    png_quality:100
});
camera=document.getElementById("camera");
Webcam.attach('#camera');

function take_image(){
Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML='<img  id="img_captured" src="'+data_uri+'">';
});
}

console.log("ml5_version",ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Su5w71ofB/model.json',modelLoaded);
function modelLoaded(){
    console.log("model loaded");
}
function speak(){
    var synth=window.speechSynthesis;
     speak_1="your first prediction is"+prediction_1;
     speak_2="your second prediction is"+prediction_2;
     var utterrence=new SpeechSynthesisUtterance(speak_1+speak_2);
     synth.speak(utterrence);
}

function predict_image(){
    img=document.getElementById("img_captured");
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name_1").innerHTML=results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();

        if(prediction_1=="happy"){
            document.getElementById("update_emoji_1").innerHTML="&#128522;";
        }
        
        if(prediction_1=="sad"){
            document.getElementById("update_emoji_1").innerHTML="&#128532s;";
        }
        
        if(prediction_1=="angry"){
            document.getElementById("update_emoji_2").innerHTML="&#128548;";
        }

        if(prediction_2=="happy"){
            document.getElementById("update_emoji_2").innerHTML="&#128522;";
        }
        
        if(prediction_2=="sad"){
            document.getElementById("update_emoji_2").innerHTML="&#128532s;";
        }
        
        if(prediction_2=="angry"){
            document.getElementById("update_emoji_2").innerHTML="&#128548;";
        }


    }
}

