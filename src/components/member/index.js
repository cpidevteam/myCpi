import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby-link';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';

import Socials from "../socials";
import InfoIcon from '../../icons/info.svg';
import CloseIcon from '../../icons/close.svg';
import defaultPhoto from '../../assets/team-No-Photo@2x.png';
import { colors } from '../../constants';

import { Item, Member, Info, InfoButton, CloseInfo } from './styles';

export default class TeamMember extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    showPhoto: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
    };
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  toggleInfo() {
    this.setState(state => ({ showInfo: !state.showInfo }));
  }

  render() {
    const { data, showPhoto } = this.props;
    const { showInfo } = this.state;

    return (
      <Item>
        <Member>
          {showPhoto && (
            <img
              src={data.photo ? withPrefix(data.photo) : defaultPhoto}
              alt={data.name}
            />
          )}
          <h3>{data.name}</h3>
          <p>{data.pos}</p>
          <p>{data.company}</p>
        </Member>

        {data.bio && (
          <InfoButton onClick={this.toggleInfo}>
            <InfoIcon width={16} height={16} />
          </InfoButton>
        )}

        {showInfo && (
          <Info>
            <CloseInfo onClick={this.toggleInfo}>
              <CloseIcon width={16} height={16} />
            </CloseInfo>
            <PerfectScrollbar>
              <div dangerouslySetInnerHTML={{ __html: data.bio }} />
            </PerfectScrollbar>
          </Info>
        )}

        <Socials
          stroke={colors.primary}
          github={data.github}
          facebook={data.facebook}
          linkedin={data.linkedin}
          twitter={data.twitter}
        />
      </Item>
    );
  }
}
