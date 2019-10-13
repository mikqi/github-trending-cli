import React, { createContext, useReducer, FunctionComponent } from 'react'

type DATE_RANGE = 'daily' | 'weekly' | 'monthly'
type ACTION =
  | { type: 'SET_QUERY'; payload: string }
  | { type: 'SET_ACTIVE_PAGE'; payload: string }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'SET_LANGUAGES'; payload: Choice[] }
  | { type: 'SET_DATE_RANGE'; payload: DATE_RANGE }

interface Choice {
  label: string
  value: string
}

interface AppState {
  query: string
  activePage: string
  dateRange?: DATE_RANGE
  language?: string
  listLanguages?: Choice[]
}

let initialAppState: AppState = {
  query: '',
  activePage: '',
  language: '',
  dateRange: 'daily',
  listLanguages: [],
}

const AppContext = createContext<
  typeof initialAppState & {
    dispatch: (action: ACTION) => void
  }
>({
  ...initialAppState,
  dispatch: () => {},
})

const { Consumer, Provider } = AppContext

const appReducer = (state: AppState, action: ACTION) => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.payload }
    case 'SET_ACTIVE_PAGE':
      return { ...state, activePage: action.payload }
    case 'SET_LANGUAGES':
      return { ...state, listLanguages: action.payload }
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload }
    default:
      throw new Error('Unexpected Action')
  }
}

const AppProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialAppState)

  return (
    <Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </Provider>
  )
}

export { AppProvider, Consumer as PageConsumer, AppContext }
