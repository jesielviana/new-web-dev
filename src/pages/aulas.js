import React from 'react'
import PropTypes from 'prop-types'

import Layout from '../templates/Layout'
import SEO from '../components/seo'
import { Lectures } from '../fragments'
/* eslint-disable react/jsx-pascal-case */
const LecturesPage = ({ location }) => (
  <Layout location={location}>
    <SEO
      title='Aulas'
      description='Aulas do Curso de Programação para Internet II - ADS IFPI Picos'
    />
    <h1>Aulas</h1>
    <Lectures />
  </Layout>
)

LecturesPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  })
}

export default LecturesPage
