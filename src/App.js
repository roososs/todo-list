import logo from './logo.svg'
import './App.css'
import { useRef, useState, useMemo, forwardRef, useReducer } from 'react'
import { v4 as uuid } from 'uuid'

const initialState = {
  items: [
    { id: 1, content: 'React formation', done: false },
    { id: 2, content: 'API formation', done: true },
  ],
  all: [
    { id: 1, content: 'React formation', done: false },
    { id: 2, content: 'API formation', done: true },
  ],
  input: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'submit':
      return {
        ...state,
        items: [...state.items, action.payload.item],
        all: [...state.items, action.payload.item],
      }
    case 'change':
      return { ...state, input: action.payload.value }
    case 'check':
      const updated = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, done: action.payload.bool }
          : item
      )
      return {
        ...state,
        items: updated,
        all: updated,
      }
    case 'select':
      let filter = []
      if (action.payload.option === 'Completed') {
        filter = state.all.filter((item) => !!item.done)
      } else filter = [...state.all]
      return {
        ...state,
        items: filter,
      }
  }
}

const Form = forwardRef(({ onSubmit, onChange }, ref) => {
  return (
    <>
      <form className='input-group mb-3' onSubmit={onSubmit}>
        <input
          ref={ref}
          className='form-control'
          type='text'
          onChange={onChange}
          name='content'
          placeholder='content'
        ></input>
        <button type='submit' className='btn btn-info '>
          Add New ...
        </button>
      </form>
    </>
  )
})

function Select({ onSelect }) {
  const options = ['All', 'Completed']
  return (
    <div className='d-flex justify-content-end align-items-center my-3 mx-1'>
      <select
        className='select form-select form-control form-control-lg'
        style={{ width: '200px' }}
        onChange={(e) => onSelect(e.target.value)}
      >
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

function List({ onCheck, items }) {
  return (
    <ul className='list-group'>
      {items.map((item) => (
        <Item key={item.id} {...item} onCheck={onCheck} />
      ))}
    </ul>
  )
}

function Item({ id, content, done, onCheck }) {
  const isDone = done ? 'mx-3 item-done' : 'mx-3'
  return (
    <li className='list-group-item'>
      <input
        className='form-check-input'
        type='checkbox'
        checked={done}
        onChange={(e) => onCheck(id, e.target.checked)}
      ></input>
      <span className={isDone}>{content}</span>
    </li>
  )
}

function Container({ children, title }) {
  return (
    <div className='container py-3'>
      <div className='row d-flex align-items-center justify-content-center h-100'>
        <div className='card'>
          <div className='card-body py-4 px-4'>
            <h1 className='text-info mb-3'>{title}</h1>
            <div className='col'>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const ref = useRef()
  const isValid = useMemo(() => !!state.input, [state.input])

  const handleOnChange = (e) => {
    dispatch({
      type: 'change',
      payload: { value: e.target.value },
    })
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (isValid) {
      dispatch({
        type: 'submit',
        payload: { item: { id: uuid(), content: state.input, done: false } },
      })
      ref.current.value = null
    }
  }
  const handleOnCheck = (id, bool) => {
    dispatch({ type: 'check', payload: { id: id, bool: bool } })
  }
  const handleOnSelect = (option) => {
    dispatch({ type: 'select', payload: { option: option } })
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <Container title='Gestionnaire des taches'>
          <Form ref={ref} onSubmit={handleOnSubmit} onChange={handleOnChange} />
          <Select onSelect={handleOnSelect} />
          <List onCheck={handleOnCheck} items={state.items} />
        </Container>
      </header>
    </div>
  )
}

export default App
