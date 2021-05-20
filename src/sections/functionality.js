import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby-link';
import Section, { SectionTitle } from '../components/section';
import Container from '../components/container';
import Content from '../components/Content';
import SaleStages from '../components/sale-stages';
import { colors } from '../constants';

const Functionality = ({ settings, intro }) => (
  <Section
    backgroundUrl={withPrefix('/func-bg.jpg')}
    backgroundColor={colors.primary}
    color={colors.white}
  >
    <Container>
      {settings.funcTitle && (
        <Fragment>
          <SectionTitle>{settings.funcTitle}</SectionTitle>
          <Content dark markdown>
            {intro}
          </Content>
        </Fragment>
      )}

      <SectionTitle>{settings.detailsTitle}</SectionTitle>
      <SaleStages
        crowdsale={settings.crowdsale}
        stages={settings.stages}
        btnText={settings.btntext}
      />
    </Container>
  </Section>
);

Functionality.propTypes = {
  intro: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
};

export default Functionality;
