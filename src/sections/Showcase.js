import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withPrefix } from 'gatsby-link';
import Section, { SectionTitle } from '../components/section';
import Container from '../components/container';
import Content from '../components/Content';
import Videos from '../components/videos';
import { colors } from '../constants';
import { breakpoints } from '../constants';
import { async } from 'globalthis/implementation';
import { console } from 'window-or-global';

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

const Tabs = styled.div`
  display: flex;

  margin: 0 -5px 10px;
`;

const Tab = styled.a`
  font-size: 16px;
  font-weight: ${props => (props.current ? 'normal' : 'normal')};
  text-align: center;
  border-bottom: 2px solid
    ${props => (props.current ? colors.darkGray : colors.transparent)};

  margin: 0 5px;
  padding: 7px 12px;
  cursor: pointer;
  color: ${colors.lgtText} !important;

  &:hover {
    border-bottom-color: ${colors.darkGray};
  }
`;

function renderImage(image, videos) {
  if (videos && videos.length > 0) {
    console.log('sdfkjldsjfldsVideoXXXX : ', videos);
    return (
      // <VideoWrapper>
      //   <Videos videos={videos} />
      // </VideoWrapper>
      Array.isArray(videos) === true &&
      videos.map((data, index) => (
        <div className="video" key={index}>
          <iframe
            src={data.embed}
            title={data.label}
            // allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            allowFullScreen
          />
          <p>{data.label}</p>
        </div>
      ))
    );
  }

  if (image) {
    return (
      Array.isArray(image) === true &&
      image.map((data, i) => (
        <div className="video" key="i">
          <Img src={withPrefix(image[i].image)} />
          <p>{image[i].text}</p>
        </div>
      ))
    );
    // return <Img src={withPrefix(image[0].image)} />;
  }

  return null;
}

const Showcase = ({ title, text, videos, adds, banners }) => {
  const [current, setCurrent] = useState(0);
  const [vdo, setVdo] = useState('');
  const [myAdds, setMyAdds] = useState('');
  const [myBanners, setMyBanners] = useState('');
  const [myShowcase, setMyShowcase] = useState([]);
  useEffect(() => {
    console.log('dfdkfjldks : ', vdo);
    console.log('dfdkfjldks : ', myAdds);
  }, [vdo, myAdds]);
  useEffect(() => {
    getData();
  }, [videos, adds, banners]);

  const getData = async () => {
    let vedio = await [{ videos: videos }];
    let adver = await [{ adds: adds }];
    let cBanner = await [{ banners: banners }];

    setVdo(vedio);
    setMyAdds(adver);
    setMyBanners(cBanner);
    let data = await [
      { lable: 'Videos', vedio: vedio },
      { lable: 'Adds', adds: adver },
      { lable: 'Banners', banners: cBanner },
    ];
    console.log('dfdkfjldks : ', data);
    setMyShowcase(data);
  };
  return (
    <Section>
      <Container id="container">
        <SectionTitle>{title}</SectionTitle>
        <div className="showcaseContainer">
          <Tabs>
            {myShowcase.length > 0 &&
              myShowcase.map((cCase, i) => (
                <Tab
                  onClick={() => setCurrent(i)}
                  key={i}
                  current={current === i}
                >
                  {cCase.lable}
                </Tab>
              ))}
          </Tabs>
          <div className="videoSection">
            {current === 0 &&
              vdo !== '' &&
              vdo.length > 0 &&
              vdo.map(({ image, videos }, i) => (
                <ContentSection key={i}>
                  {renderImage(image, videos)}
                  {/* <Content markdown>{text}</Content> */}
                </ContentSection>
              ))}

            {current === 1 &&
              myAdds !== '' &&
              myAdds.length > 0 &&
              myAdds.map(({ image, adds }, i) => (
                <ContentSection key={i}>
                  {renderImage(image, adds)}
                  {/* <Content markdown>{text}</Content> */}
                </ContentSection>
              ))
            // 'ddd'
            }
            {current === 2 &&
              myBanners !== '' &&
              myBanners.length > 0 &&
              myBanners.map(({ banners, videoss }, i) => (
                <ContentSection key={i}>
                  {renderImage(banners, videoss)}
                  {/* <Content markdown>{text}</Content> */}
                </ContentSection>
              ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

// Showcase.propTypes = {
//   title: PropTypes.string,
//   content: PropTypes.arrayOf(
//     PropTypes.shape({
//       text: PropTypes.string,
//       videoUrl: PropTypes.string,
//     })
//   ),
// };

export default Showcase;
