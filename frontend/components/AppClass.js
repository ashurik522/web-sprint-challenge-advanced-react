import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at


export default class AppClass extends React.Component {
 
  state = {
    totalSteps: initialSteps,
    xCoordinate: 2,
    yCoordinate: 2,
    board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    currentIndex: initialIndex,
    message: initialMessage,
    email: initialEmail,
  }
  
  handleUp = (index) => {
    const newBoard = [...this.state.board];
    newBoard[index] = this.state.currentIndex;
    this.setState({
      ...this.state,
      yCoordinate: this.state.yCoordinate > 1 ? this.state.yCoordinate - 1 : this.state.yCoordinate,
      message: this.state.yCoordinate > 1 ? "" : "You can't go up",
      currentIndex: this.state.currentIndex > 2 ? this.state.currentIndex - 3 : this.state.currentIndex,
      totalSteps: this.state.currentIndex > 2 ? this.state.totalSteps + 1 : this.state.totalSteps,
      board: newBoard,
      
    })
  };

  handleDown = (index) => {
    const newBoard = [...this.state.board];
    newBoard[index] = this.state.currentIndex;
    this.setState({
      ...this.state,
      yCoordinate: this.state.yCoordinate < 3 ? this.state.yCoordinate + 1 : this.state.yCoordinate,
      message: this.state.yCoordinate < 3 ? "" : "You can't go down",
      currentIndex: this.state.currentIndex < 6 ? this.state.currentIndex + 3 : this.state.currentIndex,
      totalSteps: this.state.currentIndex < 6 ? this.state.totalSteps + 1 : this.state.totalSteps,
      board: newBoard,
    })
  };

  handleLeft = (index) => {
    const newBoard = [...this.state.board];
    newBoard[index] = this.state.currentIndex;
    this.setState({
      ...this.state,
      xCoordinate: this.state.xCoordinate > 1 ? this.state.xCoordinate - 1 : this.state.xCoordinate,
      message: this.state.xCoordinate > 1 ? "" : "You can't go left",
      currentIndex: (this.state.currentIndex === 0 || this.state.currentIndex === 3 || this.state.currentIndex ===6) 
        ? this.state.currentIndex : this.state.currentIndex - 1,
      totalSteps: (this.state.currentIndex === 0 || this.state.currentIndex === 3 || this.state.currentIndex ===6) 
        ? this.state.totalSteps: this.state.totalSteps + 1,
      board: newBoard,
      })
  };

  handleRight = (index) => {
    const newBoard = [...this.state.board];
    newBoard[index] = this.state.currentIndex;
    this.setState({
      ...this.state,
      xCoordinate: this.state.xCoordinate < 3 ? this.state.xCoordinate + 1 : this.state.xCoordinate,
      message: this.state.xCoordinate < 3 ? "" : "You can't go right",
      currentIndex: (this.state.currentIndex === 2 || this.state.currentIndex === 5 || this.state.currentIndex ===8) 
        ? this.state.currentIndex : this.state.currentIndex + 1,
      totalSteps: (this.state.currentIndex === 2 || this.state.currentIndex === 5 || this.state.currentIndex === 8) 
        ? this.state.totalSteps: this.state.totalSteps + 1,
      board: newBoard,
      })
  };

  handleReset = () => {
    this.setState({
      totalSteps: initialSteps,
      xCoordinate: 2,
      yCoordinate: 2,
      board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      currentIndex: initialIndex,
      message: initialMessage,
      email: initialEmail,
    })
  }

  onChange = (evt) => {
   this.setState({...this.state, email: evt.target.value})
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    const newItem = {
      "x": this.state.xCoordinate,
      "y": this.state.yCoordinate,
      "steps": this.state.totalSteps,
      "email": this.state.email.trim()
    }

    axios.post('http://localhost:9000/api/result', newItem)
      .then(res => {
        this.setState({...this.state, message: res.data.message, email: ''})
      })
      .catch(err => console.error(err))

  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.xCoordinate}, {this.state.yCoordinate})</h3>
          <h3 id="steps">You moved {this.state.totalSteps} {this.state.totalSteps === 1 ? 'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {
            this.state.board.map(idx => (
              <div key={idx} className={`square${idx === this.state.currentIndex ? ' active' : ''}`}>
                {idx === this.state.currentIndex ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.handleLeft} id="left">LEFT</button>
          <button onClick={this.handleUp} id="up">UP</button>
          <button onClick={this.handleRight} id="right">RIGHT</button>
          <button onClick={this.handleDown} id="down">DOWN</button>
          <button onClick={this.handleReset} id="reset">reset</button>
        </div>
        <form  onSubmit={this.onSubmit}>
          <input onChange={this.onChange} value={this.state.email} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
