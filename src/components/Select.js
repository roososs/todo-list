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
export default Select
