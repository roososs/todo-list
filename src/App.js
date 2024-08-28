import logo from './logo.svg'
import './App.css'
import { useRef, useState, useMemo, forwardRef } from 'react'
import { v4 as uuid } from 'uuid'

// ** Avant le useRef
// function Form({ onSubmit, onChange }) {
//   return (
//     <>
//       <form className='input-group mb-3' onSubmit={onSubmit}>
//         <input
//           className='form-control'
//           type='text'
//           onChange={onChange}
//           name='content'
//           placeholder='content'
//         ></input>
//         <button type='submit' className='btn btn-info '>
//           Add New ...
//         </button>
//       </form>
//     </>
//   )
// }

// ** Aprés le useRef
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
  const ref = useRef()
  const todo = [
    { id: 1, content: 'React formation', done: false },
    { id: 2, content: 'API formation', done: true },
  ]
  const [input, setInput] = useState(null)
  const [items, setItems] = useState(todo)
  const [all, setAll] = useState(items)
  const isValid = useMemo(() => !!input, [input]) //vérification si input n'est pas null

  const handleOnChange = (e) => {
    setInput(e.target.value)
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    // if (!input) { // Supprimer aprés l'utilisation de useMemo
    //   return false
    // }
    // setItems([
    //   {
    //     id: uuid(),
    //     content: input,
    //     done: false,
    //   },
    //   ...items,
    // ])
    // setInput(null) // ne vide pas l'input donc on utilise useRef
    // ref.current.value = null

    //** aprés use Memo
    if (isValid) {
      setItems([
        {
          id: uuid(),
          content: input,
          done: false,
        },
        ...items,
      ])
      setAll([
        [
          {
            id: uuid(),
            content: input,
            done: false,
          },
          ...items,
        ],
      ])
      setInput(null) // ne vide pas l'input donc on utilise useRef
      ref.current.value = null
    }
    //** aprés use Memo
  }
  const handleOnCheck = (id, bool) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, done: bool } : item
    )
    setItems([...updated])
    setAll([...updated])
  }
  const handleOnSelect = (option) => {
    let filter = []
    if (option === 'Completed') {
      filter = all.filter((item) => !!item.done)
    } else filter = all
    setItems(filter)
  }
  return (
    <div className='App'>
      <header className='App-header'>
        <Container title='Gestionnaire des taches'>
          <Form ref={ref} onSubmit={handleOnSubmit} onChange={handleOnChange} />
          <Select onSelect={handleOnSelect} />
          <List onCheck={handleOnCheck} items={items} />
        </Container>
      </header>
    </div>
  )
}

export default App
