import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import GatsbyLink from 'gatsby-link';
import styled from 'styled-components';
import rgba from 'hex-to-rgba';
import root from 'window-or-global';

import MenuIcon from '../icons/menu.svg';
import CloseIcon from '../icons/close.svg';

import { omitProps } from '../utils';
import Socials from './socials';
import LanguageSwitcher from './LanguageSwitcher';
import { breakpoints, colors } from '../constants';

const Bg = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: -10px;
  right: -100vw;
  background-color: ${rgba(colors.black, 0.95)};

  @media screen and (min-width: ${breakpoints.desktop}px) {
    display: none;
  }
`;

const Root = styled.div`
  @media (max-width: 1025px) {
    line-height: 50px;
    height: 50px;
  }

  @media (max-width: 700px) {
    height: 30px;
    line-height: 30px;
  }
`;

const MenuList = styled.div`
  font-weight: bold;

  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  padding-top: 10vh;
  padding-bottom: 7vh;
  flex-direction: column;
  justify-content: space-between;

  display: ${props => (props.opened ? 'flex' : 'none')};
  align-items: center;

  list-style: none;
  text-transform: uppercase;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    left: auto;
    line-height: 40px;
    width: 360px;
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: auto;
    width: auto;
    padding-top: 0;
    padding-bottom: 0;
  }

  @media screen and (max-width: ${breakpoints.desktop}px) and (orientation: landscape) {
    line-height: 13px;
  }
`;

const Items = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: ${breakpoints.desktop}px) {
    flex-direction: row;
    align-items: center;
    height: 36px;
  }
`;

const Item = styled.div`
  font-size: calc(13px +3 * ((100vw - 320px) / 680));

  padding: 17px 0;
  @media screen and (min-width: ${breakpoints.desktop}px) {
    padding: 0;
    height: 36px;
  }

  @media screen and (max-width: ${breakpoints.desktop}px) and (orientation: landscape) {
    padding: 10px 0;
  }
`;

const SocialsItem = styled.div`
  position: relative;
  z-index: 1;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    position: absolute;
    bottom: 100%;
    right: 75px;
    margin-bottom: 20px;
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    position: relative;
    right: auto;
    bottom: auto;
    margin-bottom: 0;
  }

  @media (max-height: 375px) and (orientation: landscape) {
    bottom: 0;
    padding-bottom: 10px;
  }
`;

const FakeSocials = styled.div`
  display: none;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    position: absolute;
    top: 30px;
    right: 75px;
    display: block;
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    display: none;
  }
`;

const Link = styled(omitProps(GatsbyLink, 'current'))`
  position: relative;
  padding: 12px 10px 2px 10px;

  text-decoration: none;

  color: inherit;

  transition: color 0.2s;

  &:hover {
    color: ${colors.lightPrimary};
  }

  &::before {
    position: absolute;
    left: 17px;
    right: 17px;
    bottom: 0;

    display: ${props => (props.current ? 'block' : 'none')}
    height: 2px;

    content: '';

    background-color: ${colors.primary};
  }
  @media (max-width: 1032px) {
    padding: 12px 10px !important;
  }

  @media screen and (max-width: ${
    breakpoints.desktop
  }px) and (orientation: landscape) {
    padding: 12px 10px 2px 10px !important;
  }
`;

const MenuButton = styled.button`
  all: initial;
  color: ${props => (root.scrollY > 30 ? colors.darkGray : colors.white)};
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 2px solid ${colors.primary};
  position: absolute;
  right: 20px;
  top: 16px;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }
  @media screen and (max-width: 1024px) {
    color: ${props =>
      props.opened || root.scrollY < 30 ? colors.white : colors.darkGray};
  }

  @media screen and (max-width: 700px) {
    top: 20px;
  }

  @media screen and (max-width: 327px) {
    top: 17px;
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    right: 20px;
    top: 27px;
    width: 41px;
    height: 41px;
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    display: none;
  }
`;

const OrdinaryLink = styled.a`
  color: ${props => (root.scrollY > 30 ? colors.darkGray : colors.white)};
  text-decoration: none;
  padding: 12px 17px;

  @media screen only (max-width: 1025px) {
    padding: 12px 10px;
  }

  :hover {
    color: ${colors.lightPrimary};
  }
`;

const LanguageWrapper = styled.div`
  @media screen and (min-width: 1367px) {
    margin-left: 20px;
    margin-right: 20px;
  }
  @media screen and (max-width: 1366px) {
    margin-left: 12px;
    margin-right: 12px;
  }
`;

class Menu extends React.Component {
  static propTypes = {
    items: PropTypes.object.isRequired,
    urls: PropTypes.object.isRequired,
    socials: PropTypes.object.isRequired,
    current: PropTypes.string.isRequired,
    onNavigate: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      opened: false,
    };

    this.toggleMenu = () =>
      this.setState(state => ({
        opened: !state.opened,
      }));
  }

  render() {
    const { items, current, onNavigate, socials, urls, scrolled } = this.props;
    const { opened } = this.state;
    return (
      <Root>
        <MenuList opened={opened}>
          <Items>
            {Object.keys(items).map(key => (
              <Item key={key}>
                <Link
                  to={urls[key] || `/#${key}`}
                  onClick={e => {
                    if (onNavigate && !urls[key]) {
                      e.preventDefault();
                      onNavigate(key);
                    } else if (onNavigate && urls[key]) {
                      onNavigate(key, true);
                    }
                    this.setState({ opened: false });
                  }}
                  current={current === key}
                >
                  {items[key]}
                </Link>
              </Item>
            ))}
          </Items>

          <Bg />

          <LanguageWrapper>
            <LanguageSwitcher />
          </LanguageWrapper>
          <SocialsItem>
            <Socials
              secondary
              linkedin={socials.linkedin}
              twitter={socials.twitter}
              github={socials.github}
              facebook={socials.facebook}
              telegram={socials.telegram}
            />
          </SocialsItem>
        </MenuList>

        <MenuButton opened={opened} onClick={this.toggleMenu}>
          {!opened && <MenuIcon width={21} height={18} />}
          {opened && <CloseIcon width={21} height={21} />}
        </MenuButton>

        {!opened && (
          <FakeSocials>
            <Socials
              secondary
              linkedin={socials.linkedin}
              twitter={socials.twitter}
              github={socials.github}
              facebook={socials.facebook}
              telegram={socials.telegram}
            />
          </FakeSocials>
        )}
      </Root>
    );
  }
}

export default Menu;
