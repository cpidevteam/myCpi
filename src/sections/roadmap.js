import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section, { SectionTitle } from '../components/section';
import Container from '../components/container';

import CheckedIcon from '../icons/checked.svg';
import UncheckedIcon from '../icons/unchecked.svg';
import { breakpoints, colors } from '../constants';

const inactiveLine = colors.eggWhite;
const activeLine = colors.primary;

function makeOrder(n, itemsPerRow) {
  const rowsCount = Math.ceil(n / itemsPerRow);
  const rules = [];

  for (let i = 0; i < rowsCount; i += 1) {
    for (let j = 0; j < itemsPerRow; j += 1) {
      const prevRowsLength = i * itemsPerRow;
      const index = prevRowsLength + j + 1;
      const order = prevRowsLength + (i % 2 ? itemsPerRow - j - 1 : j) + 1;
      rules.push(`&:nth-child(${index}) { order: ${order}; }`);
    }
  }

  return rules.join('\n');
}

const Item = styled.div`
  position: relative;
  width: 100%;
  padding: 0 0 30px 40px;

  h3 {
    font-size: 16px;
    text-transform: uppercase;

    margin: 0 0 10px;
  }

  p {
    font-size: 14px;

    margin: 0;

    line-height: 22px;

    color: ${colors.darkGray};
  }

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 14px;

    width: 2px;

    content: '';

    background-color: ${props =>
      props.nextActive ? activeLine : inactiveLine};
  }

  &:nth-child(8n + 8) {
    visibility: hidden !important;
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    width: 25%;
    padding: 55px 10px 0;

    h3 {
      margin-bottom: 18px;
    }

    &::before {
      top: 25px;
      right: -10px;
      left: 10px;

      width: auto;
      height: 2px;
    }

    &::after {
      position: absolute;
      top: 25px;
      bottom: -27px;
      left: 100%;

      display: none;
      width: 35px;
      margin-left: -20px;

      content: '';

      border-radius: 0 35px 35px 0;
      border: 2px solid
        ${props =>
          props.active && props.nextActive ? activeLine : inactiveLine};
      border-left-width: 0;
    }

    &:nth-child(4n + 4)::after {
      display: block;
    }

    &:nth-child(8n + 8)::after {
      border-radius: 35px 0 0 35px;
      border-left-width: 2px;
      border-right-width: 0;
      left: auto;
      right: 100%;
      margin-right: -20px;
    }

    &:nth-child(8n + 8)::after {
      border: none !important;
    }

    &:nth-child(4n + 4):not(:nth-child(8n + 8))::before {
      right: 20px;
    }

    &:nth-child(4n + 1):not(:nth-child(8n + 1))::before {
      right: 20px;
    }

    &:nth-child(8n + 5)::before,
    &:nth-child(8n + 6)::before,
    &:nth-child(8n + 7)::before,
    &:nth-child(8n + 8)::before {
      background-color: ${props =>
        props.active ? activeLine : inactiveLine} !important;
    }

    &:nth-child(4n + 1)::before,
    &:nth-child(4n + 2)::before,
    &:nth-child(4n + 3)::before,
    &:nth-child(4n + 4)::before {
      background-color: ${props =>
        props.active && props.nextActive ? activeLine : inactiveLine};
    }

    ${makeOrder(24, 4)};
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    padding: 65px 10px 10px;

    h3 {
      margin-bottom: 18px;
    }

    &::before {
      top: 35px;
      right: -20px;
      left: 20px;
    }

    &:nth-child(7)::before {
      border: none !important;
    }

    &::after {
      top: 35px;
      bottom: -37px;

      width: 35px;
      margin-left: -20px;
    }

    &:nth-child(8n + 8)::after {
      margin-right: -20px;
    }

    &:nth-child(4n + 4):not(:nth-child(8n + 8))::before {
      right: 20px;
    }

    &:nth-child(4n + 1):not(:nth-child(8n + 1))::before {
      right: 20px;
    }
  }

  &:last-child::before {
    display: none;
  }
`;

const Icon = styled.div`
  position: absolute;
  z-index: 1;

  left: 0;
  top: -9px;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    left: auto;
    top: 10px;
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    top: 20px;
  }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Roadmap = ({ title, list }) => {
  return (
    <Section>
      <Container>
        <SectionTitle>{title}</SectionTitle>

        <List>
          {list.map((item, j) => {
            const IconComp = item.done ? CheckedIcon : UncheckedIcon;
            const nextItem = list[j + 1];
            return (
              <Item
                key={j}
                active={item.done}
                nextActive={!!(nextItem && nextItem.done)}
              >
                <Icon>
                  <IconComp width={30} height={30} />
                </Icon>
                <h3>{item.title}</h3>
                <p>{item.descr}</p>
              </Item>
            );
          })}
        </List>
      </Container>
    </Section>
  );
};

Roadmap.propTypes = {
  title: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      descr: PropTypes.string.isRequired,
      done: PropTypes.bool,
    })
  ).isRequired,
};

export default Roadmap;
