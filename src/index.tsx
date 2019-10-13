import React, { FunctionComponent } from 'react'
import { useInput } from 'ink'
import { AppProvider } from './AppContext'
import Footer from './components/Footer'
import Header from './components/Header'
import Lists from './components/Lists'

interface IProps {
  name?: string
}
const InkBoilerplate: FunctionComponent<IProps> = ({ name = 'Someone' }) => {
  useInput(input => {
    if (input === 'q') {
      process.exit(0)
    }
  })

  return (
    <AppProvider>
      <Header />
      <Lists />
      <Footer />
    </AppProvider>
  )
}

export default InkBoilerplate
