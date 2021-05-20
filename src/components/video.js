import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import PlayIcon from '../icons/play.svg';

const Root = styled.a`
  position: relative;
  display: block;
  width: 100%;
  height: 0;
  padding-bottom: 56%;

  background-image: url(${props => props.preview});
  background-size: cover;
  border-radius: 12px;
`;

const Icon = styled.i`
  position: absolute;
  left: 50%;
  top: 50%;

  width: 80px;
  height: 80px;
  margin-left: -40px;
  margin-top: -40px;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 50%;
  background-color: rgba(34, 32, 30, 0.85);
`;

const Video = ({ videoUrl, preview }) => {
  return (
    <Root href={videoUrl} preview={preview} target="_blank" rel="noopener noreferrer">
      <Icon>
        <PlayIcon width={34} height={30} />
      </Icon>
    </Root>
  );
};

Video.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
};

export default Video;
