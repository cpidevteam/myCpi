import styled from 'styled-components';
import rgba from 'hex-to-rgba';
import { breakpoints } from '../../constants';

export const List = styled.ul`
  list-style: none;
  display: flex;
  padding: 0 20px 150px;
  justify-content: center;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    padding: 0;
    flex-wrap: wrap;
  }
`;

export const ListWrapper = styled.div`
  overflow-x: auto;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    overflow: visible;
  }
`;
