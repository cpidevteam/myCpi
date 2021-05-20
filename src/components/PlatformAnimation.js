import styled from 'styled-components';
import { colors } from '../constants';

const PlatformAnimation = styled.div`
  background-color: #fff;
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  text-align: center;
  opacity: 1;
  background: ${colors.primary};
  margin: 25px auto;
`;

export default PlatformAnimation;
