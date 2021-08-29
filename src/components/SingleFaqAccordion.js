import React, { useState } from 'react'
import { AccordionContainer, AccordionTitle, AccordionSubTitle } from './Faq.styled'

export default function SingleFaqAccordion({ accData }) {

  const [isOpen, setIsOpen] = useState(false)
  const { accordionContent, acordionTitle, category } = accData

  return (
    <AccordionContainer>
      <AccordionTitle
        onClick={() => setIsOpen(isOpen => !isOpen)}
        isOpen={isOpen}
      >{acordionTitle}
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z">
          </path>
        </svg>
      </AccordionTitle>
      {isOpen &&
        <AccordionSubTitle className="content" dangerouslySetInnerHTML={{ __html: accordionContent }}></AccordionSubTitle>
      }
    </AccordionContainer>
  )
}
