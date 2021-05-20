import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import rgba from 'hex-to-rgba';

import Button from './button';
import CrowdasleIcon from '../icons/crowdsale.svg';
import { breakpoints, colors } from '../constants';

const stageBg = props => {
  if (props.passed) {
    return colors.gray;
  }

  if (props.current) {
    return colors.white;
  }

  return colors.darkGray;
};

const labelAreaBg = props => {
  if (props.passed) {
    return `linear-gradient(110deg,   ${colors.lightPrimary}, ${
      colors.darkPrimary
    })`;
  }

  if (props.current) {
    return `linear-gradient(110deg,  ${colors.lightPrimary},${
      colors.darkPrimary
    })`;
  }

  return '#4e4d4c';
};

const Root = styled.div`
  padding: 0 5px;
`;

const LabelArea = styled.header`
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 10px 15px 8px;

  border-radius: 6px 6px 0 0;

  h3,
  p {
    margin: 0;
  }

  h3 {
    font-size: 20px;
    text-transform: uppercase;
  }

  p {
    font-size: 16px;

    opacity: 0.56;
  }

  &::before {
    position: absolute;
    top: 36px;
    bottom: 36px;
    left: 40px;

    width: 2px;
    display: none;

    content: '';
    opacity: 0.25;

    background-color: ${colors.black};
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 30%;
    padding: 25px 0 25px 30px;
    border-radius: 12px 0 0 12px;

    h3 {
      font-size: 30px;
      margin-bottom: 20px;
    }

    p {
      font-size: 24px;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    padding: 38px 0 38px 70px;

    h3 {
      font-size: 35px;
      margin-bottom: 30px;
    }

    &::before {
      display: block;
    }
  }
`;

const BonusArea = styled.main`
  font-size: 20px;

  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 13px 0 10px;

  flex-shrink: 0;

  text-align: center;
  line-height: 32px;

  p {
    margin: 0;
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    width: 70%;
    padding: 0;
    font-size: 30px;
    line-height: 50px;
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    font-size: 35px;
    line-height: 60px;
  }
`;

const Point = styled.i`
  position: absolute;
  z-index: 1;
  right: 100%;
  top: 50%;

  width: 16px;
  height: 16px;
  margin-top: -8px;
  margin-right: 10px;

  border-radius: 50%;
  color: ${colors.white};
  border: 2px solid currentColor;

  &::before {
    position: absolute;
    top: 2px;
    left: 2px;

    width: 8px;
    height: 8px;

    content: '';

    border-radius: 50%;
    background-color: currentColor;
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    width: 22px;
    height: 22px;
    margin-top: -10px;
    margin-right: 30px;

    &::before {
      top: 2px;
      left: 2px;

      width: 14px;
      height: 14px;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    margin-right: 70px;
  }
`;

const Stage = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 120px;
  margin-top: 10px;

  color: ${props =>
    props.passed || props.current ? colors.white : colors.lightGray};
  background: ${stageBg};
  border-radius: 6px;

  main {
    color: ${props =>
      props.passed || props.current ? colors.black : colors.lightGray};
  }

  ${LabelArea} {
    background: ${labelAreaBg};
  }

  &::before {
    position: absolute;
    right: 100%;
    top: 50%;

    width: 12px;
    height: 1px;

    content: '';

    background: ${props =>
      props.passed || props.current
        ? `linear-gradient(to right, colors.darkPrimary 70%, colors.veryDarkPrimary)`
        : colors.veryDarkGray};
  }

  &::after {
    position: absolute;
    right: 100%;
    bottom: 50%;

    width: 1px;
    height: 114px;
    margin-right: 18px;
    margin-bottom: 8px;

    content: '';

    background: ${props => {
      const color = props.passed || props.current ? '#aa9453' : '#4a4a49';
      return color;
    }};
  }

  &:first-child::after {
    background: ${props => {
      const color =
        props.passed || props.current ? colors.lightPrimary : '#4a4a49';
      return `linear-gradient(${rgba(color, 0)}, ${color})`;
    }};
  }

  ${Point} {
    color: ${props =>
      props.passed || props.current ? colors.lightPrimary : '#4a4a49'};
  }

  ${Point}::before {
    display: ${props => (props.passed || props.current ? 'block' : 'none')};
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    flex-direction: row;
    height: 160px;
    margin-top: 20px;

    border-radius: 12px;

    &::before {
      width: 30px;
      height: 2px;
      margin-top: -1px;
    }

    &::after {
      width: 2px;
      height: 160px;
      margin-right: 40px;
      margin-bottom: 10px;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    &::before {
      width: 70px;
      height: 2px;
      margin-top: -1px;
    }

    &::after {
      width: 2px;
      height: 160px;
      margin-right: 80px;
      margin-bottom: 10px;
    }
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 20px;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    margin-top: 50px;
  }
`;

const Bonus = styled.p`
  strong {
    color: ${colors.lightPrimary};
  }

  font-size: 16px;

  span {
    position: relative;

    &::before {
      position: absolute;
      top: -8px;
      right: -14px;
      bottom: -6px;
      left: -14px;

      content: '';

      border: 2px dashed ${colors.lightPrimary};
      border-radius: 12px;
    }
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    span::before {
      top: -10px;
      right: -20px;
      bottom: -7px;
      left: -20px;
    }
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    span {
      font-size: 25px;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    span {
      font-size: 30px;
    }
  }
`;

const Live = styled.span`
  font-size: 15px;
  font-weight: bold;

  position: absolute;
  top: 10px;
  right: 10px;

  display: none;
  height: 25px;
  padding: 0 10px;

  line-height: 25px;
  text-transform: uppercase;

  color: ${colors.black};
  background-image: linear-gradient(
    110deg,
    colors.primary 0%,
    colors.lightPrimary 100%
  );
  border-radius: 6px;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    display: block;
  }
`;

const SaleStages = ({ stages, btnText, crowdsale }) => {
  const currentStage = stages.findIndex(stage => stage.current);
  return (
    <Root>
      {stages.map((stage, i) => (
        <Stage key={i} passed={i < currentStage} current={i === currentStage}>
          <Point />
          <LabelArea>
            <h3>Stage {i + 1}</h3>
            <p>{stage.label}</p>
          </LabelArea>
          <BonusArea>
            <Bonus>
              {!!stage.title && (
                <span>
                  <strong>{stage.title}</strong>
                </span>
              )}
              {/* {!stage.bonus && 'NO BONUS'} */}
            </Bonus>
            <p>{stage.subtitle}</p>
            {/* <p>{stage.tokens}% OF THE TOKENS</p> */}
            {i === currentStage && <Live>Live</Live>}
          </BonusArea>
        </Stage>
      ))}

      <ButtonWrapper>
        <Button
          component="a"
          className="cta-presale"
          href={crowdsale}
          icon={<CrowdasleIcon width={29} height={29} />}
        >
          {btnText}
        </Button>
      </ButtonWrapper>
    </Root>
  );
};

SaleStages.propTypes = {
  stages: PropTypes.array,
};

export default SaleStages;
