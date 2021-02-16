import React, { useState } from 'react'
//Components 
import CountrySelect from './CountrySelect'
//Hooks
import { fetchWithTimeout } from '../utils/utils'
//Styles
import './PartnershipForm.scss'

export default function DemoForm({ data, language }) {

  const {
    imeGrupa: { ime, imeObavezno, showIme },
    emailGroup: { email, emailRequired, showEmail },
    phoneGroup: { phoneText, isPhoneRequired, showPhoneField },
    locationGroup: { locationText, isLocationRequired, showLocation },
    posFieldGroup: { posFieldText, isPosRequired, showPosField },
    restaurant: { restaurantName, restaurantNameRequired, restaurantNameShow }
  } = data
  const isLangEn = language === 'en';


  const [nameField, setNameField] = useState('')
  const [emailField, setEmailField] = useState('');
  const [phoneField, setPhoneField] = useState('');
  const [locationField, setLocationField] = useState('');
  const [posSelect, setPosSelect] = useState('');
  const [restaurantField, setRestaurantField] = useState('');

  const [submited, setSubmited] = useState(false)

  const validateEmail = (email) => {
    let regularExpression = /^(([^.\s@]+(\.[^.\s@]+)*))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;

    if (regularExpression.test(email)) {
      return true;
    }
    return false;
  }

  const checkIsFieldValid = (isRequired, fieldValue) => isRequired ? !!fieldValue : true
  const onSubmit = () => console.log('asd')
  return (
    <form className="partnership-form" id="demoPartnership">
      <h2>Become a partner</h2>
      <div className="row">
        <div className="partnership-form__fields-wrap">

          {showIme &&
            <div className="partnership-form__input-wrap">
              <input
                value={nameField}
                onChange={(e) => setNameField(e.target.value)}
                type="text"
                required={imeObavezno ? true : false}
                name="name"
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className={`${!!nameField ? 'fulfilled' : ''}`}>{ime}{imeObavezno ? '*' : ''}</label>
            </div>
          }

          {showEmail &&
            <div className="partnership-form__input-wrap">
              <input
                type="email"
                value={emailField}
                onChange={(e) => setEmailField(e.target.value)}
                required={emailRequired ? true : false}
                name="email"
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className={`${!!emailField ? 'fulfilled' : ''}`}>{email}{emailRequired ? '*' : ''}</label>
            </div>
          }
        </div>

        <div className="partnership-form__fields-wrap country-wrapp">
          <CountrySelect />
          {showPhoneField &&
            <div className="partnership-form__input-wrap">
              <input
                type="number"
                value={phoneField}
                onChange={(e) => setPhoneField(e.target.value)}
                required={isPhoneRequired ? true : false}
                name="phone" />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className={`${!!phoneField ? 'fulfilled' : ''}`}>{phoneText}{isPhoneRequired ? '*' : ''}</label>
            </div>
          }
        </div>

        {showLocation &&
          <div className="partnership-form__input-wrap">
            <input
              type="text"
              value={locationField}
              onChange={(e) => setLocationField(e.target.value)}
              required={isLocationRequired ? true : false}
              name="location" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className={`${!!locationField ? 'fulfilled' : ''}`}>{locationText}{isLocationRequired ? '*' : ''}</label>
          </div>
        }

        {showPosField &&
          <div className="partnership-form__input-wrap">
            <input
              type="text"
              value={posSelect}
              onChange={(e) => setPosSelect(e.target.value)}
              required={isPosRequired ? true : false}
              name="pos" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className={`${!!posSelect ? 'fulfilled' : ''}`}>{posFieldText}{isPosRequired ? '*' : ''}</label>
          </div>
        }
        {restaurantNameShow &&
          <div className="partnership-form__input-wrap">

            <input
              type="text"
              value={restaurantField}
              onChange={(e) => setRestaurantField(e.target.value)}
              required={restaurantNameRequired ? true : false}
              name="notes"
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className={`${!!restaurantField ? 'fulfilled' : ''}`}>{restaurantName}{restaurantNameRequired ? '*' : ''}</label>
          </div>
        }
        <button
          onClick={onSubmit}
          className="partnership-form__submit-btn"
        >
          {isLangEn ? 'Submit' : 'Potvrdite'}
        </button>
      </div>

    </form>
  )
}
