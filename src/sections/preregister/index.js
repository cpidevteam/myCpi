import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section, { SectionTitle } from '../../components/section';
import Content from '../../components/Content';
import PreRegisterModal from '../../components/preregistermodal';
import { colors } from '../../constants';

const Root = styled.div`
  padding-top: 255px;

  @media (orientation: portrait) {
    padding-top: 70px;
  }
`;

const Header = styled.header`
  text-align: center;
  padding-bottom: 40px;

  @media (orientation: portrait) {
    padding-bottom: 0px;
  }

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

class PreRegister extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { content, frontmatter: { userid, listid, url, inputemail, successMsg }} = this.props;
    return (
      <Root style={{ background: colors.eggWhite }}>
        <Header>
          <SectionTitle>Pre-Register</SectionTitle>
        </Header>
        <Section style={{ background: colors.eggWhite }}>
          <Container style={{ height: '700px' }}>
            <PreRegisterModal
              userid={userid}
              listid={listid}
              url={url}
              inputemail={inputemail}
              successMsg={successMsg}
            />
          </Container>
        </Section>
      </Root>
    );
  }
}

export default PreRegister;
