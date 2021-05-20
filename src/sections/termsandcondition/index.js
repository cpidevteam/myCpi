import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section, { SectionTitle } from '../../components/section';
import Content from '../../components/Content';

const Root = styled.div`
  padding-top: 170px;
  padding-bottom: 255px;
`;

const Header = styled.header`
  text-align: center;
  padding-bottom: 40px;

  a:hover {
    color: #181715;
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
`;

class TermsAndConditions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { content } = this.props;
    return (
      <Root>
        <Header>
          <SectionTitle>Terms And Conditions</SectionTitle>
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

export default TermsAndConditions;
