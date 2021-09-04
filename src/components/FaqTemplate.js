import React, { useState, useEffect, useRef } from 'react'
import SingleFaqAccordion from './SingleFaqAccordion'
import { CategoryMobileTitle, SelectWrapper, SingleOption, FilterWrapper, DesktopWrapper, SelectFilter, AccordionWrapper, FaqSearch, FaqInput, FaqHeader, Title, Subtitle, FaqContainer } from './Faq.styled'
import DemoComponent from './DemoComponent'

export default function FaqTemplate({ title, subtitle, accordionArray, demoSection, language }) {
  console.log(language)
  const [inputVal, setinputVal] = useState('')
  const [accordionState, setaAcordionState] = useState([])
  const [options, setOptions] = useState()
  const [activeFiler, setActiveFiler] = useState(0)
  const [currCategory, setCurrCategory] = useState('all')

  const selectRef = useRef(null)

  function setCategories() {
    const categories = accordionArray.reduce((acc, curr) => {
      !acc.includes(curr.category) && acc.push(curr.category)
      return acc
    }, [])
    let categoryName = language === 'sr' ? 'sve' : 'all'
    categories.unshift(categoryName)
    return categories
  }


  function handleOnChangeInput() {
    const x = accordionArray.filter(item => item.acordionTitle.includes(inputVal) || item.accordionContent.includes(inputVal))
    setaAcordionState(x)
  }

  function filterArray() {
    if (currCategory === 'all') return accordionArray
    const x = accordionArray.filter(item => item.category === currCategory)
    return x
  }
  function handleOnFiler(e, index) {
    setCurrCategory(e.target.innerText.toLowerCase())
    setActiveFiler(index)
  }

  useEffect(() => {
    setaAcordionState(accordionArray)
    setOptions(setCategories())
    console.log(setCategories())
  }, [])

  useEffect(() => {
    handleOnChangeInput()
  }, [inputVal])
  useEffect(() => {
    setaAcordionState(filterArray())
  }, [currCategory])

  return (
    <>
      <FaqContainer>
        <FaqHeader>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </FaqHeader>

        {/* <FaqSearch>
        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#575757">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
        <FaqInput placeholder="What do you want to know" value={inputVal} onChange={(e) => setinputVal(e.target.value)} />
      </FaqSearch> */}

        <CategoryMobileTitle>{language === 'sr' ? 'Kategorije' : 'Topic'}</CategoryMobileTitle>
        <SelectWrapper>
          <SelectFilter onChange={(e) => setCurrCategory(e.target.value.toLocaleLowerCase())} ref={selectRef}>
            {options && options.map(item => <option key={item} value={item}>{item}</option>)}
          </SelectFilter>
          <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"
            onClick={() => console.log(selectRef.current)}
          >
            <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
            <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z" />
          </svg>
        </SelectWrapper>

        <DesktopWrapper>

          <FilterWrapper>
            <p style={{ fontSize: "20px", marginBottom: '14px' }}>{language === 'sr' ? 'Kategorije' : 'Topic'}</p>
            {options && options.map((item, index) =>
              <SingleOption
                key={item}
                value={item}
                isActive={activeFiler === index}
                onClick={(e) => handleOnFiler(e, index)}
              >{item}</SingleOption>)
            }
          </FilterWrapper>

          <AccordionWrapper>
            {accordionState.map((accData, index) => <SingleFaqAccordion key={index} accData={accData} />)}
          </AccordionWrapper>
        </DesktopWrapper>


      </FaqContainer>
      <div style={{ marginBottom: '30px' }}></div>
      <DemoComponent demoSection={demoSection} language={language} />
    </>
  )
}
