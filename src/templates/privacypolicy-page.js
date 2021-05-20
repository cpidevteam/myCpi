import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import scrollTo from 'scroll-to';
import { graphql } from 'gatsby';

import Layout from '../layouts';
import Head from '../components/Head';
import Header from '../sections/header';
import Footer from '../sections/footer';
import Feedback from '../sections/feedback';
import PrivacyPolicy from '../sections/privacypolicy';

class PrivacyPolicyPage extends React.Component {
  constructor(props) {
    super(props);
    this.sections = {};
    this.state = {
      currentSection: 'home',
      navigating: false,
    };
    this.handleSectionRef = this.handleSectionRef.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleScroll = this.handleScroll.bind(this); // maybe put throttling here
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    if (this.state.navigating) {
      return;
    }

    const sectionKeys = Object.keys(this.sections);
    if (sectionKeys.length === 7) {
      // all sections rendered
      const currentSection = sectionKeys.find(key => {
        const rect = this.sections[key].getBoundingClientRect();
        return (
          rect.top < window.innerHeight / 2 &&
          rect.bottom > window.innerHeight / 2
        );
      });

      if (this.state.currentSection !== currentSection) {
        this.setState({
          currentSection,
        });
      }
    }
  }

  handleNavigate(newSection) {
    const section = this.sections[newSection];
    const rect = section.getBoundingClientRect();
    const duration = 900;
    scrollTo(0, window.scrollY + rect.top - 100, {
      duration,
      ease: 'inQuad',
    });
    this.setState({
      currentSection: newSection,
      navigating: true,
    });
    setTimeout(() => {
      this.setState({
        navigating: false,
      });
    }, duration);
  }

  handleSectionRef(refName) {
    return node => {
      if (node) {
        this.sections[refName] = findDOMNode(node); // eslint-disable-line
        this.handleScroll();
      }
    };
  }

  render() {
    const {
      data: {
        settings,
        feedback: { frontmatter: feedback },
        privacypolicy,
        footer,
      },
    } = this.props;

    return (
      <Layout>
        <Head {...settings} />
        <Header
          secondary
          socials={settings.frontmatter.socials}
          saidAbout={settings.frontmatter.said_about}
          scrolled
          menuUrls={{ home: '/', faq: '/faq' }}
          menu={{
            about: 'About us',
            token: 'Token',
            roadmap: 'Roadmap',
            team: 'Team',
          }}
        />
        <PrivacyPolicy {...privacypolicy} />
        <Feedback {...feedback} />
        <Footer {...footer} email={settings.frontmatter.email} />
      </Layout>
    );
  }
}

PrivacyPolicyPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default PrivacyPolicyPage;

export const pageQuery = graphql`
  query PrivacyPolicyQuery($id: String!) {
    privacypolicy: markdownRemark(id: { eq: $id }) {
      content: html
    }
    settings: markdownRemark(fields: { slug: { eq: "/" } }) {
      frontmatter {
        title
        said_about
        email
        socials {
          facebook
          github
          linkedin
          twitter
          telegram
        }
        gtmId
        intercomId
        meta {
          description
          keywords
          og {
            image
            locale
            type
            title
            description
            url
            site_name
          }
          twitter {
            card
            title
            description
          }
          canonical
        }
      }
    }

    feedback: markdownRemark(fields: { slug: { eq: "/feedback/" } }) {
      frontmatter {
        inputemail
        userid
        listid
        url
      }
    }

    footer: markdownRemark(fields: { slug: { eq: "/footer/" } }) {
      settings: frontmatter {
        links {
          title
          href
          show
        }
      }
      copyright: html
    }
  }
`;
