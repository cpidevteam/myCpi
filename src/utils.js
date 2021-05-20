import React from 'react';
import hexToHsl from 'hex-to-hsl';
import hslToHex from 'hsl-to-hex';

export const omitProps = (Component, ...propsList) => ({ ...props }) => {
  // without spread props will be a freezed object
  propsList.forEach(key => {
    delete props[key];
  });
  return <Component {...props} />;
};

export function lighten(amount, color) {
  const [h, s, l] = hexToHsl(color);
  return hslToHex(h, s, Math.min(100, Math.max(0, l + amount * 100)));
}

export const readData = (contract, method, args) => {
  return contract.methods[method](...args).call();
};

export const promisifyWeb3Call = (contract, method, ...args) =>
  new Promise((resolve, reject) => {
    contract.methods[method](...args, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });

export function getPaletteColor(palette, index, lightenAmount) {
  const color = palette[index % palette.length];

  if (lightenAmount) {
    return lighten(lightenAmount, color);
  }

  return color;
}
