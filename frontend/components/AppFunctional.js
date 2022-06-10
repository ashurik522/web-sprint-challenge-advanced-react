import React, { useState } from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at

export default function AppFunctional(props) {

  const[state, setState] = useState({
    totalSteps: initialSteps,
    xCoordinate: 2,
    yCoordinate: 2,
    board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    currentIndex: initialIndex,
    message: initialMessage,
    email: initialEmail,
  })


  const handleUp = (index) => {
    const newBoard = [...state.board];
    newBoard[index] = state.currentIndex;
    setState({
      ...state,
      yCoordinate: state.yCoordinate > 1 ? state.yCoordinate - 1 : state.yCoordinate,
      message: state.yCoordinate > 1 ? "" : "You can't go up",
      currentIndex: state.currentIndex > 2 ? state.currentIndex - 3 : state.currentIndex,
      totalSteps: state.currentIndex > 2 ? state.totalSteps + 1 : state.totalSteps,
      board: newBoard
    })
  };

  const handleDown = (index) => {
    const newBoard = [...state.board];
    newBoard[index] = state.currentIndex;
    setState({
      ...state,
      yCoordinate: state.yCoordinate < 3 ? state.yCoordinate + 1 : state.yCoordinate,
      message: state.yCoordinate < 3 ? "" : "You can't go down",
      currentIndex: state.currentIndex < 6 ? state.currentIndex + 3 : state.currentIndex,
      totalSteps: state.currentIndex < 6 ? state.totalSteps + 1 : state.totalSteps,
      board: newBoard
    })
  };

  const handleLeft = (index) => {
    const newBoard = [...state.board];
    newBoard[index] = state.currentIndex;
    setState({
      ...state,
      xCoordinate: state.xCoordinate > 1 ? state.xCoordinate - 1 : state.xCoordinate,
      message: state.xCoordinate > 1 ? "" : "You can't go left",
      currentIndex: (state.currentIndex === 0 || state.currentIndex === 3 || state.currentIndex ===6) 
        ? state.currentIndex : state.currentIndex - 1,
      totalSteps: (state.currentIndex === 0 || state.currentIndex === 3 || state.currentIndex ===6) 
        ? state.totalSteps: state.totalSteps + 1,
      board: newBoard
      })
  };

  const handleRight = (index) => {
    const newBoard = [...state.board];
    newBoard[index] = state.currentIndex;
    setState({
      ...state,
      xCoordinate: state.xCoordinate < 3 ? state.xCoordinate + 1 : state.xCoordinate,
      message: state.xCoordinate < 3 ? "" : "You can't go right",
      currentIndex: (state.currentIndex === 2 || state.currentIndex === 5 || state.currentIndex ===8) 
        ? state.currentIndex : state.currentIndex + 1,
      totalSteps: (state.currentIndex === 2 || state.currentIndex === 5 || state.currentIndex === 8) 
        ? state.totalSteps: state.totalSteps + 1,
      board: newBoard
      })
  };

  const handleReset = () => {
    setState({
      totalSteps: initialSteps,
      xCoordinate: 2,
      yCoordinate: 2,
      board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      currentIndex: initialIndex,
      message: initialMessage,
      email: initialEmail,
    })
  }
  const   onChange = (evt) => {
   setState({...state, email: evt.target.value})
  }

  const onSubmit = (evt) => {
    evt.preventDefault()
    const newItem = {
      "x": state.xCoordinate,
      "y": state.yCoordinate,
      "steps": state.totalSteps,
      "email": state.email.trim()
    }
    if(state.email === ''){
      setState({...state, message: 'Ouch: email is required' })
    } else if(state.email === 'foo@bar.baz'){
      setState({...state, message: 'foo@bar.baz failure #23'})
    } else {
      axios.post('http://localhost:9000/api/result', newItem)
      .then(res => {
        setState({...state, message: res.data.message, email: ''})
      })
      .catch(err => console.error(err))
    }
  }

  
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
          <h3 id="coordinates">Coordinates ({state.xCoordinate}, {state.yCoordinate})</h3>
          <h3 id="steps">You moved {state.totalSteps} {state.totalSteps === 1 ?'time' : 'times'}</h3>
        </div>
        <div id="grid">
          {
            state.board.map(idx => (
              <div key={idx} className={`square${idx === state.currentIndex ? ' active' : ''}`}>
                {idx === state.currentIndex ? 'B' : null}
              </div>
            ))
          }
        </div>
        <div className="info">
          <h3 id="message">{state.message}</h3>
        </div>
        <div id="keypad">
          <button onClick={handleLeft} id="left">LEFT</button>
          <button onClick={handleUp} id="up">UP</button>
          <button onClick={handleRight} id="right">RIGHT</button>
          <button onClick={handleDown} id="down">DOWN</button>
          <button onClick={handleReset} id="reset">reset</button>
        </div>
        <form onSubmit={onSubmit} >
          <input onChange={onChange} value={state.email} id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
  )
 }
