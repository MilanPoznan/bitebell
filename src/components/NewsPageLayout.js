import React from 'react'

import NewsPreview from './NewsPreview'
import './NewsPageLayout.scss'

import { getMinsOfRead } from '../utils/utils'

/**
 * NewsPageLayout component
 * 
 * @returns {JSX Element}
 */
export default function NewsPageLayout({ newsData, pageTitle, pageSubtitle }) {

  const doc = typeof document !== 'undefined' && document

  const createPreviewText = (htmlText) => {
    let div = doc.createElement('div')
    div.innerHTML = htmlText
    let text = div.textContent || div.innerText || ""
    let finalContnetn = text.substring(0, 200)
    return finalContnetn
  }

  return (
    <section className="archive-news">
      <div className="archive-news__outer-wrapper">
        <div className="archive-news__titles">
          <h1>{pageTitle}</h1>
          <h3>{pageSubtitle}</h3>

        </div>
        <div className="archive-news__inner-wrapper">
          {
            newsData.map((item, index) => {
              const { title, featuredImage, categories, slug, language, content } = item
              let previewContnent = doc && createPreviewText(content) + '...'

              return (
                <NewsPreview
                  key={index}
                  firstOfTheIndex={index}
                  image={featuredImage}
                  link={language.slug === 'sr' ? `blog/${slug}` : `en/blog-en/${slug}`}
                  title={title}
                  language={language}
                  authorAvatar={newsData[0].author_section.authorImage && newsData[0].author_section.authorImage.file.image.fluid}
                  authorName={newsData[0].author_section.authorName}
                  category={categories.nodes}
                  content={previewContnent}
                  minsOfread={getMinsOfRead(content)}
                />
              )
            })
          }
        </div>
      </div>
    </section>
  )
}
