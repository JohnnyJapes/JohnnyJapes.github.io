import { render } from '@testing-library/react';
import react from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class SlideShow extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: ["image1.png", "image2.png"],
      current: 0
    }

  }
  changeImage(i) {

  }
  clickBack(i, images) {
    console.log("Back button ", i)
    if (i == 0) {
      i = images.length - 1;
      this.setState({ current: 0 });
    }
    else {
      i--;
      this.setState({ current: i })
    };
  }
  clickNext(i, images) {
    console.log("Next button ", i)
    if (i == images.length - 1) {
      this.setState({ current: 0 });
    }
    else {
      i++
      this.setState({ current: i })
    };
  }


  render() {
    var current = 0;
    return (
      <div className='slideshowContainer'>
        <div className='container'>
          <button className='back-slide' onClick={() => this.clickNext(this.state.current, this.state.image)}>Back</button>
          <img src={this.state.image[this.state.current]}></img>
          <button className='next-slide' onClick={() => this.clickNext(this.state.current, this.state.image)}>Next</button>
        </div>
      </div>
    )
  }

}


function Projects(props) {
  return (<div>
    <h2>{props.name}</h2>
    <p className='description'>{props.desc}</p>
    <p>{props.linkLive} <a href={props.live}>{props.live}</a></p>
    <p>{props.linkSource} <a href={props.source}>{props.source}</a></p>
  </div>)
}
function AboutMe(props) {
  return <div className='bio'>
    <h4 className='bio-title'>About Me:</h4>
    <p>
      Hi! My name is Luke Hanrahan and I've always had an interest in technology. I decided to turn that interest into a career through a combination of courses and self teaching.
      The projects I've showcased here primarily deal with web development technologies such as HTML, CSS, and javascript for frontend work. With ExpressJS + MongoDB being used on the backend.
      However I have a passion for learning and am always looking to pick up new skills.
    </p>
  </div>
}

class App extends React.Component {
  render() {
    return (
      <div className='main'>
        <SlideShow />
        <div className='sub'>
          <div className='sub-item'>
            <AboutMe />
          </div>
          <div className='sub-item project'>
            <Projects name="Yelpcamp" desc="This project was built as a full stack exercise. It uses ExpressJS, NodeJS, MongoDB and Bootstrap. 
        Built using RESTful principals for the api and a basic user system is in place."
              linkLive="Live version: " live="https://damp-thicket-95453.herokuapp.com" linkSource="Source Code: "
              source="https://github.com/JohnnyJapes/YelpCamp-LH" />
            <Projects name="Portfolio" desc="The page you're looking at right now! Built as an exercise to learn some of the basics of reactJS"
              linkSource="Source Code: " source="https://github.com/JohnnyJapes/JohnnyJapes.github.io" />
          </div>
        </div>
      </div>

    )
  }
}










function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}





class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {


    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (this.state.xIsNext === true) {
      squares[i] = 'X';
    }
    else {
      squares[i] = 'O';
    }
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )
    })



    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">

          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
