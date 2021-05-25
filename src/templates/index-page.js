import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import scrollTo from 'scroll-to';
import { graphql } from 'gatsby';
import Head from '../components/Head';
import Layout from '../layouts';
import SaleInfo from '../sections/sale-info';
import About from '../sections/about';
import Showcase from '../sections/Showcase';
import Platform from '../sections/platform';
import Functionality from '../sections/functionality';
import Allocation from '../sections/allocation';
import Roadmap from '../sections/roadmap';
import Team from '../sections/team';
import Media from '../sections/media';
import Partners from '../sections/partners';
import Feedback from '../sections/feedback';
import Header from '../sections/header';
import Footer from '../sections/footer';
import CookieNotice from '../components/CookieNotice';
import { console } from 'window-or-global';

class IndexPage extends React.Component {
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
    const section = window.location.hash.replace('#', '');
    if (section) {
      window.history.replaceState('', '', '.');
      setTimeout(() => {
        this.handleNavigate(section);
      }, 100);
    }
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

  handleNavigate(newSection, isLink) {
    const section = this.sections[newSection];
    if (section) {
      if (isLink) {
        this.setState({
          currentSection: newSection,
        });
        return;
      }

      const rect = section.getBoundingClientRect();
      const duration = 900;
      const header = findDOMNode(this.header); // eslint-disable-line
      const height = parseInt(window.getComputedStyle(header).height, 10);
      scrollTo(0, window.scrollY + rect.top - height + 11, {
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
  }

  handleSectionRef(refName) {
    console.log('ccccc : ', refName);
    return node => {
      if (node) {
        this.sections[refName] = findDOMNode(node); // eslint-disable-line
        this.handleScroll();
      }
    };
  }

  renderSection(sectionName, SectionComponent) {
    return (
      <div ref={this.handleSectionRef(sectionName)}>
        <SectionComponent />
      </div>
    );
  }

  render() {
    console.log('ppppppp : ', this.props);
    const {
      data: {
        showcase: { frontmatter: showcase },
        about: { frontmatter: about },
        roadmap: { frontmatter: roadmap },
        team: { frontmatter: team },
        advisors: { frontmatter: advisors },
        media: { frontmatter: media },
        // showcase,
        settings,
        partners,
        platform,
        saleInfo,
        feedback: { frontmatter: feedback },
        token,
        prefooter: { frontmatter: prefooter },
        footer,
      },
    } = this.props;

    console.log(saleInfo, ':::::: SALE INFO');
    const { currentSection } = this.state;
    return (
      <Layout>
        {settings.gtmId && (
          <noscript>
            <iframe
              title="gtm"
              src={`https://www.googletagmanager.com/ns.html?id=${settings.gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Head {...settings} />
        <Header
          currentSection={currentSection}
          onNavigate={this.handleNavigate}
          socials={settings.frontmatter.socials}
          saidAbout={settings.frontmatter.said_about}
          menuUrls={{ home: '.', faq: 'faq' }}
          menu={{
            showcase: 'Showcase',
            about: 'About us',
            token: 'Token',
            roadmap: 'Roadmap',
            team: 'Team',
          }}
          ref={header => {
            this.header = header;
          }}
        />
        <div ref={this.handleSectionRef('home')} id="home">
          <SaleInfo {...saleInfo} feedback={{ ...feedback }} />
        </div>
        <div ref={this.handleSectionRef('showcase')} id="showcase">
          <Showcase {...showcase} showcase={{ ...showcase }} />
        </div>
        <div ref={this.handleSectionRef('about')} id="about">
          <About {...about} />
          <Platform {...platform} />
        </div>
        <div ref={this.handleSectionRef('token')} id="token">
          <Functionality {...token} />
          <Allocation {...token} />
        </div>
        <div ref={this.handleSectionRef('roadmap')} id="roadmap">
          <Roadmap title={roadmap.title} list={roadmap.steps} />
        </div>
        <div ref={this.handleSectionRef('team')} id="team">
          <Team {...team} />
        </div>
        <div ref={this.handleSectionRef('advisors')} id="advisors">
          <Team {...advisors} />
        </div>
        {!prefooter.hide && (
          <div ref={this.handleSectionRef('pre-footer')} id="pre-footer">
            <About {...prefooter} />
          </div>
        )}
        {!partners.settings.hide && (
          <div ref={this.handleSectionRef('partners')} id="partners">
            <Partners {...partners} />
          </div>
        )}
        {!media.hide && (
          <div ref={this.handleSectionRef('media')} id="media">
            <Media {...media} />
          </div>
        )}

        <Footer {...footer} email={settings.frontmatter.email} />
        <CookieNotice text={settings.frontmatter.cookienotice} />
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexQuery($id: String!) {
    settings: markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        cookienotice
        said_about
        socials {
          facebook
          github
          linkedin
          twitter
          telegram
        }
        gtmId
        email
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
      head: html
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

    feedback: markdownRemark(fields: { slug: { eq: "/feedback/" } }) {
      frontmatter {
        inputemail
        userid
        listid
        url
        successMsg
      }
    }

    showcase: markdownRemark(fields: { slug: { eq: "/Showcase/" } }) {
      frontmatter {
        title
        text
        videos {
          embed
          label
        }
        adds {
          embed
          label
        }
        banners {
          image
          text
        }
      }
    }
    about: markdownRemark(fields: { slug: { eq: "/about/" } }) {
      frontmatter {
        title
        subtitle
        content {
          image
          text
          videos {
            embed
            label
          }
        }
        featcontent {
          image
          text
        }
      }
    }

    prefooter: markdownRemark(fields: { slug: { eq: "/pre-footer/" } }) {
      frontmatter {
        hide
        title
        subtitle
        content {
          image
          text
          videos {
            embed
            label
          }
        }
        featcontent {
          image
          text
        }
      }
    }

    roadmap: markdownRemark(fields: { slug: { eq: "/roadmap/" } }) {
      frontmatter {
        title
        steps {
          title
          descr
          done
        }
      }
    }

    team: markdownRemark(fields: { slug: { eq: "/team/" } }) {
      frontmatter {
        title
        members {
          photo
          name
          pos
          company
          bio
          facebook
          github
          linkedin
          twitter
        }
      }
    }

    advisors: markdownRemark(fields: { slug: { eq: "/advisors/" } }) {
      frontmatter {
        title
        members {
          photo
          name
          pos
          company
          bio
          facebook
          github
          linkedin
          twitter
        }
      }
    }

    partners: markdownRemark(fields: { slug: { eq: "/partners/" } }) {
      settings: frontmatter {
        title
        hide
        partners {
          logo
          alt
          href
        }
      }
      contacts: html
    }

    saleInfo: markdownRemark(fields: { slug: { eq: "/sale-info/" } }) {
      settings: frontmatter {
        whitePaper
        whitePaperLabel
        details
        detailsLabel
        crowdsale
        crowdsaleLabel
        crowdsaleAddr
        countDownTo
        web3ProviderUrl
        total
        price
        extraSold
        showMinimum
        hideCountdown
        minimum
        stageNames
        icoTitle
      }
      intro: html
    }

    token: markdownRemark(fields: { slug: { eq: "/token/" } }) {
      settings: frontmatter {
        funcTitle
        allocationTitle
        crowdsale
        informationTitle
        detailsTitle
        btntext
        stages {
          label
          current
          title
          subtitle
        }
        allocation {
          label
          percent
        }
        information {
          label
          percent
        }
        icoSupply
        supply
      }
      intro: html
    }

    platform: markdownRemark(fields: { slug: { eq: "/platform/" } }) {
      frontmatter {
        title
        animation
        video
        videourl
        showCharts
        image
      }
      content: html
    }

    media: markdownRemark(fields: { slug: { eq: "/media/" } }) {
      frontmatter {
        hide
        articles {
          date
          logo
          title
          url
        }
        title
      }
    }
  }
`;
