import React from 'react'
import Img from 'gatsby-image'
import { Link } from 'gatsby'

export default function IntegrationsComponent({ integrationsFields, integrations }) {
  console.log('integrations', integrations)
  const { title, subtitle } = integrationsFields
  return (
    <div>
      {/* Integrations header */}
      <header className="header integrations-header">
        <div className="container">
          <div className="text-box">
            <h2>{title}</h2>
            <p><span className="hidden-first-mobile">{subtitle}</span></p>
          </div>
        </div>
      </header>
      {/* Integrations compoennt */}
      <section className="integrations">
        <div className="container">
          <div className="integrations-tabs">
            <div className="integrations-tabs-wrapper">
              <div className="integrations-tabs-inner">
                <div>Show All</div>
                <div>Delivery Platforms</div>
                <div>POS Providers</div>
                <div>Last Mile Logistics</div>
                <div>Online Ordering</div>
              </div>
              <Link to="#">Partner with us!</Link>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="integrations-content">
            {integrations.map(item => {
              const { title, featuredImage, language } = item
              return (
                <div className="mix" key={title}>
                  <Img fluid={featuredImage.node.file.image.fluid} />
                  <span className="integration-name">{title}</span>

                </div>
              )
            })}

          </div>
        </div>
      </section>


    </div>
  )
}
