import React from 'react'

import NewsPreview from './NewsPreview'
import './NewsPageLayout.scss'

export default function NewsPageLayout({ newsData }) {

  return (
    <section className="archive-news">
      <div className="archive-news__outer-wrapper">
        <div className="archive-news__inner-wrapper">
          {
            newsData.map((item, index) => {
              const { title, featuredImage, categories, slug, language } = item
              {/* console.log('Link from newsData: ', slug)
              console.log('Language from newsData: ', language) */}
              return (
                <NewsPreview 
                  key={index}
                  image={featuredImage}
                  link={language.locale === 'sr_RS' ? `blog/${slug}` : `en/news/${slug}`}
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
