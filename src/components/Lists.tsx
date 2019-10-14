import React, { useContext, useEffect } from 'react'
import { Box, Text } from 'ink'
import SelectInput, { Item } from 'ink-select-input'
import { AppContext } from '../AppContext'
import LANGUAGES from '../languages'

const DATE_RANGE_ITEMS = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
]

const LanguageLists = () => {
  const { dispatch, filteredLanguages, activePage, language } = useContext(
    AppContext,
  )

  useEffect(() => {
    dispatch({
      type: 'SET_LANGUAGES',
      payload: LANGUAGES,
    })
  }, [LANGUAGES])

  useEffect(() => {
    if (language) {
      console.log('do magic here')
    }
  }, [language])

  const handleSelectLanguage = (item: Item) => {
    dispatch({
      type: 'SET_LANGUAGE',
      payload: item.value.toString(),
    })
    dispatch({
      type: 'SET_ACTIVE_PAGE',
      payload: 'setDateRange',
    })
  }

  const handleSelectRange = (item: Item) => {}

  const searchLanguage =
    filteredLanguages && filteredLanguages.length > 0 ? (
      <SelectInput
        items={filteredLanguages}
        limit={5}
        onSelect={handleSelectLanguage}
      />
    ) : (
      <Text bold>404 Language Not Found</Text>
    )

  const setDateRange = (
    <SelectInput items={DATE_RANGE_ITEMS} onSelect={handleSelectRange} />
  )

  const showResult = <Text>Result is Here</Text>

  return (
    <Box>
      {activePage === 'searchLanguage'
        ? searchLanguage
        : activePage === 'setDateRange'
        ? setDateRange
        : showResult}
    </Box>
  )
}

export default LanguageLists
