import BigNumber from 'bignumber.js';

const last = arr => arr[arr.length - 1];

export function calcTokens(web3, amount, rate, decimals) {
  const gweiDecimals = new BigNumber(10).pow(9);
  const tokenDecimals = new BigNumber(10).pow(decimals);
  return gweiDecimals
    .multipliedBy(amount)
    .multipliedBy(rate)
    .dividedBy(tokenDecimals)
    .toNumber();
}

export function calcQuote(ethToToken, ethToEur) {
  const tokenInEth = 1 / ethToToken;
  const tokenInEur = tokenInEth * ethToEur;

  return {
    tokenInEth,
    tokenInEur,
  };
}

export const currentStage = times => {
  if (last(times) < Date.now()) {
    // sale closed
    return times.length - 2;
  }

  if (times[0] > Date.now()) {
    // sale not started
    return 0;
  }

  return Math.max(0, times.findIndex(t => t > Date.now()) - 1);
};

export const isLastStage = ({ times }) => {
  return currentStage(times) === times.length - 2;
};

export const getRate = ({ times, rates }) => rates[currentStage(times)];
export const getNextRate = ({ times, rates }) => rates[currentStage(times) + 1];
export const getOpeningTime = ({ times }) => times[currentStage(times)];
export const getClosingTime = ({ times }) => times[currentStage(times) + 1];
export const isOpened = contractData =>
  getOpeningTime(contractData) < Date.now();
export const isClosed = contractData =>
  getClosingTime(contractData) < Date.now();
