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
export default Container
