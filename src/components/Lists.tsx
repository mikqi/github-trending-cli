import React, { useContext, useEffect, useState } from 'react'
import { Box, Text } from 'ink'
import SelectInput, { Item } from 'ink-select-input'
import trendingGithub from 'trending-github'
import { AppContext, DATE_RANGE } from '../AppContext'
import LANGUAGES from '../languages'

const DATE_RANGE_ITEMS = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
]

const LanguageLists = () => {
  const {
    dispatch,
    filteredLanguages,
    activePage,
    language,
    dateRange,
  } = useContext(AppContext)
  const [repos, setRepos] = useState([])

  useEffect(() => {
    dispatch({
      type: 'SET_LANGUAGES',
      payload: LANGUAGES,
    })
  }, [LANGUAGES])

  useEffect(() => {
    if (language && dateRange) {
      fetchTrending()
    }
  }, [language, dateRange])

  const fetchTrending = async () => {
    const data: any = await trendingGithub(dateRange, language)
    setRepos(data)
  }

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

  const handleSelectRange = (item: Item) => {
    dispatch({
      type: 'SET_DATE_RANGE',
      payload: item.value as DATE_RANGE,
    })
    dispatch({
      type: 'SET_ACTIVE_PAGE',
      payload: 'showResult',
    })
  }

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

  const showResult = <Text>{JSON.stringify(repos)}</Text>

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
