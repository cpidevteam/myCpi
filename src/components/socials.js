import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Media from 'react-media';
import rgba from 'hex-to-rgba';
import root from 'window-or-global';
import FacebookIcon from '../icons/social-facebook.svg';
import TwitterIcon from '../icons/social-twitter.svg';
import TelegramIcon from '../icons/social-telegram.svg';
import GithubIcon from '../icons/social-github.svg';
import LinkedInIcon from '../icons/social-linkedin.svg';
import { breakpoints, colors } from '../constants';

if (typeof window === undefined) {
  window = {};
}

const Root = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  position: relative;
  width: 36px;
  height: 36px;

  color: ${props =>
    root.scrollY > 30 && props.secondary ? colors.white : colors.darkGray};
  background-color: ${props =>
    root.scrollY > 30 && props.secondary ? colors.darkGray : colors.white};
  border-radius: 50%;
  transition: background-color 0.2s;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &:hover {
    background-color: ${props =>
      props.secondary ? colors.lightPrimary : colors.white} !important;
  }
  @media screen and (max-width: 700px) {
    background-color: ${colors.white};
    color: ${colors.darkGray};
  }
`;

const linkBg = props => (props.full ? rgba('#FFF', 0.1) : 'transparent');
const linkBgHover = props =>
  props.full && !props.stroke ? rgba('#bca35a', 0.2) : 'transparent';

const SocialsLink = styled.a`
  display: flex;
  align-items: center;
  margin: ${props => (props.full ? '0 10px' : '0 5px')};
  padding: ${props => (props.full ? '3px' : '0')};

  text-decoration: none;

  color: #ffffff;
  background-color: ${linkBg};
  border-radius: 21px;
  border: ${props =>
    props.stroke ? `2px solid ${rgba(props.stroke, 0.4)}` : 0};
  transition: border 0.2s, background-color 0.2s;

  &:hover {
    background-color: ${linkBgHover};
    border: ${props => (props.stroke ? `2px solid ${props.stroke}` : 0)};

    ${IconWrapper} {
      background-color: ${props => (!props.stroke ? '#bca35a' : 'transparent')};
    }
  }
`;

const Label = styled.span`
  font-size: 14px;

  padding: 3px 20px 0 15px;
`;

const items = [
  {
    icon: <FacebookIcon width={22} height={22} />,
    label: 'Facebook',
    type: 'facebook',
  },
  {
    icon: (
      <TelegramIcon
        style={{ margin: '1px 0 0 -1px', fille: 'white' }}
        width={22}
        height={22}
      />
    ),
    label: 'Telegram',
    type: 'telegram',
  },
  {
    icon: <TwitterIcon width={22} height={22} />,
    label: 'Twitter',
    type: 'twitter',
  },
  {
    icon: <GithubIcon width={22} height={22} />,
    label: 'Github',
    type: 'github',
  },
  {
    icon: (
      <LinkedInIcon style={{ margin: '-1px 0 0 0' }} width={22} height={22} />
    ),
    label: 'LinkedIn',
    type: 'linkedin',
  },
];

const Socials = ({ full, stroke, secondary, ...props }) => {
  return (
    <div>
      <Media query={`(min-width: ${breakpoints.mobile}px)`}>
        {matches => (
          <Root>
            {items.filter(item => !!props[item.type]).map((item, i) => (
              <SocialsLink
                full={full && matches}
                stroke={stroke}
                href={props[item.type]}
                target="_blank"
                rel="noopener noreferrer"
                key={i}
              >
                <IconWrapper secondary={secondary}>{item.icon}</IconWrapper>
                {full && matches && <Label>{item.label}</Label>}
              </SocialsLink>
            ))}
          </Root>
        )}
      </Media>
    </div>
  );
};

Socials.defaultProps = {
  secondary: false,
};

Socials.propTypes = {
  full: PropTypes.bool,
  secondary: PropTypes.bool,
  stroke: PropTypes.string,
  facebook: PropTypes.string,
  twitter: PropTypes.string,
  telegram: PropTypes.string,
  linkedin: PropTypes.string,
  github: PropTypes.string,
};

export default Socials;
