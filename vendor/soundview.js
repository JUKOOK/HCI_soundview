$('#start_anyang').click(function() {
    swal(
      'Good job!',
      'SOUNDVIEW 를 시작합니다.',
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
    console.log("안양 실행");
    if (annyang) {
        var IsNameFocus = false;
        var IsSubjectFocus = false;
        var IsContentFocus = false;
        var Current = '';
        var Previous = '';
        var commands = {
            '안녕': function() {
                document.getElementById('result').innerHTML = "안녕";
                swal({
                  title: '안녕하세요 저는 \nSOUNDVIEW 봇입니다.',
                  animation: false,
                  customClass: 'animated tada'
                })
                readHello();
            },
            '확인': function() {
                if (IsNameFocus === true) {
                    document.getElementById('result').innerHTML = "보내는 사람 확인";
                    readName();
                }
                else if (IsSubjectFocus === true) {
                    document.getElementById('result').innerHTML = "제목 확인";
                    readSubject();
                }
                else if (IsContentFocus === true) {
                    document.getElementById('result').innerHTML = "내용 확인";
                    readContent();
                }
            },
            '이동 *qaz': function(qaz) {
                document.getElementById('result').innerHTML = qaz;
                console.log(qaz);
                if (qaz === '보내는 사람') {
                    reachName();
                    $("#name").focus();
                    IsSubjectFocus = false;
                    IsContentFocus = false;
                    IsNameFocus = true;
                }
                else if (qaz === '제목') {
                    reachSubject();
                    $("#subject").focus();
                    IsSubjectFocus = true;
                    IsContentFocus = false;
                    IsNameFocus = false;
                }
                else if (qaz === '내용') {
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
            '입력 *qaz': function(qaz) {
                document.getElementById('result').innerHTML = qaz;
                if (IsNameFocus === true) {
                    if (qaz === '삭제' || qaz === '삭재') {
                        $("#name").val('');
                        responseQAZ(qaz);
                    } else {
                        $("#name").val(qaz);
                        responseQAZ(qaz);
                    }
                }
                else if (IsSubjectFocus === true) {
                    if (qaz === '삭제' || qaz === '삭재') {
                        $("#subject").val('');
                        responseQAZ(qaz);
                    } else {
                        $("#subject").val(qaz);
                        responseQAZ(qaz);
                    }
                }
                else if (IsContentFocus === true) {
                    Current = $("#content").val();
                    if (qaz === '삭제' || qaz === '삭재') {
                        $("#content").val(Previous);
                        responseQAZ(qaz);
                    }
                    else if (qaz === '초기화') {
                        $("#content").val('');
                    }
                    else if (qaz === '엔터' || qaz === '앤터') {
                        $("#content").val(Current + ".\n");
                        responseQAZ(qaz);
                    }
                    else if (qaz === '스페이스' || qaz === 'space' || qaz === '스패이스') {
                        $("#content").val(Current + " ");
                        responseQAZ("스페이스 바");
                    }
                    else {
                        Previous = $("#content").val();
                        $("#content").val(Current + " " + qaz);
                        responseQAZ(qaz);
                    }
                }
            },
            '전송': function(qaz) {
                sendEmail(false);
            }
        };
        annyang.setLanguage("ko");
        annyang.addCommands(commands);
        annyang.start();
    }
}

// TTS Part using Responsevoice API for element event(Non SOUNDVIEW) -------------------------------------

function TTS_speak(text, position) {
    
    if (text.toString() === '') {
        responsiveVoice.speak("빈 입력 박스, " + position.toString(), "Korean Female", "ko-KR");
//        if (position.toString() === "보내는 사람") {
//            responsiveVoice.speak("빈 입력 박스, 보내는 사람", "Korean Female", "ko-KR");
//        } else if (position.toString() === "제목") {
//            responsiveVoice.speak("빈 입력 박스, 제목", "Korean Female", "ko-KR");
//        } else if (position.toString() === "내용") {
//            responsiveVoice.speak("빈 입력 박스, 내용", "Korean Female", "ko-KR");
//        }
    } else {
        if (position.toString() === 'e') {
            responsiveVoice.speak(text.toString(), "Korean Female", "ko-KR");    
        } else {
            responsiveVoice.speak(position.toString() + "확인, " + text.toString(), "Korean Female", "ko-KR");    
        }
        
    }
}



// TTS Part using Responsevoice API for SOUNDVIEW -------------------------------------

function readHello() {
    responsiveVoice.speak("안녕하세요 저는 사운드뷰  봇 입니다.", "Korean Female", "ko-KR");
}

function reachName() {
    responsiveVoice.speak("보내는 사람 입력 박스로 이동합니다.", "Korean Female", "ko-KR");
}

function reachSubject() {
    responsiveVoice.speak("제목 입력 박스로 이동합니다.", "Korean Female", "ko-KR");
}

function reachContent() {
    responsiveVoice.speak("내용 입력 박스로 이동합니다.", "Korean Female", "ko-KR");
}

function readName() { 
    responsiveVoice.speak("보내는 사람 확인, " + $('#name').val().toString(), "Korean Female", "ko-KR");
}

function readSubject() {
    responsiveVoice.speak("제목 확인, " + $('#subject').val().toString(), "Korean Female", "ko-KR");      
}

function readContent() {
    responsiveVoice.speak("내용 확인, " + $('#content').val().toString(), "Korean Female", "ko-KR");      
}

function responseQAZ(qaz) {
    if (qaz === '삭제' ) {
        responsiveVoice.speak("삭제되었습니다.", "Korean Female", "ko-KR");          
    } else if (qaz === '엔터' || qaz === '앤터') {
        responsiveVoice.speak("엔터", "Korean Female", "ko-KR");          
    } else if (qaz === '스페이스' || qaz === 'space' || qaz === '스패이스') {
        responsiveVoice.speak("스페이스 바", "Korean Female", "ko-KR");
    } else {
        responsiveVoice.speak("입력, " + qaz, "Korean Female", "ko-KR");          
    }
}


// Send Email -> Text file + SOUNDVIEW : Response to send Email -----------------

function sendEmail(Isfirst) {
    event.preventDefault();
    var _name = $('#name').val().toString();
    var _subject = $('#subject').val().toString();
    var _content = $('#content').val().toString();
    if (_name != '' && _subject != '' && _content != '') {
        var textToSave = '제목 :<br>' + _subject + '<br><br>-----------------<br><br>내용 :<br>';
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
        responsiveVoice.speak("메일이 정상적으로 발송되었습니다. 수고하셨습니다. ", "Korean Female", "ko-KR");         
    } else {
        if (_name === '') {
            responsiveVoice.speak("보내는 사람의 이름이 입력되지 않았습니다. ", "Korean Female", "ko-KR");             
        } else if (_subject === '') {
            responsiveVoice.speak("메일의 제목이 입력되지 않았습니다. ", "Korean Female", "ko-KR");             
        } else if (_content === '') {
            responsiveVoice.speak("메일의 내용이 입력되지 않았습니다. ", "Korean Female", "ko-KR");             
        }
        return false;
    }
}
 
function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}





