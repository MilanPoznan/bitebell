import React from 'react'
import { Link } from 'gatsby'
import './DemoComponent.scss'

export default function DemoComponent({ demoSection, language }) {

  console.log('demo', demoSection)
  const { text, title, link } = demoSection;
  return (
    <section className="demo">
      <div className="container">
        <div className="demo__wrapper">
          <div className="demo__text">
            <h2>{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
          </div>
          <div className="demo__link">
            {link && <Link to={link.url} className={`${language === 'sr' ? 'demo-footer-sr' : 'demo-footer-en'} button button-lg demo-footer demo__link`}>{link.title}</Link>}
          </div>
        </div>
      </div>
    </section>

  )
}