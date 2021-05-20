import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  padding-left: 15px;
  padding-right: 15px;
  margin: 0 auto;

  @media screen and (max-width: 600px) {
    padding-left: ${props => (props.mobilePaddings ? 10 : 0)}px;
    padding-right: ${props => (props.mobilePaddings ? 10 : 0)}px;
  }
`;

Container.defaultProps = {
  mobilePaddings: true,
};

export default Container;
