import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../constants';

const Root = styled.div`
  padding: 10px;
  background-color: ${colors.eggWhite};
`;

const Tabs = styled.div`
  display: flex;

  margin: 0 -5px 10px;
`;

const Tab = styled.a`
  font-size: 16px;
  font-weight: ${props => (props.current ? 'bold' : 'normal')};
  flex: 1;

  text-align: center;
  border-bottom: 3px solid
    ${props => (props.current ? colors.primary : colors.gray)};

  margin: 0 5px;
  padding: 7px 0;
  cursor: pointer;
  color: ${colors.black} !important;

  &:hover {
    border-bottom-color: ${colors.primary};
  }
`;

const VideoWrapper = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 56%;

  background-image: url(${props => props.preview});
  background-size: cover;
  border-radius: 12px;

  iframe {
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    border: 0;
  }
`;

class Videos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  render() {
    const { videos } = this.props;
    const { current } = this.state;
    console.log('dfgklfjgld : ', this.props);
    if (videos.length === 0) {
      return false;
    }

    return (
      <Root>
        {videos.length > 1 && (
          <Tabs>
            {videos.map((vid, i) => (
              <Tab
                onClick={() => this.setState({ current: i })}
                key={vid.embed}
                current={current === i}
              >
                {vid.label}
              </Tab>
            ))}
          </Tabs>
        )}
        <VideoWrapper>
          <iframe
            src={videos[current].embed}
            allowFullScreen="allowFullScreen"
            title={videos[current].label}
          />
        </VideoWrapper>
      </Root>
    );
  }
}

Videos.propTypes = {
  videos: PropTypes.array.isRequired,
};

export default Videos;
