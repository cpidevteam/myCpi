import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import { withPrefix } from 'gatsby-link';
import rgba from 'hex-to-rgba';
import Container from '../../components/container';
import Section, { SectionTitle } from '../../components/section';
import QuotesIcon from '../../icons/quotes.svg';
import { breakpoints, colors } from '../../constants';

const MediaContainer = styled(Container)`
  padding-bottom: 150px;
`;

const Item = styled.a`
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 270px;
  margin-right: 15px;
  padding: 20px 40px;
  text-align: center;
  text-decoration: none;
  border-radius: 12px;
  background-color: ${colors.white};
  border: 2px solid ${colors.veryLightGray};
  transition: border 0.3s, box-shadow 0.3s, transform 0.3s;
  h3 {
    font-weight: 500;

    span {
      color: ${colors.primary};
      box-shadow: inset 0 -2px 0 ${rgba(colors.primary, 0.3)};
      transition: color 0.3s, box-shadow 0.3s;
    }
  }

  img {
    filter: grayscale(1);

    transition: filter 0.3s;
  }

  &:hover {
    transform: translateY(-10px);
    border-color: ${colors.primary};
    box-shadow: 0px 15px 20px 0px rgba(24, 23, 21, 0.1);

    img {
      filter: none;
    }

    h3 span {
      color: ${colors.black};
      box-shadow: none;
    }
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    width: calc(33.33336% - 20px * 2 / 3);
    margin-right: 20px;
    margin-bottom: 20px;

    &:nth-child(3n + 3) {
      margin-right: 0;
    }

    h3 {
      font-size: 18px;
      line-height: 30px;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    width: calc(33.33336% - 30px * 2 / 3);
    margin-right: 30px;
    margin-bottom: 30px;

    h3 {
      font-size: 20px;
      line-height: 32px;
    }
  }
`;

const List = styled.div`
  list-style: none;
  display: flex;
  margin-bottom: -30px;
  overflow-x: auto;

  padding: 20px;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    padding: 0;
    overflow: visible;
    flex-wrap: wrap;
  }
`;

const Timestamp = styled.p`
  font-size: 14px;

  margin: 0;

  color: ${colors.lightGray};
`;

const Icon = styled(QuotesIcon)`
  position: absolute;
  top: 4px;
  left: 5px;
`;

const Showcase = ({ title, content }) => {
  console.log('rrrrrrr : ', title);
  console.log('contentcontent : ', content);
  // const items = [
  //   {
  //     title:
  //       'Coinbase Claims State-of-the-Art Security, Compliance with NY Rules',
  //     link: '#',
  //     date: '01.02.2018',
  //     logo: withPrefix('/forbes.png'),
  //   },
  //   {
  //     title:
  //       'Interview with Luckchemy Team On their Provably Fair, Blockchain-powered Gaming Platform',
  //     link: '#',
  //     date: '01.02.2018',
  //     logo: withPrefix('/cnbc.png'),
  //   },
  //   {
  //     title:
  //       'Shivom Raises $32M in Presale to Create Genomic Data Pool on Blockchain',
  //     link: '#',
  //     date: '01.02.2018',
  //     logo: withPrefix('/huffington-post.png'),
  //   },
  //   {
  //     title:
  //       'Interview with Luckchemy Team On their Provably Fair, Blockchain-powered Gaming Platform',
  //     link: '#',
  //     date: '01.02.2018',
  //     logo: withPrefix('/cnbc.png'),
  //   },
  //   {
  //     title:
  //       'Shivom Raises $32M in Presale to Create Genomic Data Pool on Blockchain',
  //     link: '#',
  //     date: '01.02.2018',
  //     logo: withPrefix('/huffington-post.png'),
  //   },
  //   {
  //     title:
  //       'Coinbase Claims State-of-the-Art Security, Compliance with NY Rules',
  //     link: '#',
  //     date: '01.02.2018',
  //     logo: withPrefix('/forbes.png'),
  //   },
  // ];

  return (
    <Section style={{ paddingTop: 40 }}>
      <MediaContainer mobilePaddings={false}>
        {title && (
          <SectionTitle>
            {title}
            {content}
          </SectionTitle>
        )}

        <List>
          Showcase
          {/* {articles.map((article, i) => (
            <Item
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={article.logo} alt={article.title} />
              <h3>
                <span>{article.title}</span>
              </h3>

              <Icon width={40} height={40} />

              <Timestamp>{article.date}</Timestamp>
            </Item>
          ))} */}
        </List>
      </MediaContainer>
    </Section>
  );
};

Showcase.propTypes = {
  title: PropTypes.string,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      image: PropTypes.string,
      videoUrl: PropTypes.string,
    })
  ),
};

export default Showcase;
