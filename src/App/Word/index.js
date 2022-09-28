function Char(props) {
  return (
    <div style={{display: 'inline-block'}}>
      <div
        style={{display: 'table'}}
        className={`m-0.5 h-16 w-16 font-semibold text-4xl text-white border-2 border-gray-600 cursor-default ${props.color}`}
      >
        <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
          {props.char}
        </div>
      </div>
    </div>
  );
}

export default function Word(props) {
  const word = [];
  const green = 'bg-green-700'
  const yellow = 'bg-yellow-500';
  const colors = Array(props.squares).fill('');

  if (props.answer) {
    for (let i = 0; i < props.squares; i++) {
      if (props.answer[i] === props.word[i]) {
        colors[i] = green;
        continue;
      }

      // TODO: need to handle case where there are duplicate letters and onlly one of them are correct
      for (let j = 0; j < props.squares; j++) {
        if (i === j) {
          continue;
        }

        if (props.answer[i] === props.word[j] && !colors[j]) {
          colors[j] = yellow;
          break;
        }
      }
    }
  }

  for (let i = 0; i < props.squares; i++) {
    let char = i < props.word.length ? props.word[i] : '';
    word.push(<Char key={i} char={char} color={colors[i]} />);
  }

  return (
    <div style={{lineHeight: '0'}}>
      {word}
    </div>
  );
}
