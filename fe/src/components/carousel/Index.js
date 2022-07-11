import React from 'react'
import './styles.css'

export default function Carousel() {
  return (
    <div className='caro'>
      <section id="slider">
        <input type="radio" name="slider" id="s1"/>
        <input type="radio" name="slider" id="s2"/>
        <input type="radio" name="slider" id="s3" checked/>
        <input type="radio" name="slider" id="s4"/>
        <input type="radio" name="slider" id="s5"/>
        <label for="s1" id="slide1">
          <img className='s1' src={require('../../images/img-banner.png')} />
        </label>
        <label for="s2" id="slide2">
          <img className='s1' src={require('../../images/img-banner.png')} />
        </label>
        <label for="s3" id="slide3">
          <img className='s1' src={require('../../images/img-banner.png')} />
        </label>
        <label for="s4" id="slide4">
          <img className='s1' src={require('../../images/img-banner.png')} />
        </label>
        <label for="s5" id="slide5">
          <img className='s1' src={require('../../images/img-banner.png')} />
        </label>
      </section>
    </div>
  )
}
