import React from 'react'
import { Link } from 'gatsby'
import './DemoComponent.scss'

export default function DemoComponent({ demoSection, language }) {

  const { text, title, link } = demoSection;
  console.log(language)
  return (
    <section className="demo">
      <div className="container">
        <div className="demo__wrapper">
          <div className="demo__text">
            <h2>{title}</h2>
            <div dangerouslySetInnerHTML={{ __html: text }}></div>
          </div>
          <div className="demo__link">
            <Link to={link.url} className={`${language === 'sr' ? 'demo-footer-sr' : 'demo-footer-en'} button button-lg demo-footer demo__link`}>{link.title}</Link>
          </div>
        </div>
      </div>
    </section>

  )
}