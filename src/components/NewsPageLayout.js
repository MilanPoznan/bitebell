import React from 'react'

import NewsPreview from './NewsPreview'
import FeaturedPost from './FeaturedPost'

import './NewsPageLayout.scss'

import { getMinsOfRead } from '../utils/utils'

/**
 * NewsPageLayout component
 * 
 * @returns {JSX Element}
 */
export default function NewsPageLayout({ newsData, pageTitle, pageSubtitle }) {

  const featuredPost = newsData.filter(post => post.isPostFeatured.featuredPost)[0]

  const postsWithoutFeatured = newsData.filter(post => post.title !== featuredPost.title)

  return (
    <section className="archive-news">
      <div className="archive-news__outer-wrapper">
        <div className="archive-news__titles">
          <h1>{pageTitle}</h1>
          <h3>{pageSubtitle}</h3>

        </div>
        <div className="archive-news__inner-wrapper">
          <FeaturedPost
            title={featuredPost.title}
            language={featuredPost.language}
            link={featuredPost.language.slug === 'sr' ? `blog/${featuredPost.slug}` : `en/blog-en/${featuredPost.slug}`}
            authorName={featuredPost.author_section.authorName}
            image={featuredPost.featuredImage}
            minsOfread={getMinsOfRead(featuredPost.content)}
            content={featuredPost.isPostFeatured.featuredPost.previewText}


          />
          {
            postsWithoutFeatured.map((item, index) => {
              const { title, previewText, featuredImage, categories, slug, language, content } = item
              return (
                <NewsPreview
                  key={index}
                  firstOfTheIndex={index}
                  image={featuredImage}
                  link={language.slug === 'sr' ? `blog/${slug}` : `en/blog-en/${slug}`}
                  title={title}
                  language={language}
                  category={categories.nodes}
                  content={previewText}
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
