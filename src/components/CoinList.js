/* eslint-disable global-require, import/no-dynamic-require */
/* stylelint-disable selector-combinator-blacklist */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FixedSizeList as List } from 'react-window';
import styled from 'styled-components';

import cpiIcon from '../assets/cpi.png';

const CoinListItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid grey;

  & > div {
    width: 100%;
    height: 35px;
    text-align: left;
  }

  & > div > span > img {
    position: relative;
    top: 2px;
  }

  & > div:first-child {
    width: 20%;
    text-align: center;
  }

  & > div:not(:nth-child(1)):not(:nth-child(2)) {
    text-align: right;
  }

  & > div > span,
  strong {
    line-height: 35px;
    white-space: nowrap;
  }

  @media only screen and (max-width: 600px) {
    & > div > span,
    strong {
      font-size: 0.675em;
    }

    & > div > span > img {
      width: 12px;
    }
  }
`;

class CoinRenderer extends PureComponent {
  render() {
    const { data, index, style } = this.props;
    const coin = data[index];
    let icon = null;
    if (coin.symbol === 'CPI') {
      icon = cpiIcon;
    } else {
      try {
        icon = require(`cryptocurrency-icons/32/color/${coin.symbol.toLowerCase()}.png`);
      } catch {
        icon = require(`cryptocurrency-icons/32/color/generic.png`);
      }
    }

    return (
      <CoinListItem style={style}>
        <div>
          <span>{index + 1}</span>
        </div>
        <div>
          <span>
            <img width="16px" src={icon} alt={coin.symbol} /> {coin.name}
          </span>
        </div>
        <div>
          <span>
            {`$${coin.market_cap
              .toFixed(0)
              .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}`}
          </span>
        </div>
        <div>
          <span>
            {`$${coin.price
              .toFixed(2)
              .replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')}`}
          </span>
        </div>
      </CoinListItem>
    );
  }
}

CoinRenderer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  index: PropTypes.number,
  style: PropTypes.shape({}),
};

const CoinList = ({ topCoins }) => (
  <div>
    <CoinListItem>
      <div>
        <strong>#</strong>
      </div>
      <div>
        <strong>Name</strong>
      </div>
      <div>
        <strong>Market Cap</strong>
      </div>
      <div>
        <strong>Price</strong>
      </div>
    </CoinListItem>
    <List
      height={320}
      itemCount={100}
      itemSize={35}
      width="100%"
      itemData={topCoins}
    >
      {CoinRenderer}
    </List>
  </div>
);

CoinList.propTypes = {
  topCoins: PropTypes.arrayOf(PropTypes.shape({})),
};

export default CoinList;
