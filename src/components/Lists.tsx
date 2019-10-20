import React, { useContext, useEffect, useState } from 'react'
import { Box, Text, Color } from 'ink'
import SelectInput, { Item, ItemProps } from 'ink-select-input'
import trendingGithub from 'trending-github'
import { AppContext, DATE_RANGE } from '../AppContext'
import LANGUAGES from '../languages'

interface ITrendingResponse {
  author: string
  name: string
  description: string
  language: string
  stars: number
  forks: number
}

interface CustomItemProps extends Item, ItemProps, ITrendingResponse {}

const CustomItemComponent = (props: ItemProps | CustomItemProps) => {
  return 'author' in props ? (
    <Box key={props.key || props.value} flexDirection="column" paddingY={1}>
      <Box>
        <Color cyanBright>
          📘 {props.author}/<Text bold>{props.name}</Text>
        </Color>
      </Box>
      <Box>
        <Text italic>{props.description}</Text>
      </Box>
      <Box>
        <Box marginRight={2}>
          <Color yellowBright>●</Color> {props.language}
        </Box>
        <Box marginRight={2}>⭐️ {props.stars}</Box>
        <Box marginRight={2}>📖 {props.forks}</Box>
      </Box>
    </Box>
  ) : (
    <Text>No Item</Text>
  )
}

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
  const [repos, setRepos] = useState<ITrendingResponse[]>([])

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

  const showResult = () => {
    let resultValues = repos.map((r: ITrendingResponse) => ({
      ...r,
      label: r.name,
      value: r.name,
    }))

    return (
      <SelectInput
        limit={5}
        items={resultValues}
        itemComponent={CustomItemComponent}
      />
    )
  }

  return (
    <Box>
      {activePage == 'searchLanguage'
        ? searchLanguage
        : activePage === 'setDateRange'
        ? setDateRange
        : showResult()}
    </Box>
  )
}

export default LanguageLists
