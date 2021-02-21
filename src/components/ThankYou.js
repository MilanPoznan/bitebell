import React from 'react'

import './ThankYou.scss';

export default function ThankYou({ data }) {
  return (
    <section className="thank-you container">
      <h2 style={{ marginBottom: '40px' }}>Thank you for reaching out to us!</h2>
      <p>Your request has been submitted. Our team will contact you at the earliest convenience.</p>
    </section>
  )
}
