HCI Project : SOUNDVIEW description

20111148 JUKOOK KIM

---------------------------------------------------------------

0. How to Visit the Exp(Practice) Site : link url -> https://jukook.github.io/HCI_soundview/soundview.html


1. Practice SOUNDVIEW : Click '사운드뷰 실행' button.


2. Execution Constraints : It should open in the Chrome browser and allow access to the microphone.


3. Commands (When SOUNDVIEW is running and Microphone access is enabled.)

    2-1. '안녕' : SOUNDVIEW bot greets to you. This is made for execution check.


    2-2. '이동 + alpha' : Move and focus.

        - alpha -

        2-2-1. '보내는 사람' : Move to position '보내는 사람' and focus input[text]

        2-2-2. '제목' : Move to position '제목' and focus input[text]

        2-2-3. '내용' : Move to position '내용' and focus input[textarea]


    2-3. '확인' : Reads the 'value' text of the currently focused item.(For '보내는 사람', '제목', '내용')


    2-4. '입력 + alpha' : Perform keyboard typing using STT.

        - alpha -

        2-4-1. '새로운 문장' : 'new input sentence' is appended to the current text.

        2-4-2. '삭제' : Delete the most recent 'input sentence'.

        2-4-3. '초기화' : All sentences are delete.

        2-4-4. '엔터' : Apply '.(dot) and enter key' typing to the current cursor.

	2-4-5. '스페이스' : Apply 'space bar key' typing to the current cursor.


    2.5. '전송' : If all the inputs of the form are complete, send an email.
	(Actually, It will download the form's input statement as an html file.)

