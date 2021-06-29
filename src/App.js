import React, { useState, useEffect } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'

import NewsCards from './components/NewsCards/NewsCards'

const alanKey = '8bc68817de00a82f0f76b742d03da6292e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {

  const [newsArticles, setNewsArticles] = useState([])

  useEffect(() => {
      document.title = "News AI"
  }, []);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles)
        }
      }
    })
  }, [])

  return (
    <div>
      <h1 style={{ display: 'flex', justifyContent: 'center'}}>News AI</h1>
      <NewsCards articles={newsArticles} />
    </div>
  )
}

export default App