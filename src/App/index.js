import './index.css';
import Modal from './Modal';
// import useWindowDimensions from './useWindowDimensions';
import Word from './Word';
import React from 'react';
import Keyboard from './Keyboard';
import randomWords from 'random-words';

// function GetBoardHeight() {
//   const { height, width } = useWindowDimensions();
//   return height - 40 - 44 - 44 - 44 - 10;
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guesses: [],
      time: 0,
      word: '',
    };

    // handlers
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    // constants
    this.answer = '';

    while (this.answer.length !== 5) {
      this.answer = randomWords().toUpperCase();
      // https://www.npmjs.com/package/random-words
    }
    
    this.squares = this.answer.length;

    // key guesses
    this.blackKeys = new Set();
    this.greenKeys = new Set();
    this.yellowKeys = new Set();

    this.timerId = undefined;
    this.score = 0;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleClick(char) {
    this.setState(state => {
      let word = state.word;

      if (word.length < this.squares) {
        word = word.concat(char.toUpperCase());
      }

      return {
        word: word
      };
    });
  }

  handleDelete() {
    this.setState(state => ({
      word: state.word.slice(0, -1)
    }));
  }

  handleEnter() {
    console.log(this.answer);

    if (!this.timerId) {
      this.timerId = setInterval(() => this.tick(), 100);
      this.setState(_ => ({
        time: 0
      }));
      this.score = 0;
    } else if (this.timerId && this.state.word === this.answer) {
      console.log(this.state.guesses.length);
      clearInterval(this.timerId);
      this.timerId = undefined;
      this.score = this.state.time + this.state.guesses.length * 100;
    }

    this.setState(state => {
      if (state.word.length !== this.squares) {
        return;
      }

      for (let i = 0; i < state.word.length; i++) {
        let char = state.word[i];

        if (!this.answer.includes(char)) {
          this.blackKeys.add(char);
        } else if (this.answer[i] === char) {
          this.greenKeys.add(char);
        } else {
          this.yellowKeys.add(char);
        }
      }

      return {
        guesses: state.guesses.concat(state.word),
        word: '',
      };
    });
  }

  handleKeyDown(e) {
    if (e.keyCode === 8) {
      this.handleDelete();
    } else if (e.keyCode === 13) {
      this.handleEnter();
    } else if (e.keyCode >= 65 && e.keyCode <= 90) {
      this.handleClick(e.key);
    }
  }

  tick() {
    this.setState(state => ({
      time: state.time + 1
    }));
  }

  formattedTime() {
    let time = this.state.time;
    return `${Math.floor(time/10)}.${time%10}`;
  }

  render() {  
    var words = [];

    for (let i = 0; i < this.state.guesses.length; i++) {
      words.push(<Word key={i} word={this.state.guesses[i]} answer={this.answer} squares={this.squares} />)
    }

    return (
      <div className='outer'>
        <div className='middle'>
          <Modal />
          <div className='text-2xl font-bold'>
            {this.formattedTime()}
            <br></br>
            {this.score !== 0 && this.score}
          </div>
          {words}
          <Word word={this.state.word} squares={this.squares} />
          <Keyboard
            onClick={this.handleClick}
            onDelete={this.handleDelete}
            onEnter={this.handleEnter}
            blackKeys={this.blackKeys}
            greenKeys={this.greenKeys}
            yellowKeys={this.yellowKeys}
          />
        </div>
      </div>
    );
  }
}

export default App;
