import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Container from '../../components/container';
import Section, { SectionTitle } from '../../components/section';

import QuestionIcon from '../../icons/question.svg';
import PlusIcon from '../../icons/plus.svg';
import MinusIcon from '../../icons/minus.svg';
import { colors } from '../../constants';

const Root = styled.div`
  padding-top: 170px;
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

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tab = styled.a`
  font-size: 22px;
  font-weight: ${props => (props.current ? 'bold' : 'normal')};

  width: 200px;
  text-align: center;

  margin: 0 15px;
  padding: 15px 0;

  cursor: pointer;

  color: #181715 !important;
  border-bottom: 3px solid
    ${props => (props.current ? colors.primary : '#d5d4d1')};
`;

const Questions = styled.ul`
  width: 100%;
  list-style: none;
  padding: 30px;
  margin: 0;

  border: 2px solid ${colors.lightPrimary};
  border-radius: 24px;

  @media screen and (max-width: 750px) {
    padding: 15px;
  }
`;

const Item = styled.li`
  margin: 30px 0 0;
  padding: 20px 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 7px 24px 0px rgba(0, 0, 0, 0.18);

  &:first-child {
    margin-top: 0;
  }
  @media screen and (max-width: 750px) {
    padding: 20px 15px;
  }
  @media screen and (max-width: 700px) {
    padding: 10px 15px;
  }
`;

const Question = styled.a`
  font-size: 22px;
  font-weight: bold;
  display: flex;
  cursor: pointer;
  line-height: 32px;
  align-items: center;

  color: ${props => (props.expanded ? colors.primary : '#181715')} !important;

  span {
    width: 100%;
    margin: 0 20px;
  }

  svg {
    flex-shrink: 0;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
    text-align: center;

    > svg {
      margin: 0 0 10px 0;
    }
    span + svg {
      margin: 10px 0 0 0;
    }
  }
`;

const Answer = styled.div`
  font-size: 15px;
  line-height: 25px;
  padding-top: 30px;
  color: #666;
`;

const FAQContainer = styled(Container)`
  padding-top: 30px;
  padding-bottom: 170px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

class FAQ extends React.Component {
  static propTypes = {
    sections: PropTypes.array,
    email: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      expanded: null,
    };
  }

  render() {
    const { tab, expanded } = this.state;
    const { sections, email } = this.props;
    return (
      <Root>
        <Header>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <p>
            Can
            {"'"}t find your question? Send an email to{' '}
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        </Header>
        <Section style={{ backgroundColor: '#f3f2ef' }}>
          <FAQContainer>
            <Tabs>
              {sections.map(({ title }, i) => (
                <Tab
                  key={i}
                  current={tab === i}
                  onClick={() => this.setState({ tab: i, expanded: null })}
                >
                  {title}
                </Tab>
              ))}
            </Tabs>

            <Questions>
              {sections[tab].items.map((item, i) => (
                <Item key={i}>
                  <Question
                    expanded={expanded === i}
                    onClick={() =>
                      this.setState(state => ({
                        expanded: state.expanded === i ? null : i,
                      }))
                    }
                  >
                    <QuestionIcon width={56} height={56} />
                    <span>{item.question}</span>
                    {expanded !== i && <PlusIcon width={31} height={31} />}
                    {expanded === i && <MinusIcon width={31} height={3} />}
                  </Question>
                  {expanded === i && (
                    <Answer dangerouslySetInnerHTML={{ __html: item.answer }} />
                  )}
                </Item>
              ))}
            </Questions>
          </FAQContainer>
        </Section>
      </Root>
    );
  }
}

export default FAQ;
