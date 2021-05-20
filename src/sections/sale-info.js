import React, { Fragment } from 'react';
import Web3 from 'web3';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/button';
import Container from '../components/container';
import ProgressBar from '../components/progress-bar';
import Countdown from '../components/countdown';
import StarsBg from '../components/stars-bg';
import WhitePaperIcon from '../icons/whitepaper.svg';
import CrowdasleIcon from '../icons/crowdsale.svg';
import { breakpoints, colors } from '../constants';
import { readData } from '../utils';
import { withPresale, simpleToken } from '../contracts';

import {
  getClosingTime,
  isClosed,
  isLastStage,
  isOpened,
} from './sale-info-utils';
import Feedback from './feedback';

const Root = styled.div`
  position: relative;
  text-align: center;

  color: ${colors.white};

  h1,
  h3 {
    margin: 0;
    line-height: 28px;
  }

  h1 {
    font-size: 30px;
  }

  h3 {
    font-size: 18px;
    font-weight: normal;

    margin-bottom: 10px;

    text-transform: uppercase;
  }

  p {
    font-size: 13px;

    line-height: 20px;
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    h1 {
      font-size: 40px;
    }

    h3 {
      font-size: 26px;

      margin-bottom: 10px;
    }

    h1,
    h3 {
      line-height: 42px;
    }

    p {
      font-size: 16px;

      line-height: 30px;
    }
  }
`;

const Bg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const SaleInfoContainer = styled(Container)`
  padding-top: 80px;
  padding-bottom: 30px;

  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 1;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    padding-top: 150px;
    padding-bottom: 70px;
  }
`;

const Rows = styled.div`
  display: flex;
  justify-content: space-between;
  flex-flow: wrap;
  ${props =>
    props.center
      ? `
    flex-direction: column;
    align-items: center;
    `
      : null};
`;

const BarWrapper = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    margin-top: 50px;
  }
`;

const CountdownWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    margin-top: ${props => (props.secondary ? '150px' : '24px')};
    margin-bottom: 29px;
  }
`;

const Half = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 47px;
  margin-top: 25px;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    width: calc(50% - 15px);
    margin-top: 0;
    padding-bottom: 65px;
  }

  &:first-child {
    margin-top: 0;
  }
`;

const ButtonWrapper = styled.div`
  top: ${props => (props.topMargin ? 320 : 230)}px;
  margin-top: ${props => (props.topMargin ? 20 : 0)}px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  text-align: center;
`;

const Intro = styled(Half)`
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 50px !important;
`;

const Sale = styled(Half)`
  padding-left: ${props => (props.closed ? 50 : 20)}px;
  padding-right: ${props => (props.closed ? 50 : 20)}px;

  h3 {
    position: relative;
    padding-bottom: ${props => (props.closed ? 15 : 0)}px;
    margin-bottom: ${props => (props.closed ? 20 : 0)}px;

    &::before {
      position: absolute;
      left: 50%;
      bottom: 0;

      display: ${props => (props.closed ? 'block' : 'none')};
      width: 70px;
      height: 3px;
      margin-left: -35px;

      content: '';

      background-color: ${colors.primary};
    }
  }
