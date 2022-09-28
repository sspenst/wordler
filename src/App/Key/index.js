import React from "react"

export default class Key extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      char: props.char,
      onClick: props.onClick,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.state.onClick(this.state.char);
  };

  render() {
    return (
      <div style={{display: 'inline-block'}}>
        <button
          type='button'
          onClick={this.handleClick}
          className={`m-0.5 h-10 w-8 text-sm font-medium text-white ${this.props.bgColorClass} rounded-md hover:bg-opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          {this.state.char}
        </button>
      </div>
    );
  }
}
