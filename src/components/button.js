import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { breakpoints, colors } from '../constants';

export const DefaultButton = styled.button`
  font-size: 18px;
  font-weight: bold;

  position: relative;

  flex-shrink: 0;
  display: inline-flex;
  align-items: center;

  height: 47px;
  padding: 5px 26px 0 ${props => (props.icon ? 60 : 26)}px;

  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;

  color: ${colors.lightPrimary};
  border: 0;
  border-radius: 24px;
  background-color: ${props =>
    props.secondary ? colors.primary : colors.white};
  transition: background 0.2s;

  &:hover {
    color: ${colors.primary};
    background: ${props =>
      props.secondary ? colors.darkPrimary : colors.white};
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    font-size: 22px;
    height: 65px;
    padding: 5px 46px 0 ${props => (props.icon ? 110 : 46)}px;
    border-radius: 33px;
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 37px;
  height: 37px;

  background-color: ${colors.lightPrimary};
  border-radius: 50%;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    top: 8px;
    left: 8px;

    width: 49px;
    height: 49px;
  }
`;

export const SquareButton = styled(DefaultButton)`
  width: 50px;
  height: 50px;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding: 0;

  border-radius: 12px;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    width: 65px;
    height: 65px;
    padding: 0;

    border-radius: 12px;
  }
`;

const Button = ({ icon, children, component, ...props }) => {
  const RenderComponent = component
    ? DefaultButton.withComponent(component)
    : DefaultButton;
  return (
    <RenderComponent {...props} icon={icon}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </RenderComponent>
  );
};

Button.propTypes = {
  icon: PropTypes.any,
  children: PropTypes.any,
  component: PropTypes.any,
};

export default Button;
