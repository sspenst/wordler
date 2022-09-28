import React from "react"

export default class WideKey extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick();
  };

  render() {
    return (
      <div style={{display: 'inline-block'}}>
        <button
          type='button'
          onClick={this.handleClick}
          className={`m-0.5 h-10 w-12 text-sm font-medium text-white bg-white rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          {this.props.text}
        </button>
      </div>
    );
  }
}
