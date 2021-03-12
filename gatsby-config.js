require('dotenv').config({
  path: '.env'
  // path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: 'Web Dev II',
    description: `Curso de Programação para Web do IFPI Campus Picos.`, // eslint-disable-line
    author: 'Jesiel Viana <jesiel@ifpi.edu.br>',
    keywords: ['web', 'js', 'html', 'css', 'ifpi', 'script', 'http', 'ensino'],
    image: 'https://s3.amazonaws.com/riploventures/cis197-bg.png'
  },
  plugins: [
    'gatsby-plugin-dark-mode',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images` // eslint-disable-line
      }
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/markdown`, // eslint-disable-line
        name: 'markdown'
      }
    },
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/json`, // eslint-disable-line
        name: 'json'
      }
    },
    'gatsby-transformer-json',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'WebDev',
        short_name: 'WebDev',
        start_url: '/',
        background_color: '#FFFFFF',
        theme_color: '#573D7C',
        display: 'standalone',
        icon: 'src/images/icon.png' // Path is relative to site root
      }
    },
    {
      // For MD files...
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false
            }
          }
        ]
      }
    },
    {
      // For MDX files...
      resolve: 'gatsby-plugin-mdx',
      options: {
        plugins: ['gatsby-remark-copy-linked-files']
      }
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [process.env.GA_TRACKING_ID]
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              disableBgImage: true
            }
          }
        ]
      }
    }
  ]
}
