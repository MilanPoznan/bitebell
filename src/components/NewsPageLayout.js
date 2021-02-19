import React from 'react'

import NewsPreview from './NewsPreview'
import './NewsPageLayout.scss'
import { clearConfigCache } from 'prettier';

export default function NewsPageLayout({ newsData }) {

  console.log('News Data: ', newsData);
  return (
    <section className="archive-news">
      <div className="archive-news__outer-wrapper">
        <div className="archive-news__inner-wrapper">
          {
            newsData.map((item, index) => {
              const { title, featuredImage, categories } = item
              console.log('News Page: ', categories)
              return (
                <NewsPreview 
                  key={index}
                  image={featuredImage}
                  title={title}
                  category={categories.nodes}
                />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}
