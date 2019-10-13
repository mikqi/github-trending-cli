import React, { useContext } from 'react'
import { Box, Text, Color } from 'ink'
import { AppContext } from '../AppContext'

const Footer = () => {
  const { query } = useContext(AppContext)
  return (
    <Box>
      <Text>
        This is your query <Color greenBright>{query}</Color>
      </Text>
    </Box>
  )
}

export default Footer
