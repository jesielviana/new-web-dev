import React from 'react'
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import s from 'styled-components'

import './layout.css'

import { maxWidth, TABLET } from '../constants/widths'
import Header from '../components/Header'
import Breadcrumbs from '../components/Breadcrumbs'
import sharedStyles from './sharedStyles'

const Wrapper = s.div`
  width: 100%;
  font-size: 1.2rem;
  display: flex;

  ${maxWidth(TABLET)} {
    display: block;
    font-size: 1rem;
  }
`

const Content = s.div`
  flex: 1;
  padding: calc(1rem + 1.5%) calc(3% + 1rem);
  min-height: calc(100vh - 60px);
  display: block;
  box-sizing: border-box;
  position: relative;
  width: 80vw;

  ${maxWidth(TABLET)} {
    width: 100%;
  }

  ${sharedStyles}
`

const Layout = ({ children, location }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <Wrapper>
        <Header siteTitle={data.site.siteMetadata.title} />
        <Content>
          <Breadcrumbs location={location} />
          <ThemeToggler>
            {({ theme, toggleTheme }) => (
              <label className='toggle-color-btn'>
                <input
                  title={theme === 'dark' ? 'Light' : 'Dark'}
                  className='toggle-color-mode'
                  type='checkbox'
                  onChange={e =>
                    toggleTheme(e.target.checked ? 'dark' : 'light')}
                  checked={theme === 'dark'}
                />{' '}
              </label>
            )}
          </ThemeToggler>
          {children}
        </Content>
      </Wrapper>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
}

export default Layout
