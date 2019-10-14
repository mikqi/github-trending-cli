import React, { createContext, useReducer, FunctionComponent } from 'react'

export type ACTIVE_PAGE = 'searchLanguage' | 'setDateRange' | 'showResult'
export type DATE_RANGE = 'daily' | 'weekly' | 'monthly'
type ACTION =
  | { type: 'SET_ACTIVE_PAGE'; payload: ACTIVE_PAGE }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'SET_LANGUAGES'; payload: Choice[] }
  | { type: 'SET_DATE_RANGE'; payload: DATE_RANGE }
  | { type: 'FILTER_LANGUAGE'; payload: string }

interface Choice {
  label: string
  value: string
}

export interface AppState {
  query: string
  activePage: ACTIVE_PAGE
  dateRange?: DATE_RANGE
  language?: string
  listLanguages?: Choice[]
  filteredLanguages?: Choice[]
}

let initialAppState: AppState = {
  query: '',
  activePage: 'searchLanguage',
  language: '',
  dateRange: 'daily',
  listLanguages: [],
  filteredLanguages: [],
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
    case 'SET_ACTIVE_PAGE':
      return { ...state, activePage: action.payload }
    case 'SET_LANGUAGES':
      return {
        ...state,
        listLanguages: action.payload,
        filteredLanguages: action.payload,
      }
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload }
    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload }
    case 'FILTER_LANGUAGE':
      return {
        ...state,
        query: action.payload,
        filteredLanguages:
          state.listLanguages &&
          state.listLanguages.filter(language =>
            language.value.toLowerCase().includes(action.payload.toLowerCase()),
          ),
      }
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
