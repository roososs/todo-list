import logo from './logo.svg'
import './App.css'
import { useRef, useMemo, useReducer } from 'react'
import { v4 as uuid } from 'uuid'
import { reducer, initialState } from './reducers/taskReducer'
import { Container, Form, List, Select } from './components'

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
