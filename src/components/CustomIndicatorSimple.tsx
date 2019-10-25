import React from 'react'
import { Box, Color } from 'ink'
import { IndicatorProps } from 'ink-select-input'
import figures from 'figures'

const CustomIndicator = ({ isSelected }: IndicatorProps) => (
  <Box marginRight={1}>
    {isSelected ? <Color cyanBright>{figures.play}</Color> : ' '}
  </Box>
)

export default CustomIndicator
