import styled from 'styled-components';
import rgba from 'hex-to-rgba';
import { breakpoints } from '../../constants';

export const Item = styled.li`
  position: relative;

  overflow: hidden;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 270px;
  margin-right: 15px;
  padding: 20px;

  text-align: center;

  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 3px 12px 0px rgba(0, 0, 0, 0.1);
  transform: translate3d(0, 0, 0);

  img {
    width: 160px;
  }

  h3 {
    font-size: 18px;

    margin: 14px 0 6px;
  }

  p {
    font-size: 14px;

    margin: 0;

    line-height: 22px;

    color: #666666;
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    width: calc(33.33336% - 20px * 2 / 3);
    margin-right: 20px;
    margin-bottom: 20px;

    &:nth-child(3n + 3) {
      margin-right: 0;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    width: calc(25% - 30px * 3 / 4);
    margin-right: 30px;
    margin-bottom: 30px;

    &:nth-child(3n + 3) {
      margin-right: 30px;
    }

    &:nth-child(4n + 4) {
      margin-right: 0;
    }
  }
`;

export const Member = styled.div`
  margin-bottom: 6px;
`;

export const CloseInfo = styled.button`
  all: initial;

  position: absolute;
  top: 0;
  right: 0;

  padding: 5px;

  cursor: pointer;
  opacity: 0.6;

  color: #191815;

  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const InfoButton = styled.button`
  all: initial;

  position: absolute;
  top: 0;
  right: 0;
  margin-bottom: 6px;

  cursor: pointer;

  color: #181715;
  border: 22px solid ${rgba('#e5e1d6', 0.6)};
  filter: grayscale(0.4);
  border-bottom-color: transparent;
  border-left-color: transparent;
  transition: border-color 0.2s;

  svg {
    position: absolute;
    bottom: 25%;
    left: 25%;
    opacity: 0.5;
    transition: opacity 0.2s;
  }

  &:hover {
    border-top-color: #e5e1d6;
    border-right-color: #e5e1d6;
    filter: none;

    svg {
      opacity: 1;
    }
  }
`;
export const Info = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  padding: 20px 10px;

  text-align: left;

  background-color: #e0ddd5;

  p + p {
    margin-top: 7px;
    -webkit-font-smoothing: antialiased;
  }
`;
