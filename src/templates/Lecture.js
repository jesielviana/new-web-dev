import React, { Component } from 'react'
import { Link } from 'gatsby'
import s from 'styled-components'
import PropTypes from 'prop-types'

import sharedStyles from './sharedStyles'
import { maxWidth, PHONE, minWidth, TABLET } from '../constants/widths'
import { HOME_ROUTE, TEACHER_HOME } from '../constants/routes'
import { GRAY } from '../constants/colors'
import logo from '../images/webpage.svg'

const LEFT_KEY_CODE = 'ArrowLeft'
const RIGHT_KEY_CODE = 'ArrowRight'
const P_CODE = 'KeyP'
/* eslint-disable react/jsx-handler-names */
const Header = s.div`
  background-color: #fff;
  height: 3.1rem;
  position: fixed;
  width: 100%;
`

const Wrapper = s.div`
  ${sharedStyles}

  display: flex;
  height: 100vh;
  width: 100%;
  padding: calc(1rem + 5%) calc(1rem + 20%);
  font-size: 1.5rem;
  overflow: auto;

  h1 {
    font-size: 2.5rem;
    ${maxWidth(PHONE)} {
      font-size: 1.8rem;
    }
  }

  h2, h3 {
    color: #1A202C
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: Yanone Kaffeesatz;
    code {
      font-size: inherit;
      font-size: 80%;
    }
  }

  p {
    line-height: 1.5;
  }

  div {
    width: 100%;
  }

  li {
    margin-bottom: calc(2rem / 2);
    line-height: 1.8rem;

    ${maxWidth(PHONE)} {
      margin-bottom: calc(1.45rem / 2);
      line-height: 1.2;
    }
  }

  .center {
    text-align: center;
  }

  .middle {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .block-text {
    h1 {
      font-size: 4rem;
    }
  }

  .large {
    h1 {
      font-size: 3rem;
      ${maxWidth(PHONE)} {
        font-size: 2rem;
      }
    }
    font-size: 120%;
    line-height: 1.15;
  }

  .medium {
    h1 {
      font-size: 2rem;
      ${maxWidth(PHONE)} {
        font-size: 1.5rem;
      }
    }
    font-size: 100%;
    line-height: 1.5;
  }

  .small {
    font-size: 80%;
    line-height: 1.5;
  }

  ${maxWidth(PHONE)} {
    padding: 5rem 1rem 1rem 1rem;
    font-size: 100%;
  }
`

const LogoLink = s(Link)`
  position: absolute;
  width: 2rem;
  height: auto;
  top: calc(1rem + 5%);
  left: calc(1rem + 5%);
  margin: 0;
  padding: 0;

  ${maxWidth(PHONE)} {
    top: 1rem;
    right: 1rem;
    width: 1.5rem;
  }

  img {
    width: 100%;
    margin: 0;
    padding: 0;
  }
`

const Autor = s.a`
  position: absolute;
  // width: 2rem;
  height: auto;
  top: calc(1rem + 5%);
  right: calc(1rem + 5%);
  margin: 0;
  padding: 0;

  ${maxWidth(PHONE)} {
    top: 1rem;
    right: 1rem;
    // width: 1.5rem;
  }

  img {
    width: 100%;
    margin: 0;
    padding: 0;
  }
`

const Navigation = s.div`
  position: absolute;
  bottom: calc(1rem + 5%);
  padding: 0 calc(1rem + 5%);
  text-align: right;
  width: 100%;

  ${maxWidth(PHONE)} {
    bottom: 0;
    padding: 1rem;
  }

  p {
    display: inline-block;
    margin: 0;
    float: left;
  }
`

const NavLink = s.a`
  margin-left: 1rem;
  cursor: pointer;

  ${minWidth(TABLET)} {
    margin-left: 1.5rem;
  }
`

const SlideCount = s.p`
  color: ${GRAY};
`

/**
 * Takes in a substring of the markdown file, and checks if there should be a class
 * applied to this snippet of markdown (this slide)
 *
 * Here's some example Markdown where this is the case:
 *
 * > class: center, middle, block-text
 * >
 * > # Lecture 1
 * > ## JavaScript Basics and Syntax
 * >
 * > ---
 *
 * In the example, we want to apply the className "center middle block-text"
 *
 * @param {string} str
 * @returns {{ className: string, content: string }}
 */