`;

const icoTitle = saleInfo => {
  if (isOpened(saleInfo)) {
    if (isLastStage(saleInfo)) {
      return 'ICO CLOSES IN:';
    }

    return 'NEXT ICO STAGE STARTS IN:';
  }

  return 'ICO STARTS IN:';
};

class SaleInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saleInfo: null,
    };
  }

  componentDidMount() {
    this.loadSaleInfo();
  }

  loadSaleInfo() {
    const { settings } = this.props;
    if (!settings.crowdsaleAddr) {
      return;
    }
    // ToDo: get provider url and contract address from sale-config.md
    this.web3 = new Web3();
    this.web3.setProvider(
      new this.web3.providers.HttpProvider(settings.web3ProviderUrl)
    );
    const crowdsale = new this.web3.eth.Contract(
      withPresale,
      settings.crowdsaleAddr
    );

    readData(crowdsale, 'getParams', []).then(
      ([times, rates, _, __, walletAddr, tokenAddr]) => {
        const token = new this.web3.eth.Contract(simpleToken, tokenAddr);
        Promise.all([
          readData(token, 'allowance', [walletAddr, settings.crowdsaleAddr]),
          readData(token, 'symbol', []),
          readData(token, 'decimals', []),
        ])
          .then(([remains, symbol, decimals]) => {
            this.setState({
              saleInfo: {
                remains,
                symbol,
                decimals,
                rates,
                times: times.map(t => Number(t) * 1000),
              },
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    );
  }

  render() {
    const { intro, settings, feedback } = this.props;
    const { saleInfo } = this.state;
    const closed = saleInfo && isClosed(saleInfo);

    return (
      <Root>
        <Bg>
          <StarsBg />
        </Bg>
        <SaleInfoContainer>
          <Rows center>
            <Intro>
              <div dangerouslySetInnerHTML={{ __html: intro }} />
              <BarWrapper>
                {settings.crowdsaleAddr && (
                  <ProgressBar
                    saleInfo={saleInfo}
                    price={settings.price}
                    extraSold={settings.extraSold}
                    showMinimum={settings.showMinimum}
                    stageNames={settings.stageNames}
                    minimum={settings.minimum}
                    web3={this.web3}
                    total={settings.total}
                  />
                )}
              </BarWrapper>
              {settings.whitePaper && (
                <ButtonWrapper topMargin>
                  <Button
                    style={{ fill: colors.white }}
                    className="cta-whitepaper"
                    component="a"
                    href={settings.whitePaper}
                    icon={<WhitePaperIcon width={29} height={29} />}
                  >
                    {settings.whitePaperLabel}
                  </Button>
                </ButtonWrapper>
              )}
              {(settings.hideCountdown ||
                (!settings.crowdsaleAddr && !settings.countDownTo)) && (
                <ButtonWrapper topMargin>
                  <Button
                    component="a"
                    className="cta-presale"
                    href={settings.crowdsale}
                    icon={<CrowdasleIcon width={29} height={29} />}
                  >
                    {settings.crowdsaleLabel}
                  </Button>
                </ButtonWrapper>
              )}
            </Intro>
            <Feedback {...feedback} />
            {/* <Sale closed={closed}>
              {!saleInfo && settings.crowdsaleAddr && (
                <Fragment>
                  <h3>&nbsp;</h3>
                  <CountdownWrapper>
                    <Countdown until={null} />
                  </CountdownWrapper>
                </Fragment>
              )}
              {settings.countDownTo && !settings.crowdsaleAddr && (
                <Fragment>
                  <h3>{settings.icoTitle}</h3>
                  <CountdownWrapper>
                    <Countdown until={settings.countDownTo} />
                  </CountdownWrapper>
                  <ButtonWrapper>
                    <Button
                      component="a"
                      href={settings.crowdsale}
                      icon={<CrowdasleIcon width={29} height={29} />}
                    >
                      {settings.crowdsaleLabel}
                    </Button>
                  </ButtonWrapper>
                </Fragment>
              )}
              {saleInfo && !closed && settings.crowdsaleAddr && (
                <Fragment>
                  <h3>{settings.icoTitle || icoTitle(saleInfo)}</h3>
                  <CountdownWrapper>
                    <Countdown until={getClosingTime(saleInfo)} />
                  </CountdownWrapper>
                  <ButtonWrapper>
                    <Button
                      component="a"
                      href={settings.crowdsale}
                      icon={<CrowdasleIcon width={29} height={29} />}
                    >
                      {settings.crowdsaleLabel}
                    </Button>
                  </ButtonWrapper>
                </Fragment>
              )}
              {saleInfo && closed && (
                <Fragment>
                  <h3>TOKEN SALE HAS ENDED!</h3>
                  <p>
                    You can check your KleanLoop balance by adding the token
                    details into your ERC20-wallet.
                    <br />
                    Click the button below for more details.
                  </p>
                  <ButtonWrapper>
                    <Button
                      component="a"
                      href={settings.details}
                      icon={<CrowdasleIcon width={29} height={29} />}
                    >
                      {settings.detailsLabel}
                    </Button>
                  </ButtonWrapper>
                </Fragment>
              )}
            </Sale> */}
          </Rows>
        </SaleInfoContainer>
      </Root>
    );
  }
}

SaleInfo.propTypes = {
  intro: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
};

export default SaleInfo;
