import React, { useContext, useEffect } from 'react'
import { Box, Text } from 'ink'
import SelectInput, { Item } from 'ink-select-input'
import { AppContext } from '../AppContext'
import LANGUAGES from '../languages'

const LanguageLists = () => {
  const { dispatch, filteredLanguages } = useContext(AppContext)
  useEffect(() => {
    dispatch({
      type: 'SET_LANGUAGES',
      payload: LANGUAGES,
    })
  }, [LANGUAGES])

  const handleSelect = (item: Item) => {
    dispatch({
      type: 'SET_LANGUAGE',
      payload: item.value.toString(),
    })
  }

  return (
    <Box>
      {filteredLanguages && filteredLanguages.length > 0 ? (
        <SelectInput
          items={filteredLanguages}
          limit={5}
          onSelect={handleSelect}
        />
      ) : (
        <Text underline>404 Language Not Found</Text>
      )}
    </Box>
  )
}

export default LanguageLists
