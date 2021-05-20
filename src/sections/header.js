import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import Link, { withPrefix } from 'gatsby-link';
import styled from 'styled-components';
import rgba from 'hex-to-rgba';
import root from 'window-or-global';

import Container from '../components/container';
import Menu from '../components/menu';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { breakpoints, colors } from '../constants';

const Root = styled.div`
  position: fixed;
  z-index: 20;
  left: 0;
  top: 0;

  width: 100%;

  color: ${colors.gray};

  @media screen and (max-width: 1024px) {
    color: ${colors.white} !important;
  }
`;

const LogoImage = styled.img`
  display: block;
  width: 250px;

  @media screen and (max-width: 327px) {
    width: 200px;
  }
`;

const Ribbon = styled.img`
  position: absolute;
  top: 0;
  right: 0;

  @media screen and (max-width: 1400px) {
    display: none;
  }
`;

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-top: 20px;
  padding-bottom: 10px;
  max-width: 1300px;
`;

class Header extends React.Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
    menuUrls: PropTypes.object.isRequired,
    scrolled: PropTypes.bool,
    saidAbout: PropTypes.string.isRequired,
    socials: PropTypes.object.isRequired,
    currentSection: PropTypes.string.isRequired,
    onNavigate: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      scrolled: false,
    };

    this.handleRef = root => {
      if (root) {
        this.root = findDOMNode(root); // eslint-disable-line react/no-find-dom-node
        this.scrollHandler();
      }
    };

    this.scrollHandler = () => {
      const { scrolled, secondary } = this.props;
      this.setState({ scrolled: true });
      if (this.root) {
        this.root.style.transform = `translate3d(0, ${Math.max(
          -10,
          0 - (scrolled ? 100 : window.scrollY)
        )}px, 0)`;

        this.root.style.backgroundColor = rgba(
          colors.white,
          window.scrollY > 30 || scrolled ? 0.95 : 0
        );
        this.root.style.color =
          window.scrollY > 30 || scrolled ? colors.darkGray : colors.white;
      }
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  render() {
    return (
      <Root ref={this.handleRef}>
        <HeaderContainer>
          <Link to="/">
            <LogoImage
              src={withPrefix(
                root.scrollY > 30 || this.props.secondary
                  ? '/img/cpi-logo.svg'
                  : '/img/cpi-logo-white.svg'
              )}
              alt=""
            />
          </Link>

          <Menu
            opened
            scrolled={this.state.scrolled}
            socials={this.props.socials}
            items={this.props.menu}
            urls={this.props.menuUrls}
            current={this.props.currentSection}
            onNavigate={this.props.onNavigate}
          />
        </HeaderContainer>

        {this.props.saidAbout && (
          <a
            href={this.props.saidAbout}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Ribbon
              src={withPrefix('/img/logo.svg')}
              width={170}
              height={170}
              alt=""
            />
          </a>
        )}
      </Root>
    );
  }
}

export default Header;
