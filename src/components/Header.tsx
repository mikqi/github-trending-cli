import React, { useContext } from 'react'
import { Box, Text } from 'ink'
import TextInput from 'ink-text-input'
import { AppContext } from '../AppContext'

const Header = () => {
  const { query, dispatch } = useContext(AppContext)
  const handleChange = (val: string) => {
    dispatch({
      type: 'FILTER_LANGUAGE',
      payload: val,
    })
  }
  return (
    <Box>
      <Text>
        Search your languages:{' '}
        <TextInput
          placeholder="ex. JavaScript"
          value={query}
          onChange={handleChange}
        />
      </Text>
    </Box>
  )
}

export default Header
