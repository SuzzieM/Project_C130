Bloody_Mary_song ="";
Harry_potter_theme_song ="";

rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;

scoreleftWrist = 0;
scorerightWrist = 0;

song_Bloody_Mary_status = "";
song_Harry_potter_theme_status = "";

function setup()
{
    canvas = createCanvas(600, 530);
    canvas.center();
    canvas.position(300, 225);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet is Intialized and Loaded!!");
}

function preload()
{
    Bloody_Mary_song = loadSound("Bloody_Mary_Song.mp3");
    Harry_potter_theme_song = loadSound("music.mp3");
}

function draw()
{
    image(video,0,0,600,530);

    fill("#FF8A65");
    stroke("#BF360C");

    song_Bloody_Mary_status = Bloody_Mary_song.isPlaying();
    console.log("Bloody_Mary_song");

    song_Harry_potter_theme_status = Harry_potter_theme_song.isPlaying();
    console.log("Harry_potter_theme_song");

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        Bloody_Mary_song.stop();
        if(song_Harry_potter_theme_status == false){
           Bloody_Mary_song.play();

           console.log("Song Name: Bloody Mary Song");
           document.getElementById("song_id").innerHTML = "Song Name: Bloody Mary Song";
        }

    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        Harry_potter_theme_song.stop();
        if(song_Bloody_Mary_status == false){
            Harry_potter_theme_song.play();

            console.log("Song Name: Harry Potter Theme Song");
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
        }
    }
}

function play()
{
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}

function stop()
{
    if(song_Bloody_Mary_status == true)
    {
        Bloody_Mary_song.stop();
    }
    if(song_Harry_Potter_theme_status == true)
    {
        Harry_potter_theme_song.stop();
    }
}

function pause()
{
    if(song_Bloody_Mary_status == true)
    {
        Bloody_Mary_song.pause();
    }
    if(song_Harry_Potter_theme_status == true)
    {
        Harry_potter_theme_song.pause();
    }
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}