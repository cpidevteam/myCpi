import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { breakpoints, colors } from '../constants';

const Root = styled.div`
  display: flex;
`;

const Num = styled.div`
  font-size: 32px;
  font-weight: bold;

  padding: 17px 0 13px;

  &::before {
    position: absolute;
    pointer-events: none;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: '';
    border: 2px solid currentColor;
    border-radius: 12px;
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    font-size: 46px;
    padding: 30px 0 25px;
  }
`;

const Label = styled.div`
  font-size: 12px;

  position: relative;

  padding: 8px 0;

  text-transform: lowercase;

  &::before {
    position: absolute;

    left: 2px;
    right: 2px;
    bottom: 100%;

    height: 2px;

    content: '';

    background-color: currentColor;
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    font-size: 14px;
    padding: 13px 0;
  }
`;

const Part = styled.div`
  position: relative;
  flex: 1;

  margin-left: 13px;

  color: ${props => (props.days ? colors.white : colors.white)};

  &:first-child {
    margin-left: 0;
  }

  &::after,
  &::before {
    position: absolute;
    left: 100%;

    width: 5px;
    height: 5px;
    margin-left: 4px;

    opacity: 0.35;

    content: '';

    background-color: ${colors.white};
    border-radius: 50%;
  }

  &::after {
    top: 50%;
    margin-top: 9px;
  }

  &::before {
    bottom: 50%;
    margin-bottom: 9px;
  }

  &:last-child::before,
  &:last-child::after {
    display: none;
  }

  ${Num}::before {
    opacity: ${props => (props.days ? 0.35 : 0.35)};
  }

  ${Label}::before {
    opacity: ${props => (props.days ? 0.25 : 0.25)};
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    margin-left: 40px;

    &::after,
    &::before {
      margin-left: 20px;
    }
  }

  @media screen and (max-width: 1266px) {
    &::after,
    &::before {
      content: none;
    }
  }
  @media screen and (max-width: 800px) {
    margin-left: 0;
  }
  @media screen and (max-width: 700px) {
    margin-left: 13px;
  }
`;

const labels = [
  ['day', 'days'],
  ['hour', 'hours'],
  ['minute', 'minutes'],
  ['second', 'seconds'],
];

class Countdown extends React.Component {
  componentDidMount() {
    this.updateInterval = setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    let { until } = this.props;

    if (typeof until === 'string') {
      until = new Date(until).getTime();
    }

    const total = Math.max(0, Math.round((until - Date.now()) / 1000));
    const parts = until
      ? [
          Math.floor(total / (3600 * 24)),
          Math.floor((total % (3600 * 24)) / 3600),
          Math.floor((total % 3600) / 60),
          total % 60,
        ]
      : [null, null, null, null];

    return (
      <Root>
        {parts.map((p, i) => (
          <Part days={i === 0} key={i}>
            <Num>
              {p === null ? <span>&nbsp;</span> : String(p).padStart(2, '0')}
            </Num>
            <Label>{p === 1 ? labels[i][0] : labels[i][1]}</Label>
          </Part>
        ))}
      </Root>
    );
  }
}

Countdown.propTypes = {
  until: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Countdown;
