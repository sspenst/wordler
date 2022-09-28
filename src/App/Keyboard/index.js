import Key from "../Key";
import WideKey from "../WideKey";

function getBgColorClass(props, char) {
  if (props.greenKeys.has(char)) {
    return 'bg-green-700';
  } else if (props.yellowKeys.has(char)) {
    return 'bg-yellow-500';
  } else if (props.blackKeys.has(char)) {
    return 'bg-neutral-800';
  } else {
    return 'bg-neutral-600';
  }
}

export default function Keyboard(props) {
  const topRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const midRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const botRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  let topRowKeys = topRow.map((item, _) => {
    return <Key key={item} char={item} onClick={props.onClick} bgColorClass={getBgColorClass(props, item)} />
  });
  
  let midRowKeys = midRow.map((item, _) => {
    return <Key key={item} char={item} onClick={props.onClick} bgColorClass={getBgColorClass(props, item)} />
  });
  
  let botRowKeys = botRow.map((item, _) => {
    return <Key key={item} char={item} onClick={props.onClick} bgColorClass={getBgColorClass(props, item)} />
  });

  return (
    <div>
      <div>
        {topRowKeys}
      </div>
      <div>
        {midRowKeys}
      </div>
      <div>
        <WideKey text='Enter' onClick={props.onEnter} />
        {botRowKeys}
        <WideKey text='Back' onClick={props.onDelete} />
      </div>
    </div>
  );
}
