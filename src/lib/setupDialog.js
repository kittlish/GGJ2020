export default function setupDialog(scene){
    var drRColor = '#800000';
    var healdaColor = '#000066';

    var textContainer = scene.add.container(150, 250);
    var dialogueContainer = scene.add.container(50, 250);


    var mainText = configText(scene.add.text(0, 0, '', { align: 'center' }), textContainer, '#000', '#333333');
    var drRText = configText(scene.add.text(0, 20, '', { align: 'center' }), dialogueContainer, '#000', drRColor);
    var healdaText = configText(scene.add.text(0, 40, '', { align: 'center' }), dialogueContainer, '#000', healdaColor);

    //var winningText = configText(this.add.text(10, 10, 'Winner!'), textContainer, '#000', '#333333');

    var startingLine = 0;
    var myline;

    var lines = [
      { speaker: 'Dr. R', line: 'Hello-ho-ho-ho you, over there! Please, help me!' },
      { speaker: 'Healda', line: 'o.O ...' },
      { speaker: 'Dr. R', line: 'well?' },
      { speaker: 'Healda', line: 'bee boop' },
      { speaker: 'Dr. R', line: 'do you even understand me?' },
      { speaker: 'Healda', line: '[nods]' },
      { speaker: 'Dr. R', line: 'Oh you don\'t speak do you?' },
      { speaker: 'Dr. R', line: 'Well never mind that, you must help me!' },
      { speaker: 'Dr. R', line: 'That would be the nice thing to do...' },
      { speaker: 'Dr. R', line: '...and you wouldn\'t happen to be one of the naughty ones, would you?' },
      { speaker: 'Dr. R', line: 'You don’t seem the naughty type...' },
      { speaker: 'Healda', line: 'o.o' },
      { speaker: 'Dr. R', line: 'Anywho, my arch nemesis Dr. Blitzen von Vixen has stolen my formula for my medicine!' },
      { speaker: 'Dr. R', line: 'I am deathly ill and I need that cure!' },
      { speaker: 'Dr. R', line: 'Could you please explore this Omega Building and find the formula?' },
      { speaker: 'Dr. R', line: 'Also… there may or may not be evil  deadly robots lurking in here…' },

    ]

    var helloText = 'Welcome to our game!';

    callText(mainText, helloText);
    setTimeout(() => { callText(mainText, '') }, 2000);

    var currentTextObj;


    scene.input.keyboard.on('keydown_SPACE', (event) => {
      if(inRange(scene.player, scene.drRedNose)){
        if (startingLine > 0) {
          drRText.setText('');
          healdaText.setText('');
        }
  
        if (startingLine < lines.length) {
          myline = lines[startingLine];
          if (myline.speaker == 'Dr. R') {
            callText(drRText, myline.line);
          }
          if (myline.speaker == 'Healda') {
            callText(healdaText, myline.line);
          }
  
        }
        startingLine = (startingLine + 1) % (lines.length + 1);
      }else{
        drRText.setText('');
        healdaText.setText('');
      }
    });


}