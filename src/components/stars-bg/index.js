import React from 'react';
import styled from 'styled-components';
import { withPrefix } from 'gatsby-link';
import starsSrc from '../../stars-bg-src';
import { colors } from '../../constants';

const Root = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${colors.primary};
  background-image: url(${withPrefix('/img/header-bg.jpg')});
  background-position: 20%;
  background-size: cover;

  canvas {
    display: block;
    position: relative;
    width: 100%;
    height: 16rem;
    height: 100vh;
    z-index: 1;
    opacity: 0.35;
  }
`;

let loaded = false;
class StarsBg extends React.Component {
  componentDidMount() {
    if (!loaded) {
      const script = document.createElement('script');
      script.innerHTML = starsSrc;
      document.head.appendChild(script);
      loaded = true;
    }
    window.initializeBG();
  }

  render() {
    return (
      <Root>
        <canvas id="stars" />
      </Root>
    );
  }
}

export default StarsBg;
