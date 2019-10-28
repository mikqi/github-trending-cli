import React, { useContext } from 'react'
import { Box, Text } from 'ink'
import TextInput from 'ink-text-input'
import { AppContext } from '../AppContext'

const Header = () => {
  const { query, dispatch, activePage } = useContext(AppContext)
  const handleChange = (val: string) => {
    dispatch({
      type: 'FILTER_LANGUAGE',
      payload: val,
    })
  }
  let HeaderChild
  switch (activePage) {
    case 'searchLanguage':
      HeaderChild = (
        <Text>
          Search your languages:{' '}
          <TextInput
            placeholder="ex. JavaScript"
            value={query}
            onChange={handleChange}
          />
        </Text>
      )
      break

    case 'setDateRange':
      HeaderChild = <Text>Pick date range:</Text>
      break

    default:
      break
  }
  return <Box>{HeaderChild}</Box>
}

export default Header
