import React from 'react'
import { Box, Color, Text } from 'ink'
import { ItemProps, Item } from 'ink-select-input'

export interface ITrendingResponse {
  author: string
  name: string
  description: string
  language: string
  stars: number
  forks: number
  href: string
}

interface CustomItemProps extends Item, ItemProps, ITrendingResponse {}

const CustomItemComponent = (props: ItemProps | CustomItemProps) => {
  return 'author' in props ? (
    <Box
      paddingLeft={props.isSelected ? 1 : 0}
      key={props.key || props.value}
      flexDirection="column"
      paddingY={1}
    >
      <Box>
        <Color cyanBright>
          📘 {props.author}/<Text bold>{props.name || ''}</Text>
        </Color>
      </Box>
      <Box>
        <Text italic>{props.description || 'no description'}</Text>
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

export default CustomItemComponent
