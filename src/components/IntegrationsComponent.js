import React, { useState, useRef } from 'react'
import { Link } from 'gatsby'
import BackgroundImage from 'gatsby-background-image'

import './integrationsComponent.scss'

export default function IntegrationsComponent({ integrationsFields, integrations, currLangIntegrationType, currLang }) {

  const [currIntegrations, setCurrIntegrations] = useState(integrations)
  const { title, subtitle } = integrationsFields

  const showAllRefTab = useRef(null)
  const otherTabsRef = useRef([])

  otherTabsRef.current = currLangIntegrationType.map(item => React.createRef())


  //Filter integrations on click
  const filterIntegrations = (currValue) => {

    let filteredIntegrations = []

    integrations.map(integrations => {
      const { integrations_type: { nodes } } = integrations
      nodes.map(item => item.name === currValue && filteredIntegrations.push(integrations))
    })

    return setCurrIntegrations(filteredIntegrations)
  }

  const removeClassListFromRef = () => otherTabsRef.current.map(item => item.current.classList.remove('integrations-tabs__link--active'))
  //Set active class to tabs
  const setActiveClassToTab = (activeRef, name) => {
    if (name === 'all') {
      activeRef.current.classList.add('integrations-tabs__link--active')
      removeClassListFromRef()
    } else {
      showAllRefTab.current.classList.remove('integrations-tabs__link--active')
      removeClassListFromRef()
      activeRef.current.classList.add('integrations-tabs__link--active')
    }
  }


  return (

    <div>
      {/* Integrations header */}
      <section className="integrations-header">
        <div className="container">
          <div className="text-box">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
        </div>
      </section>

      {/* Integrations compoennt */}
      <section className="integrations">
        <div className="container">
          <div className="integrations-tabs">
            <div className="integrations-tabs-wrapper">
              <div className="integrations-tabs-inner">
                <div
                  className="integrations-tabs__link integrations-tabs__link--active"
                  onClick={() => {
                    setCurrIntegrations(integrations)
                    setActiveClassToTab(showAllRefTab, 'all')

                  }}
                  ref={showAllRefTab}
                >
                  {currLang === 'sr' ? 'Prikaži sve' : 'Show All'}
                </div>

                {currLangIntegrationType.map((type, index) =>
                  <div
                    key={index}
                    className="integrations-tabs__link"
                    value={type.name}
                    onClick={(e) => {
                      filterIntegrations(e.target.innerHTML)
                      setActiveClassToTab(otherTabsRef.current[index], 'allTabs')
                    }}
                    ref={otherTabsRef.current[index]}
                  >
                    {type.name}
                  </div>)}
              </div>
              <Link to={`${currLang === 'sr' ? '/partnerstva' : '/en/partnerships'} `}>{currLang === 'sr' ? 'Postanite naš partner! →' : 'Partner with us!'}</Link>
            </div>
          </div>
        </div>

        {/* Integrations cards */}
        <div className="container">
          <div className="integrations-content">

            {currIntegrations.map((item, index) => {

              const { title, featuredImage, language, integrationsTemplate: { template } } = item

              const labelColors = ['green', 'red', 'default']
              const labelStringsSr = ['novo', 'uskoro', 'default']
              const labelStringsEn = ['new', 'soon', 'default']

              const defineLabel = (array) => {
                switch (template) {
                  case 'new':
                    return array[0]
                  case 'soon':
                    return array[1]
                  case 'default':
                    return array[2]
                }
              }
              console.log(title)
              return (
                <div className="mix" key={index}>
                  <span className={`integration-label ${defineLabel(labelColors)}-label`}>{defineLabel(language.slug == 'sr' ? labelStringsSr : labelStringsEn)}</span>
                  <BackgroundImage className='integrations-content__image' fluid={featuredImage.node.file.image.fluid} />
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
