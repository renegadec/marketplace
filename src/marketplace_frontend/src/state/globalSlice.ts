import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface GlobalState {
  storageInitiated: boolean
}

const initialState: GlobalState = {
  storageInitiated: false,
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setInit: (state) => {
        state.storageInitiated = true;
    },
  },
})

export const { setInit } = globalSlice.actions

export default globalSlice.reducer