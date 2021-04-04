import React from 'react'
import { Link } from 'gatsby'

import './RelatedPosts.scss'

export default function RelatedPosts({ relatedPosts, language }) {



  return (<>
    <section className="container related-posts-section">
      <h2>{language === 'sr' ? 'Povezane vesti' : 'Related posts'}</h2>
      <div className="related-posts">
        {relatedPosts.map(post => {
          const permalink = () => language === 'sr'
            ? `blog/${slug}`
            : `en/blog-en/${slug}`
          const { slug, title, featuredImage } = post
          return (<div className="related-posts__single">
            <div className="related-posts__single-image" style={{ backgroundImage: `url(${featuredImage.node.sourceUrl})` }}></div>
            <Link to={`/${permalink()}`}><h5>{title}</h5></Link>
          </div>)
        })}
      </div>
    </section>
  </>
  )
}
