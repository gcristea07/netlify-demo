import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const AboutPageTemplate = ({ title, content, contentComponent, firstSection }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <div>
                <h2>{firstSection.title}</h2>
                <h2>{firstSection.description}</h2>
                <img src={firstSection.desktopImage} />
              </div>
              <PageContent className="content" content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  firstSection: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    desktopImage: PropTypes.string,
    mobileImage: PropTypes.string,
  }),
}

const AboutPage = ({ data }) => {
  const {frontmatter} = data.markdownRemark;

  console.log(frontmatter);

  return (
    <Layout>
      <AboutPageTemplate
        contentComponent={HTMLContent}
        title={frontmatter.title}
        content={frontmatter.html}
        firstSection={frontmatter.firstSection}
      />
    </Layout>
  )
};

AboutPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        firstSection {
          public
          title
          description
          desktopImage
          mobileImage
      }
      }
    }
  }
`
