$('#start_anyang').click(function() {
    swal(
      'Good job!',
      'Start SOUNDVIEW.',
      'success'
    )
    $(this).toggle();
    $('#result_script').toggle();
    
    navigator.permissions.query({name:'microphone'}).then(function(result) {
        if (result.state == 'granted') {
            console.log("granted...");
            //good
        } else if (result.state == 'prompt') {
            console.log("prompt...");
            navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        } else if (result.state == 'denied') {
            console.log("denied...");
            // impossible
        }
        result.onchange = function() {
            console.log("microphon access done");
        };
    });
    start_soundview();
});
    
// SOUNDVIEW : customizing from anyang, sweetalert2, responsvevoice

function start_soundview() {
    if (annyang) {
        var IsNameFocus = false;
        var IsSubjectFocus = false;
        var IsContentFocus = false;
        var Current = '';
        var Previous = '';
        var commands = {
            'hello': function() {
                document.getElementById('result').innerHTML = "Hello";
                swal({
                  title: 'Nice to meet you. \nI am SOUNDVIEW bot.',
                  animation: false,
                  customClass: 'animated tada'
                })
                readHello();
            },
            'check': function() {
                if (IsNameFocus === true) {
                    document.getElementById('result').innerHTML = "Check Sender";
                    readName();
                }
                else if (IsSubjectFocus === true) {
                    document.getElementById('result').innerHTML = "Check Title";
                    readSubject();
                }
                else if (IsContentFocus === true) {
                    document.getElementById('result').innerHTML = "Check Content";
                    readContent();
                }
            },
            'move *qaz': function(qaz) {
                document.getElementById('result').innerHTML = qaz;
                console.log(qaz);
                if (qaz === 'sender') {
                    reachName();
                    $("#name").focus();
                    IsSubjectFocus = false;
                    IsContentFocus = false;
                    IsNameFocus = true;
                }
                else if (qaz === 'title') {
                    reachSubject();
                    $("#subject").focus();
                    IsSubjectFocus = true;
                    IsContentFocus = false;
                    IsNameFocus = false;
                }
                else if (qaz === 'content') {
                    reachContent();
                    $("#content").focus();
                    IsSubjectFocus = false;
                    IsContentFocus = true;
                    IsNameFocus = false;
                }
                else {
                    IsSubjectFocus = false;
                    IsContentFocus = false;
                    IsNameFocus = false;
                }
            },
            'typing *qaz': function(qaz) {
                document.getElementById('result').innerHTML = qaz;
                if (IsNameFocus === true) {
                    if (qaz === 'delete') {
                        $("#name").val('');
                        responseQAZ(qaz);
                    } else {
                        $("#name").val(qaz);
                        responseQAZ(qaz);
                    }
                }
                else if (IsSubjectFocus === true) {
                    if (qaz === 'delete') {
                        $("#subject").val('');
                        responseQAZ(qaz);
                    } else {
                        $("#subject").val(qaz);
                        responseQAZ(qaz);
                    }
                }
                else if (IsContentFocus === true) {
                    Current = $("#content").val();
                    if (qaz === 'delete') {
                        $("#content").val(Previous);
                        responseQAZ(qaz);
                    }
                    else if (qaz === 'clean') {
                        $("#content").val('');
                    }
                    else if (qaz === 'enter') {
                        $("#content").val(Current + ".\n");
                        responseQAZ(qaz);
                    }
                    else if (qaz === 'space') {
                        $("#content").val(Current + " ");
                        responseQAZ("space bar");
                    }
                    else {
                        Previous = $("#content").val();
                        $("#content").val(Current + " " + qaz);
                        responseQAZ(qaz);
                    }
                }
            },
            'delivery': function(qaz) {
                sendEmail(false);
            }
        };
        annyang.setLanguage("en-US");
        annyang.addCommands(commands);
        annyang.start();
    }
}

// TTS Part using Responsevoice API for element event(Non SOUNDVIEW) -------------------------------------

function TTS_speak(text, position) {
    
    if (text.toString() === '') {
        responsiveVoice.speak("empty input box, " + position.toString());
//        if (position.toString() === "보내는 사람") {
//            responsiveVoice.speak("빈 입력 박스, 보내는 사람", "Korean Female", "ko-KR");
//        } else if (position.toString() === "제목") {
//            responsiveVoice.speak("빈 입력 박스, 제목", "Korean Female", "ko-KR");
//        } else if (position.toString() === "내용") {
//            responsiveVoice.speak("빈 입력 박스, 내용", "Korean Female", "ko-KR");
//        }
    } else {
        if (position.toString() === 'e') {
            responsiveVoice.speak(text.toString());    
        } else {
            responsiveVoice.speak(position.toString() + "check, " + text.toString());    
        }
        
    }
}



// TTS Part using Responsevoice API for SOUNDVIEW -------------------------------------

function readHello() {
    responsiveVoice.speak("Nice to meet you. I am SOUNDVIEW bot.");
}

function reachName() {
    responsiveVoice.speak("Move to Sender input box");
}

function reachSubject() {
    responsiveVoice.speak("Move to Title input box");
}

function reachContent() {
    responsiveVoice.speak("Move to Content input box");
}

function readName() { 
    responsiveVoice.speak("Check sender, " + $('#name').val().toString());
}

function readSubject() {
    responsiveVoice.speak("Title sender, " + $('#subject').val().toString());      
}

function readContent() {
    responsiveVoice.speak("Content sender, " + $('#content').val().toString());      
}

function responseQAZ(qaz) {
    if (qaz === 'delete' ) {
        responsiveVoice.speak("delete complete");          
    } else if (qaz === 'enter') {
        responsiveVoice.speak("enter");          
    } else if (qaz === 'space') {
        responsiveVoice.speak("space bar");
    } else {
        responsiveVoice.speak("typing, " + qaz);          
    }
}


// Send Email -> Text file + SOUNDVIEW : Response to send Email -----------------

function sendEmail(Isfirst) {
    event.preventDefault();
    var _name = $('#name').val().toString();
    var _subject = $('#subject').val().toString();
    var _content = $('#content').val().toString();
    if (_name != '' && _subject != '' && _content != '') {
        var textToSave = 'Title :<br>' + _subject + '<br><br>-----------------<br><br>Content :<br>';
        for (var idx=0; idx<_content.length; idx++) {
            if (_content[idx] === '\n') {
                textToSave = textToSave + '<br>';
                continue;
            } else {
                textToSave = textToSave + _content[idx];
            }
        }
        var textToSaveAsBlob = new Blob([textToSave], {type:"text/html"});
        var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
        if (Isfirst) {
            var fileNameToSaveAs = $('#name').val() + '_exp1';
        } else {
            var fileNameToSaveAs = $('#name').val() + '_exp2';
        }
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToSaveAsURL;
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();
        responsiveVoice.speak("Your message has been successfully sent. Thank you.");         
    } else {
        if (_name === '') {
            responsiveVoice.speak("The sender's name is not entered.");             
        } else if (_subject === '') {
            responsiveVoice.speak("The title is not entered.");             
        } else if (_content === '') {
            responsiveVoice.speak("The mail's content is not entered.");             
        }
        return false;
    }
}
 
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}





