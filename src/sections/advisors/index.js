import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby-link';
import Section, { SectionTitle } from '../../components/section';
import Container from '../../components/container';
import TeamMember from '../../components/member';
import { List, ListWrapper } from './styles';

class Advisors extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    members: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        pos: PropTypes.string,
        company: PropTypes.string,
        photo: PropTypes.string,
        bio: PropTypes.string,
        facebook: PropTypes.string,
        twitter: PropTypes.string,
        github: PropTypes.string,
        linkedin: PropTypes.string,
      })
    ).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showPhotos: false,
    };

    this.handleIntersection = this.handleIntersection.bind(this);
  }

  handleIntersection() {
    if (!this.state.showPhotos) {
      this.setState({ showPhotos: true });
    }
  }

  render() {
    const { title, members } = this.props;

    return (
      <Section
        backgroundColor="#f2f1ef"
        backgroundUrl={withPrefix('/team-bg.jpg')}
        onIntersectViewport={this.handleIntersection}
      >
        <Container mobilePaddings={false}>
          <SectionTitle>{title}</SectionTitle>

          <ListWrapper>
            <List>
              {members.map(
                (item, i) =>
                  item.photo && (
                    <TeamMember
                      key={i}
                      data={item}
                      showPhoto={this.state.showPhotos}
                    />
                  )
              )}
            </List>
          </ListWrapper>
        </Container>
      </Section>
    );
  }
}

export default Advisors;
