import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section, { SectionTitle } from '../../components/section';
import Content from '../../components/Content';
import { colors } from '../../constants';

const Root = styled.div`
  padding-top: 170px;
  padding-bottom: 255px;
`;

const Header = styled.header`
  text-align: center;
  padding-bottom: 40px;

  a:hover {
    color: #181715 !important;
  }

  p {
    font-size: 15px;
    margin: -10px 0 0;

    color: #666666;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;

  ul {
    list-style-position: inside;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
    color: ${colors.primary} !important;
  }
`;

class PrivacyPolicy extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { content } = this.props;
    return (
      <Root>
        <Header>
          <SectionTitle>Privacy Policy</SectionTitle>
        </Header>
        <Section>
          <Container>
            <Content markdown>{content}</Content>
          </Container>
        </Section>
      </Root>
    );
  }
}

export default PrivacyPolicy;
