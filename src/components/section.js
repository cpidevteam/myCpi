import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from './container';
import { breakpoints } from '../constants';

const PARALLAX_PRC = 10;

const Root = styled.section`
  overflow: hidden;
  color: ${props => props.color};
  background-color: ${props => props.backgroundColor};
  position: relative;

  ${Container} {
    padding-top: 30px;
    padding-bottom: 30px;
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    ${Container} {
      padding-top: 70px;
      padding-bottom: 80px;
    }
  }
`;

const ContentWrapper = styled.div`
  z-index: 1;
  position: relative;
`;

const Background = styled.div`
  position: absolute;
  top: -10%;
  left: 0;

  width: 100%;
  height: 110%;

  background-image: url(${props => props.backgroundUrl});
  background-size: cover;
`;

export const SectionTitle = styled.h2`
  font-size: 22px;
  margin-top: ${props => (props.marginTop ? 147 : 0)}px;
  line-height: 40px;
  text-align: center;
  text-transform: uppercase;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    font-size: 32px;
  }
`;

class Section extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    onIntersectViewport: PropTypes.func,
    backgroundUrl: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.handleBgRef = this.handleBgRef.bind(this);
    this.handleRootRef = this.handleRootRef.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleIntersection = this.handleIntersection.bind(this);
    this.state = {
      bgLoaded: false,
    };
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    this.intersectionObserver.unobserve(this.rootRef);
    this.intersectionObserver.disconnect();
  }

  handleRootRef(node) {
    if (!this.intersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(
        this.handleIntersection,
        {
          rootMargin: '0px 0px 20% 0px',
        }
      );
    }

    if (node) {
      if (this.rootRef) {
        this.intersectionObserver.unobserve(this.rootRef);
      }
      this.rootRef = findDOMNode(node); // eslint-disable-line
      this.intersectionObserver.observe(this.rootRef);
    }
  }

  handleBgRef(node) {
    if (node) {
      this.bgRef = findDOMNode(node); // eslint-disable-line
    }
  }

  handleIntersection([entry]) {
    if (entry.isIntersecting) {
      if (this.props.onIntersectViewport) {
        this.props.onIntersectViewport();
      }
      window.addEventListener('scroll', this.handleScroll);

      if (!this.state.bgLoaded && this.props.backgroundUrl) {
        const img = new Image();
        img.onload = () => {
          this.setState({ bgLoaded: true });
        };
        img.src = this.props.backgroundUrl;
      }
    } else {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  handleScroll() {
    if (this.bgRef) {
      const rect = this.rootRef.getBoundingClientRect();
      const topPrc = Math.max(
        0,
        Math.min(1, (window.innerHeight - rect.top) / rect.height - 0.2)
      );
      const top = topPrc * rect.height * 0.1;

      this.bgRef.style.transform = `translate3d(0, ${top}px, 0)`;
    }
  }

  render() {
    const { children, ...props } = this.props;
    const { bgLoaded } = this.state;
    return (
      <Root {...props} ref={this.handleRootRef}>
        {props.backgroundUrl &&
          bgLoaded && <Background ref={this.handleBgRef} {...props} />}
        <ContentWrapper>{children}</ContentWrapper>
      </Root>
    );
  }
}

export default Section;
