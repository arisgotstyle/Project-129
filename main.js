song='';
leftWristX='';
leftWristY='';
rightWristX='';
rightWristY='';
scoreLeftWrist='';

function setup(){

    canvas=createCanvas(600,500);
    canvas.center()
    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modeloaded);
    poseNet.on('pose',gotPoses);
}

function modeloaded(){

    console.log('PoseNet is Initialized!');

}

function draw(){

    image(video,0,0,600,500);

    fill('#FF0000');
    stroke('#FF6347');

    if(scoreLeftWrist > 0.2) {

    circle(leftWristX,leftWristY,20);
    InNumberLeftWristY= Number(leftWristY);
    remove_decimals=floor(InNumberLeftWristY);
    volume=remove_decimals/500;
    document.getElementById('volume_button').innerHTML='Volume = '+volume;
    song.setVolume(volume);

    }
}

function preload(){

    song= loadSound('music.mp3');

}

function play(){

    song.play();
    song.setVolume(1);
    song.rate(1);

}

function gotPoses(results){

    if(results.length>0){

        console.log(results);
        scoreLeftWrist= results[0].pose.keypoints[9].score;
        console.log('scoreLeftWrist= ')+scoreLeftWrist;

        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        console.log('leftWristX= '+leftWristX+' leftWristY= '+leftWristY);


        rightWristX= results[0].pose.rightWrist.x;
        rightWristX= results[0].pose.rightWrist.y;
        console.log('rightWristX= '+rightWristX+' rightWristY= '+rightWristY);
    }

}