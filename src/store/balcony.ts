import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface State {
  apiKey: string
}

const initial: State = {
  apiKey: '',
}

export const BalconySlice = createSlice({
  name: "balcony",
  initialState: initial as State,
  reducers: {
    setApiKey(state, action: PayloadAction<string>) {
      state.apiKey = action.payload
    },
  }
})

export const BalconyActions = BalconySlice.actions
