import Item from './Item'

function List({ onCheck, items }) {
  return (
    <ul className='list-group'>
      {items.map((item) => (
        <Item key={item.id} {...item} onCheck={onCheck} />
      ))}
    </ul>
  )
}
export default List
