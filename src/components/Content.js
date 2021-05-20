import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import remark from 'remark';
import html from 'remark-html';
import { colors } from '../constants';

const Root = styled.div`
  h3 {
    font-size: 22px;
    font-weight: normal;

    margin: 0 0 15px;

    line-height: 30px;

    strong {
      text-transform: uppercase;
    }
  }

  ul {
    list-style-position: inside;
    margin: 20px 10px;
    color: ${colors.darkGray};
    font-size: 15px;
  }

  p {
    font-size: 15px;

    margin: 0;

    line-height: 25px;

    color: ${props => (props.dark ? colors.white : colors.darkGray)};
  }

  p + p {
    margin-top: 20px;
  }

  img {
    max-width: 100%;
  }

  &::after {
    content: '';
    display: block;
    clear: both;
  }

  @media only screen and (max-width: 600px) {
    img {
      display: block;
      margin: 25px auto !important;
      min-width: auto;
      float: none !important;
    }
  }
`;

const mdProcessor = remark().use(html);
function htmlContent(children, markdown) {
  if (markdown) {
    return mdProcessor.processSync(children).contents;
  }

  return children;
}

const Content = ({ children, markdown, ...props }) => {
  if (typeof children === 'string') {
    return (
      <Root
        dangerouslySetInnerHTML={{ __html: htmlContent(children, markdown) }}
        {...props}
      />
    );
  }

  return <Root {...props}>{children}</Root>;
};

Content.propTypes = {
  children: PropTypes.any,
  markdown: PropTypes.bool,
};

export default Content;
