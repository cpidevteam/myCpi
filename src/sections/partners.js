/* eslint-disable jsx-a11y/alt-text */

import React from 'react';
import styled from 'styled-components';
import { withPrefix } from 'gatsby-link';
import Section, { SectionTitle } from '../components/section';
import Container from '../components/container';
import { breakpoints, colors } from '../constants';

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: -30px;
  list-style: none;

  li {
    width: 50%;
    padding: 0 30px;
    text-align: center;

    margin-bottom: 30px;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    margin-bottom: -70px;
    li {
      width: 25%;
      /* padding: 0; */

      margin-bottom: 70px;
    }
  }
`;

const Contact = styled.div`
  p {
    font-size: 14px;

    margin-top: 30px;

    text-align: center;
    line-height: 22px;

    color: ${colors.lightGray};

    a {
      color: ${colors.primary};
    }

    @media screen and (min-width: ${breakpoints.mobile}px) {
      font-size: 16px;
      margin-top: 60px;
    }
  }
`;

const Partners = ({ settings: { title, partners }, contacts }) => {
  return (
    <Section
      backgroundUrl={withPrefix('/partners-bg.jpg')}
      // backgroundColor={colors.black}
      // color={colors.white}
    >
      <Container>
        {title && <SectionTitle>{title}</SectionTitle>}
        <List>
          {partners.map(({ logo, alt, href }) => (
            <li key={logo}>
              {href ? (
                <a target="blank" rel="noopener noreferrer" href={href}>
                  <img alt={alt} src={withPrefix(logo)} />
                </a>
              ) : (
                <img alt={alt} src={withPrefix(logo)} />
              )}
            </li>
          ))}
        </List>

        <Contact dangerouslySetInnerHTML={{ __html: contacts }} />
      </Container>
    </Section>
  );
};

export default Partners;
