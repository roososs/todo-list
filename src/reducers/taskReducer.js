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
export { initialState, reducer }
