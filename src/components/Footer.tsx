import React, { useContext } from 'react'
import { Box, Text, Color } from 'ink'
import { AppContext } from '../AppContext'

const Footer = () => {
  const { language, dateRange } = useContext(AppContext)
  return (
    <Box flexDirection="column">
      {language ? (
        <Box>
          <Text>
            This is your language <Color greenBright>{language}</Color>
          </Text>
        </Box>
      ) : (
        undefined
      )}
      {dateRange ? (
        <Box>
          <Text>
            Date range <Color greenBright>{dateRange}</Color>
          </Text>
        </Box>
      ) : (
        undefined
      )}
    </Box>
  )
}

export default Footer
