import React from 'react'
import Img from 'gatsby-image'

import './NewsSection.scss'

export default function NewsSection({ newsData, language }) {

  console.log(language)
  const title = language === 'en' ? 'Featured on' : 'Objavili su nas'

  return (
    <div>
      <h2 className='news-section__title'>{title}</h2>
      <div className="news-section">
        {
          newsData.map((item, index) => <a href={item.newsUrl} target="_blank" key={index}>
            {item.newsImage && <div className="news-section__img"
              style={{ backgroundImage: `url(${item.newsImage.localFile.url} )` }} />}
          </a>)
        }</div>

    </div>
  )
}
