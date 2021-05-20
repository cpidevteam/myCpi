import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import gql from 'graphql-tag';
// import { Query } from 'react-apollo';
import { breakpoints, colors } from '../constants';

import {
  currentStage,
  getRate,
  calcTokens,
  calcQuote,
} from '../sections/sale-info-utils';

const ETH_PRICE_QUERY = gql`
  query GetEthPrice {
    getEthPrice
  }
`;

const numberFormatter = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 2,
});

const percentContent = props =>
  props.percent < 0.04 ? '' : `${Math.round(props.percent * 100)}%  `; // spaces at the end of string

const Bar = styled.div`
  overflow: hidden;

  position: relative;
  width: 100%;
  height: 50px;
  margin-top: 15px;
  margin-bottom: 18px;

  border-radius: 12px;

  &::before {
    font-size: 22px;
    font-weight: bold;

    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;

    overflow: hidden;
    width: ${props => Math.round(props.percent * 100)}%;
    height: 100%;

    text-align: right;
    line-height: 50px;

    content: '${percentContent}';
    color: ${colors.black};
    background-color: ${colors.gray};

    transition: width 0.3s;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    content: '';

    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1;
  height: 16px;
  margin: 0;
  flex: 1;
`;

const Sold = styled(Text)`
  font-weight: bold;
  margin: 0;
  text-align: left;
`;

const Min = styled(Text)`
  text-align: right;
`;

const Stage = styled(Text)`
  font-size: 18px !important;
  height: 22px;

  text-transform: uppercase;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    font-size: 22px !important;
  }
`;

const Supply = styled(Text)`
  width: 100%;
`;

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
  width: 100%;
  margin-top: 100px;

  p {
    line-height: 1;
  }

  @media screen and (max-width: ${breakpoints.mobile}px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    text-align: center;

    ${Text} {
      height: auto;
    }

    ${Stage} {
      order: 1;
      line-height: 1;

      strong {
        display: block;
      }
    }

    ${Bar} {
      order: 2;
    }

    ${Sold} {
      order: 3;
      margin-bottom: 15px;
    }

    ${Supply} {
      order: 4;
      padding: 0 30px;
      margin-bottom: 15px;
    }

    ${Min} {
      order: 5;
    }
  }
`;

const tokenDecimals = (amount, web3, saleInfo) => {
  return amount.dividedBy(new BigNumber(10).pow(saleInfo.decimals));
};

const ProgressBar = ({
  saleInfo,
  web3,
  price,
  extraSold,
  showMinimum,
  minimum,
  stageNames,
  ...props
}) => {
  const total =
    saleInfo &&
    new BigNumber(props.total).multipliedBy(
      new BigNumber(10).pow(saleInfo.decimals)
    );
  const current = saleInfo && currentStage(saleInfo.times);
  const extra = extraSold || 0;
  const sold =
    saleInfo &&
    total
      .minus(saleInfo.remains)
      .plus(
        new BigNumber(extra).multipliedBy(
          new BigNumber(10).pow(saleInfo.decimals)
        )
      );
  const priceShown = price || '1 CPI = 5€';

  return (
    // <Query query={ETH_PRICE_QUERY}>
    //   {({ data, loading, error }) => {
    //     if (loading || !saleInfo)
    //       return (
    //         <Stage>
    //           <strong>Loading...</strong>
    //         </Stage>
    //       );
    //     if (error)
    //       return (
    //         <Stage>
    //           <strong>Error displaying CPI price</strong>
    //         </Stage>
    //       );

    //     const { getEthPrice } = data;

    //     const { tokenInEth, tokenInEur } = calcQuote(
    //       calcTokens(web3, 1, getRate(saleInfo), saleInfo.decimals),
    //       getEthPrice
    //     );

    //     const priceShown =
    //       price ||
    //       `1 ${saleInfo.symbol} = ${numberFormatter.format(
    //         tokenInEth
    //       )} ETH (~ ${numberFormatter.format(tokenInEur)}€)`;

    // return (
    <>
      {/* <Sold>
        {saleInfo &&
          `${numberFormatter.format(
            tokenDecimals(sold, web3, saleInfo)
            .decimalPlaces(0)
            .toNumber()
            )} ${saleInfo.symbol} sold!`}
          </Sold> */}
      <Stage>
        {saleInfo && (
          <Fragment>
            <strong>{stageNames[current] || `Stage ${current + 1}`}:</strong>{' '}
            {priceShown}
          </Fragment>
        )}
      </Stage>
      {/* <Min>
        {saleInfo && showMinimum && (
          <Fragment>
          <strong>Minimum Investment:</strong> {minimum}
          </Fragment>
          )}
          </Min>
          <Bar
          percent={
            saleInfo
            ? sold
            .div(total)
            .decimalPlaces(2)
            .toNumber()
            : 0
          }
          />
          <Supply>
          {saleInfo && (
            <Fragment>
            <strong>ICO Supply:</strong>{' '}
            {numberFormatter.format(
              tokenDecimals(total, web3, saleInfo).toNumber()
              )}{' '}
              {saleInfo.symbol} will be sold during the ICO
              </Fragment>
              )}
            </Supply> */}
    </>
    //     );
    //   }}
    // </Query>
  );
};

ProgressBar.propTypes = {
  saleInfo: PropTypes.object,
  web3: PropTypes.object,
  total: PropTypes.string,
  price: PropTypes.string,
  extraSold: PropTypes.string,
  showMinimum: PropTypes.bool,
  minimum: PropTypes.string,
  stageNames: PropTypes.array,
};

export default ProgressBar;
