import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { withPrefix } from 'gatsby-link';
import Container from '../components/container';
import Socials from '../components/socials';
import Section from '../components/section';
import { breakpoints, colors } from '../constants';

const Links = styled.div`
  font-size: 13px;

  margin: 30px 0;

  a {
    color: ${colors.white};
    display: block;
    text-align: center;
    text-decoration: none;
    margin-top: 10px;

    &:first-child {
      margin-top: 0;
    }
    &:hover {
      text-decoration: underline;
    }
  }

  span {
    margin: 0 16px;
    display: none;
    color: ${colors.white};
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    margin: 40px 0;

    span {
      display: inline-block;
    }

    a {
      margin-top: 0;
      display: inline-block;
    }
  }
`;

const Copyright = styled.p`
  font-size: 13px;
  color: ${colors.white};
`;

const FooterContainer = styled(Container)`
  padding-top: 125px;
  padding-bottom: 45px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Footer = ({ settings, copyright, email }) => (
  <Section
    backgroundUrl={withPrefix('/footer-bg.jpg')}
    backgroundColor={colors.primary}
    color={colors.lightGray}
  >
    <FooterContainer>
      <Socials full {...settings.socials} />
      <Links>
        <a href={`mailto:${email}`}>{email}</a>
        <span>&bull;</span>
        {settings.links.map(
          ({ href, title, show }, i) =>
            show && [
              <a key={`link-${i}`} href={href}>
                {title}
              </a>,
              i !== settings.links.length - 1 && (
                <span key={`bull-${i}`}>&bull;</span>
              ),
            ]
        )}
      </Links>
      <Copyright dangerouslySetInnerHTML={{ __html: copyright }} />
    </FooterContainer>
  </Section>
);

Footer.propTypes = {
  settings: PropTypes.object.isRequired,
  copyright: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default Footer;
