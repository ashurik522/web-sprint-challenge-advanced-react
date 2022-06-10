import React from 'react';
import { render, screen, fireEvent, } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AppClass from './AppClass'





test("Renders without errors", () => {
  render(<AppClass />)
})

test("Renders coordinates and headings on screen", () => {
    render(<AppClass/>);

    const headerElement = screen.queryByText(/coordinates/i)
    const headerElement2 = screen.queryByText(/you moved 0 times/i)

    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toBeTruthy();
    expect(headerElement).toHaveTextContent(/coordinates/i)

    expect(headerElement2).toBeInTheDocument();
    expect(headerElement2).toBeTruthy();
    expect(headerElement2).toHaveTextContent(/you moved 0 times/i)
  })

   test("Render buttons to screen", () => {
     render(<AppClass/>)
     const leftButton = screen.getByText(/left/i)
     const upButton = screen.getByText(/up/i)
     const rightButton = screen.getByText(/right/i)
     const downButton = screen.getByText(/down/i)
     const resetButton = screen.getByText(/reset/i)
     const submitBtn = screen.getByText(/Submit/)
     

     expect(leftButton).toBeTruthy()
     expect(upButton).toBeTruthy()
     expect(rightButton).toBeTruthy()
     expect(downButton).toBeTruthy()
     expect(resetButton).toBeTruthy()
     expect(submitBtn).toBeInTheDocument()
     
     
   })

   test("Typing in email input changes value", () => {
     render(<AppClass/>)
     const emailInput = screen.getByPlaceholderText("type email")
     fireEvent.change(emailInput, { target: {value: "test@test.com"}})

     expect(emailInput).toBeInTheDocument("test@test.com")
   })