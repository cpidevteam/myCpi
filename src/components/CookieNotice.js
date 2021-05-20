import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../constants';

const NoticeModal = styled.div`
  position: fixed;
  z-index: 10;
  color: ${colors.darkGray};
  text-align: center;
  font-weight: 500;
  font-size: 14px;
  background: ${colors.white};
  bottom: 15px;
  min-height: 50px;
  padding: 0;
  left: 15px;
  right: 15px;
  border-radius: 5px;
  line-height: 50px;
  opacity: 0.9;

  p {
    margin: 0;
  }

  a {
    cursor: pointer;
    text-decoration: none;
  }

  @media screen and (max-width: 1000px) {
    padding: 10px 10px 0 10px;
  }
`;

const propTypes = {
  text: PropTypes.string.isRequired,
};

class CookieNotice extends Component {
  state = {
    display: true,
  };

  placeCookie = () => {
    document.cookie = 'acceptCookies=true';
    this.setState({ display: false });
  };

  render() {
    return (
      <Fragment>
        {typeof document !== 'undefined' &&
          document.cookie.indexOf('acceptCookies=') < 0 &&
          this.state.display && (
            <NoticeModal>
              <p>
                <span dangerouslySetInnerHTML={{ __html: this.props.text }} />
                <a role="link" onClick={this.placeCookie}>
                  {' '}
                  Continue
                </a>
              </p>
            </NoticeModal>
          )}
      </Fragment>
    );
  }
}

CookieNotice.propTypes = propTypes;

export default CookieNotice;
