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

              return (
                <NewsPreview 
                  key={index}
                  firstOfTheIndex={index}
                  image={featuredImage}
                  link={language.slug === 'sr' ? `blog/${slug}` : `en/news/${slug}`}
                  title={title}
                  language={language}
                  authorAvatar={newsData[0].author_section.authorImage.file.image.fluid}
                  authorName={newsData[0].author_section.authorName}
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
