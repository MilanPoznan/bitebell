import React from 'react'
import './YtModal.scss'

export default function YtModal({ setShowVideo, language }) {


  function hideVideo() {
    setShowVideo(false)
    document.body.classList.remove('no-scroll')

  }
  function YTIframe() {
    if (language == 'sr') {
      return (
        <iframe src="https://www.youtube.com/embed/s0o-LCqfVz0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      )
    } else {
      return (
        <iframe
          src="https://www.youtube.com/embed/-UZYsh-1t1I"
          title="Bitebell Video" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen></iframe>
      )
    }
  }


  return (
    <div className='yt'>
      <div className="yt__close" onClick={hideVideo}></div>
      {YTIframe()}
    </div>
  )
}
