import React from 'react'
import { Grid, Grow, Typography } from '@material-ui/core'

import useStyles from './styles'
import NewsCard from '../NewsCard/NewsCard'

const infoCards = [
  {
    color: '#283593',
    title: 'News by Sources',
    info: 'CNN, BBC News, Time, Wired etc.',
    text: 'Give me the news from CNN'
  },
  {
    color: '#1565c0',
    title: 'News by Categories',
    info: 'Business, Entertainment, Sports, General, Health, Science, Technology etc.',
    text: 'Give me the latest sports news'
  },
  {
    color: '#4527a0',
    title: 'News by Terms',
    info: 'Windows, Cryptocurrencies, Smartphones etc.',
    text: 'What\'s up with Smartphones'
  },
]

const NewsCards = ({ articles }) => {
  const classes = useStyles()
  return (
    <Grow in>
      <Grid className={ classes.container } container alignItems="stretch" spacing={3}>
          {infoCards.map((infoCard) => (
            <Grid item xs={12} sm={6} md={4} lg={4} className={ classes.infoCard }>
              <div className={ classes.card } style={{ backgroundColor: infoCard.color }}>
                <Typography variant="h5">{ infoCard.title }</Typography>
                { 
                  infoCard.info ? 
                    (<Typography variant="h6">
                      <strong>{ infoCard.title.split(' ')[2] }:</strong><br />
                      {infoCard.info}
                    </Typography>) : null 
                }
                <Typography variant="h6">Try saying: <br /><i>{ infoCard.text }</i></Typography>
              </div>
            </Grid>
          ))}
        {articles.map((article, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex' }}>
            <NewsCard article={ article } index={ index } />
          </Grid>
        ))}
      </Grid>
    </Grow>
  )
}

export default NewsCards
