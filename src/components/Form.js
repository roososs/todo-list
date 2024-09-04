import { forwardRef } from 'react'

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
export default Form
