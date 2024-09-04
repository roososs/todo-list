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
export default Item
