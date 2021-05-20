import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle } from 'styled-components';

import './index.css';

import regular from '../fonts/Montserrat.ttf';
import bold from '../fonts/Montserrat-Bold.ttf';
import medium from '../fonts/Montserrat-Medium.ttf';
import regularWoff from '../fonts/Montserrat.woff';
import boldWoff from '../fonts/Montserrat-Bold.woff';
import mediumWoff from '../fonts/Montserrat-Medium.woff';
import { colors } from '../constants';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: Montserrat;
    font-weight: normal;
    src: local('Gotham Pro'), url('${regular}') format('ttf'),
    local('Gotham Pro'), url('${regularWoff}') format('woff');
  }
  @font-face {
    font-family: Montserrat;
    font-weight: bold;
    src: local('Gotham Pro Bold'), url('${bold}') format('ttf'),
    local('Gotham Pro Bold'), url('${boldWoff}') format('woff');
  }
  @font-face {
    font-family: Montserrat;
    font-weight: 500;
    src: local('Gotham Pro Medium'), url('${medium}') format('ttf'),
    local('Gotham Pro Medium'), url('${mediumWoff}') format('woff');
  }

  a {
    color: ${colors.primary};

    &:hover {
      color: #FFF;
      text-decoration: none;
    }

    transition: color 0.2s;
  }
  body {
    -webkit-text-size-adjust: none;
  }
`;

const Layout = ({ children }) => (
  <Fragment>
    <GlobalStyle />
    {children}
  </Fragment>
);

Layout.propTypes = {
  children: PropTypes.func,
};

export default Layout;
