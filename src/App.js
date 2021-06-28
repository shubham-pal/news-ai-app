import React, { useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'

const alanKey = '8bc68817de00a82f0f76b742d03da6292e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command }) => {
        if (command === 'testCommand') {
          alert('Executed!')
        }
      }
    })
  }, [])

  return (
    <div>
      <h1>News Application</h1>
    </div>
  )
}

export default App