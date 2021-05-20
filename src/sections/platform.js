import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { withPrefix } from 'gatsby-link';
import { Query } from 'react-apollo';
import { withPrefix } from 'gatsby-link';
import gql from 'graphql-tag';
import Section, { SectionTitle } from '../components/section';
import Container from '../components/container';
import Content from '../components/Content';
import PlatformAnimation from '../components/PlatformAnimation';
import { colors } from '../constants';
import lottie from '../lottie';
import animationData from '../platforanimationdata.json';
import PriceChart from '../components/PriceChart';
import CoinList from '../components/CoinList';

const PLATFORM_QUERY = gql`
  {
    getPrice(currencies: 200) {
      cpi {
        price
      }
    }
    topCoins(currencies: 100) {
      name
      price
      market_cap
      symbol
    }
    getPriceHistory(limit: 28) {
      price
      createdAt
    }
  }
`;

const VideoWrapper = styled.iframe`
  width: 600px;
  height: 400px;
  max-width: 90%;
  border: none;
`;

const CPIDataWrapper = styled.div`
  display: flex;

  & > div {
    min-width: 50%;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const CPIPrice = styled.h1`
  color: ${colors.lightPrimary};
`;

const Img = styled.img`
  margin: 0 auto;
  max-height: 400px;
  max-width: 90%;

  @media only screen and (max-width: 600px) {
    display: block;
    min-width: auto;
    float: none !important;
  }
`;

class Platform extends Component {
  componentDidMount() {
    const params = {
      container: document.getElementById('lottie'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData,
    };

    if (this.props.frontmatter.animation) {
      const anim = lottie.loadAnimation(params);
    }
  }

  render() {
    const {
      frontmatter: { title, animation, video, videourl, showCharts, image },
      content,
    } = this.props;
    if (!showCharts) {
      return (
        <Section
          style={{
            backgroundColor: colors.eggWhite,
            textAlign: 'center',
          }}
        >
          <Container style={{ paddingBottom: 0 }}>
            <SectionTitle>{title}</SectionTitle>
            {video && (
              <VideoWrapper
                src={videourl}
                allowFullScreen=""
                title="platform"
              />
            )}
            {image && <Img src={withPrefix(image)} />}
            <Content markdown style={{ padding: '30px' }}>
              {content}
            </Content>
          </Container>
        </Section>
      );
    }
    return (
      <Query query={PLATFORM_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: ${error.message}</p>;

          return !animation ? (
            <Section
              style={{
                backgroundColor: colors.eggWhite,
                textAlign: 'center',
              }}
            >
              <Container style={{ paddingBottom: 0 }}>
                <SectionTitle>{title}</SectionTitle>
                <CPIPrice>${data.getPrice.cpi.price.toFixed(2)}</CPIPrice>
                {video && (
                  <VideoWrapper
                    src={videourl}
                    allowFullScreen=""
                    title="platform"
                  />
                )}
                <CPIDataWrapper>
                  <div>
                    <PriceChart priceHistory={data.getPriceHistory} />
                  </div>
                  <div>
                    <CoinList topCoins={data.topCoins} />
                  </div>
                </CPIDataWrapper>
                <Content markdown style={{ padding: '30px' }}>
                  {content}
                </Content>
              </Container>
            </Section>
          ) : (
            <Section
              style={{
                background: colors.primary,
                textAlign: 'center',
                color: colors.white,
                padding: '25px',
              }}
            >
              <SectionTitle>{title}</SectionTitle>
              <PlatformAnimation id="lottie" style={{}} />
              <PriceChart priceHistory={data.getPriceHistory} />
              <Content
                dark
                markdown
                style={{ maxWidth: '700px', margin: '0 auto' }}
              >
                {content}
              </Content>
            </Section>
          );
        }}
      </Query>
    );
  }
}

Platform.propTypes = {
  frontmatter: PropTypes.object.isRequired,
  content: PropTypes.string.isRequired,
};

export default Platform;
