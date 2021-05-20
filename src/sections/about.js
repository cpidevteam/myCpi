import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withPrefix } from 'gatsby-link';
import Section, { SectionTitle } from '../components/section';
import Container from '../components/container';
import Content from '../components/Content';
import Videos from '../components/videos';
import { breakpoints } from '../constants';

const VideoWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
  margin-bottom: 10px;
`;

const Img = styled.img`
  margin: 0px 75px 15px 0px;
  min-width: 360px;

  @media only screen and (max-width: 600px) {
    display: block;
    margin: 25px auto !important;
    min-width: auto;
    float: none !important;
  }
`;

const hasVideo = props =>
  props.children[0] &&
  props.children[0].type.styledComponentId === VideoWrapper.styledComponentId;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 20px;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    margin-top: 55px;

    flex-direction: ${props => {
      return hasVideo(props) ? 'column' : 'row';
    }};

    &:nth-child(even) {
      flex-direction: row-reverse;
      ${Img} {
        margin: 0px 0px 15px 75px;
      }
    }

    ${VideoWrapper} {
      width: 63%;
      margin-bottom: 20px;
    }

    ${Img} {
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    flex-direction: row;

    &:nth-child(even) {
      flex-direction: row-reverse;
    }

    ${VideoWrapper} {
      width: 45%;
      margin-bottom: 0;
      margin-right: 30px;
    }
  }

  &:first-child {
    margin-top: 0;
  }
`;

function renderImage(image, videos) {
  if (videos && videos.length > 0) {
    return (
      <VideoWrapper>
        <Videos videos={videos} />
      </VideoWrapper>
    );
  }

  if (image) {
    return <Img src={withPrefix(image)} />;
  }

  return null;
}

const About = ({ title, content, subtitle, featcontent }) => {
  return (
    <Section>
      <Container id="container">
        <SectionTitle>{title}</SectionTitle>
        <div>
          {content.map(({ text, videos, image }, i) => (
            <ContentSection key={i}>
              {renderImage(image, videos)}
              <Content markdown>{text}</Content>
            </ContentSection>
          ))}
        </div>
        <SectionTitle marginTop>{subtitle}</SectionTitle>
        <div>
          {featcontent.map(({ text, videos, image }, i) => (
            <ContentSection key={i + 1}>
              {renderImage(image, videos)}
              <Content markdown>{text}</Content>
            </ContentSection>
          ))}
        </div>
      </Container>
    </Section>
  );
};

About.propTypes = {
  title: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      image: PropTypes.string,
      videoUrl: PropTypes.string,
    })
  ),
};

export default About;
