import React from 'react'
import { Box, Color, Text } from 'ink'
import { ItemProps } from 'ink-select-input'

const CustomItemComponent = ({ isSelected, label }: ItemProps) => {
  return (
    <Box>
      <Color bold={isSelected} cyanBright={isSelected}>
        <Text>{label}</Text>
      </Color>
    </Box>
  )
}

export default CustomItemComponent
