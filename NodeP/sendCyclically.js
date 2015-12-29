/**
 * Created by hanlu Feng on 12/8/2015.
 */
//read files

var fs = require('fs');
// greeter content and email list
var greeterContent        = fs.readFileSync('./emails/greeter.html','utf-8');
var greetersEmails = fs.readFileSync('./emails/greeter-team-list.txt','utf-8');


// ask members to remind their leaders to update info
var reminderEmailsContent        = fs.readFileSync('./emails/reminder for ministry team.html','utf-8');
var reminderEmails = fs.readFileSync('./emails/reminder-memember-team-list.txt','utf-8');

// setup team emails and content
var setUpEmailsContent        = fs.readFileSync('./emails/setup.html','utf-8');
var setUpEmails = fs.readFileSync('./emails/setup-emailist.txt','utf-8');


//Sunday school emails and content
var sundaySchoolContent        = fs.readFileSync('./emails/Sunday School.html','utf-8');
var sundaySchoolEmails = fs.readFileSync('./emails/sunday-school-list.txt','utf-8');

// Ask team leaders to update info
var updateScheduleContent        = fs.readFileSync('./emails/update of ministry team for team leader.html','utf-8');
var leaderEmails = fs.readFileSync('./emails/team-leader-list.txt','utf-8');

// Worship team content and info
var worshipContent        = fs.readFileSync('./emails/worship team.html','utf-8');
var worshipersEmails = fs.readFileSync('./emails/worship-team-list.txt','utf-8');





var nodemailer = require("./nodemailer/src/nodemailer");

// create reusable transporter object using SMTP transport



function sendEmail(sender,receivers,subjectInfo,textinfo,htmlInfo){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: '*****@gmail.com',
            pass: '***********'
        }
    });

    var mailOptions = {
        from: sender, // sender address
        to: receivers,
        subject: subjectInfo, // Subject line
        text: '', // plaintext body
        html: htmlInfo
    };

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });

    // close the pool in 5 minutes
    setInterval(function() {
        console.log("close");
        transporter.close();
        transporter.close();

    }, 1000*60*5);

}



var oneHour = 1000*3600; // one second = 1000 x 1 ms
 //Tuesday send email to team leaders, on Thursday send the other emails
setInterval(function() {
    console.log("Intervial");
    var time = getDate();
    var day = time[0];
    var hour = time[1];
    if(day == 4&& time ==2){
        // sendEmail
        sendEmail('Joe<jungyue@gmail.com>',leaderEmails,'Kind Reminder:Update of your team schedule','',updateScheduleContent);
    }
    else if(day ==2 && time ==2){
        sendEmail('Joe<jungyue@gmail.com>',greetersEmails,'Kind Reminder for Worship Team','',greeterContent);
        sendEmail('Joe<jungyue@gmail.com>',reminderEmails,'Weekly reminder for Ministry Team Schedule','',reminderEmailsContent);
        sendEmail('Joe<jungyue@gmail.com>',setUpEmails,'Kind Reminder For Set Up Team','',setUpEmailsContent);
        sendEmail('Joe<jungyue@gmail.com>',sundaySchoolEmails,'Kind Reminder For Sunday School Service','',sundaySchoolContent);
        sendEmail('Joe<jungyue@gmail.com>',worshipersEmails,'Kind Reminder For Sunday School Service','',worshipContent);


    }
}, oneHour);


function getDate(){
    var d = new Date(); // for now
    var weekday = d.getDay();
    //console.log(utc)

    var hour = d.getHours(); // => 9
    //console.log(hour)
    d.getMinutes(); // =>  30
    d.getSeconds(); // => 51
    var value =[weekday,hour];
    return value;
}

//var hanlu = fs.readFileSync('./emails/hanlu.txt','utf-8');
//var setUpEmailsContent        = fs.readFileSync('./emails/setup.html','utf-8');
//var tenMiutes = 1000*30;
//setInterval(function() {
//    console.log("Intervial");
//    var time = getDate();
//    var day = time[0];
//    var hour = time[1];
//    if(day == 2&& hour ==23){
//        // sendEmail
//        sendEmail('Joe<jungyue@gmail.com>',hanlu,'Kind Reminder:Setup Team','',setUpEmailsContent);
//    }
//
//}, tenMiutes);