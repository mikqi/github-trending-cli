import React, { useContext } from 'react'
import { Box, Text, Color } from 'ink'
import { AppContext } from '../AppContext'

const Footer = () => {
  const { language } = useContext(AppContext)
  return (
    <Box>
      <Text>
        This is your language <Color greenBright>{language}</Color>
      </Text>
    </Box>
  )
}

export default Footer
