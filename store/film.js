import { createSlice } from '@reduxjs/toolkit'
// import Film from '../assets/js/models/Film'

const INITIAL_LIST = {
  data: [],
  meta: {}
}

const INITIAL_STATE = {
  item: {},
  list: INITIAL_LIST,
  loading: true
}

export const filmStore = createSlice({
  name: 'film',
  initialState: INITIAL_STATE,
  reducers: {
    setItem:(state, action) => {
      state.item = action.payload
    },
    setList:(state, action) => {
      switch (action.payload.action) {
        case 'append':
          for (let i = 0; i < action.payload.data.length; i++) {
            const item = action.payload.data[i];
            state.list.data.push(item)  
          }
          break
        case 'set':
        default:
          state.list = action.payload
          break
      }
    },
    resetList:(state) => {
      state.list = INITIAL_LIST
    },
    setLoading:(state, action) => {
      state.loading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setItem, setList, resetList, setLoading } = filmStore.actions

export default filmStore.reducer