const parseClass = str => {
  const re = /^<p>class:.*?<\/p>/

  const trimStr = str.trim()

  try {
    const res = re.exec(`${trimStr}`)

    const pTag = res[0]
    const content = pTag.substring(pTag.indexOf(':') + 1, pTag.indexOf('</p>'))
    return {
      className: content.replace(/,/g, '').trim(),
      content: trimStr.split(re)[1]
    }
  } catch (err) {
    return {
      className: '',
      content: trimStr
    }
  }
}

class Lecture extends Component {
  constructor (props) {
    super(props)

    /**
     * Note that an `<hr />` in Markdown is the "---" sequence
     * This is how we split up slides
     */
    const { html } = this.props
    const slides = html.split('<hr>')

    this.state = {
      slide: 0,
      displaySlide: 0,
      slides,
      hidden: false
    }
  }

  componentDidMount () {
    this.matchStateToURL()
    this.detectSwipe()
    document.onkeydown = event => {
      if (!event) return
      const { code } = event
      if (code === P_CODE) {
        this.openFullscreen(document.documentElement)
      } else if (code === LEFT_KEY_CODE) {
        this.prev()
      } else if (code === RIGHT_KEY_CODE) {
        this.next()
      }
    }
  }

  componentDidUpdate () {
    this.matchStateToURL()
  }

  matchStateToURL () {
    const { location: { hash } = { hash: '#0' } } = this.props
    const id = Number(hash.substring(1))

    const { slide } = this.state
    if (slide !== id) {
      this.setState({
        slide: id
      })
    }
  }

  prevValid () {
    const { slide } = this.state
    return slide > 0
  }

  nextValid () {
    console.log('this.nextValid', this.state)
    const { slide, slides } = this.state
    return slide < slides.length - 1
  }

  detectSwipe () {
    document.addEventListener('touchstart', handleTouchStart, false)
    document.addEventListener('touchmove', handleTouchMove, false)

    const instance = this

    let xDown = null
    let yDown = null

    function getTouches (evt) {
      return evt.touches || evt.originalEvent.touches // jQuery
    }

    function handleTouchStart (evt) {
      const firstTouch = getTouches(evt)[0]
      xDown = firstTouch.clientX
      yDown = firstTouch.clientY
    }

    function handleTouchMove (evt) {
      if (!xDown || !yDown) {
        return
      }

      const xUp = evt.touches[0].clientX
      const yUp = evt.touches[0].clientY

      const xDiff = xDown - xUp
      const yDiff = yDown - yUp

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          /* left swipe */
          instance.next()
        } else {
          /* right swipe */
          instance.prev()
        }
      } else {
        if (yDiff > 0) {
          /* up swipe */
        } else {
          /* down swipe */
        }
      }
      /* reset values */
      xDown = null
      yDown = null
    }
  }

  next () {
    console.log('this.state', this)
    const { slide } = this.state
    if (!this.nextValid()) return
    window.location.hash = slide + 1
  }

  prev () {
    const { slide } = this.state
    if (!this.prevValid()) return
    window.location.hash = slide - 1
  }

  openFullscreen (elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen()
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen()
    }
  }

  render () {
    const { slides, slide } = this.state
    const html = slides[slide]
    const numSlides = slides.length

    const { className, content } = parseClass(html)

    return (
      <>
        <Header>
          <LogoLink to={HOME_ROUTE}>
            <img src={logo} alt='Web Dev' />
          </LogoLink>
          <Autor href={TEACHER_HOME} target='_BLANK'>
            @jesielviana
          </Autor>
        </Header>
        <Wrapper>
          <div
            className={className}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Wrapper>
        <Navigation>
          <SlideCount>
            {slide}/{numSlides - 1}
          </SlideCount>
          {this.prevValid() && (
            <NavLink onClick={() => this.prev()}>Prev</NavLink>
          )}
          {this.nextValid() && (
            <NavLink onClick={() => this.next()}>Next</NavLink>
          )}
        </Navigation>
      </>
    )
  }
}

Lecture.propTypes = {
  html: PropTypes.string.isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string
  }).isRequired
}

export default Lecture
