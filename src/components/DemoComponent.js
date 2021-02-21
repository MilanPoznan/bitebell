import React from 'react'
import { Link } from 'gatsby'
import './DemoComponent.scss'

export default function DemoComponent({demoSection}) {

  const {text, title, link} = demoSection;

  return (
    <section className="demo">
      <div className="container">
        <div className="demo__wrapper">
          <div className="demo__text">
            <h2>{title}</h2>
            <div dangerouslySetInnerHTML={{__html: text}}></div>
          </div>
          <div className="demo__link">
            <Link to={link.url} className="button button-lg demo-footer demo-footer-en demo__link">{link.title}</Link>
          </div>
        </div>
      </div>
    </section>
      
  )
}