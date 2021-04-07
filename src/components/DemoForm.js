import React, { useState, useRef } from 'react'
//Components 
import CountrySelect from './CountrySelect'
//Hooks
import { fetchWithTimeout } from '../utils/utils'
//Styles
import './PartnershipForm.scss'

import ReCAPTCHA from 'react-google-recaptcha'


export default function DemoForm({ data, language, setIsFormSuccessfullySubmited }) {

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
  const [phoneSelect, setPhoneSelect] = useState('+381');

  const [locationField, setLocationField] = useState('');
  const [posSelect, setPosSelect] = useState('');
  const [restaurantField, setRestaurantField] = useState('');

  const [submited, setSubmited] = useState(false)

  const recaptchaRef = useRef(null)

  const validateEmail = (email) => {
    let regularExpression = /^(([^.\s@]+(\.[^.\s@]+)*))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;

    if (regularExpression.test(email)) {
      return true;
    }
    return false;
  }

  const sendFormData = data => fetch(`https://dev.bitebell.com/wp-json/bitebell/v1/forms`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }
  )

  /**
  * 
  * @param {boolean} isRequired getting data from backend from true/false field 
  * @param {string} fieldValue state field value 
  * 
  * If field is required it will return fieldValue value in bool type
  * If field is not required it will return true automatically and if statement will pass 
  */
  const checkIsFieldValid = (isRequired, fieldValue) => isRequired ? !!fieldValue : true

  const onSubmit = async (e) => {

    e.preventDefault();

    const token = recaptchaRef.current && await recaptchaRef.current.executeAsync()
    recaptchaRef.current && recaptchaRef.current.reset()

    setSubmited(true)

    if (
      checkIsFieldValid(imeObavezno, nameField) && //Name field
      validateEmail(emailField) && //Email Field
      checkIsFieldValid(isPhoneRequired, phoneField) && //Phone field
      checkIsFieldValid(isLocationRequired, locationField) && //Location field 
      checkIsFieldValid(isPosRequired, posSelect) && //POS field
      checkIsFieldValid(restaurantNameRequired, restaurantField) //Restaurant field
    ) {
      fetchWithTimeout(
        sendFormData,
        {
          full_name: nameField,
          email: emailField,
          phone: phoneField,
          phone_select: phoneSelect,
          location: locationField,
          restaurant: restaurantField,
          pos: posSelect,
          form_type: 'demo',
          token: token
        },
        1000
      )
        .then(response => {
          console.log('response', response)
          if (!response.ok) {
            throw new Error(`${response.statusText}`)
          } else {
            setIsFormSuccessfullySubmited(true)
          }
        })
        .catch(e => {
          console.error(e)
        })
    } else {
      console.log('Form empty')
    }
  }
  return (
    <>
      <form className="partnership-form" id="demoPartnership">
        <h2>{isLangEn ? "Schedule a free demo" : "Zakažite besplatnu demonstraciju"}</h2>
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
                {submited && imeObavezno && nameField === '' && <div className="partnership-form__input-label-error"> {isLangEn ? 'This field is required.' : 'Ovo polje je obavezno'}</div>}

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
                {submited && emailRequired && emailField === '' && <div className="partnership-form__input-label-error"> {isLangEn ? 'This field is required.' : 'Ovo polje je obavezno'}</div>}

              </div>
            }
          </div>

          <div className="partnership-form__fields-wrap country-wrapp">
            <CountrySelect setPhoneSelect={setPhoneSelect} phoneSelect={phoneSelect} />
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
                {submited && isPhoneRequired && phoneField === '' && <div className="partnership-form__input-label-error"> {isLangEn ? 'This field is required.' : 'Ovo polje je obavezno'}</div>}

              </div>
            }
          </div>



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
              {submited && restaurantNameRequired && restaurantField === '' && <div className="partnership-form__input-label-error"> {isLangEn ? 'This field is required.' : 'Ovo polje je obavezno'}</div>}

            </div>
          }

          {showLocation &&
            <div className="partnership-form__input-wrap">
              <input
                type="number"
                value={locationField}
                onChange={(e) => setLocationField(e.target.value)}
                required={isLocationRequired ? true : false}
                name="location" />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className={`${!!locationField ? 'fulfilled' : ''}`}>{locationText}{isLocationRequired ? '*' : ''}</label>
              {submited && isLocationRequired && locationField === '' && <div className="partnership-form__input-label-error"> {isLangEn ? 'This field is required.' : 'Ovo polje je obavezno'}</div>}

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
              {submited && isPosRequired && posSelect === '' && <div className="partnership-form__input-label-error"> {isLangEn ? 'This field is required.' : 'Ovo polje je obavezno'}</div>}

            </div>
          }
          <button
            onClick={(e) => onSubmit(e)}
            className="partnership-form__submit-btn"
          >
            {isLangEn ? 'Submit' : 'Potvrdite'}
          </button>
        </div>

      </form>
      {/* <ReCAPTCHA
        sitekey="6LdV910aAAAAAM_4ajAwKPMQyzr_z38Hm7NTXrIR"
        size="invisible"
        ref={recaptchaRef}
      /> */}
    </>
  )
}
