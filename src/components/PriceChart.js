import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import _ from 'lodash';
import {
  makeWidthFlexible,
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  LineSeries,
  Crosshair,
} from 'react-vis';

dayjs.extend(utc);

const PriceChart = ({ priceHistory }) => {
  const [y, setY] = useState(null);
  const chartData = priceHistory.map(pricePoint => ({
    x: dayjs(pricePoint.createdAt).unix(),
    y: pricePoint.price,
  }));
  const tickValues = chartData
    .map(dataPoint => dataPoint.x)
    .filter((x, i, dp) => {
      return (
        dayjs
          .unix(x)
          .utc(false)
          .hour() === 0 || i === dp.length - 1
      );
    });
  const FlexibleXYPlot = makeWidthFlexible(XYPlot);

  return (
    <FlexibleXYPlot
      height={370}
      margin={{ right: 40 }}
      onMouseLeave={() => setY(null)}
      yDomain={[0, _.max(_.map(chartData, 'y')) + 5]}
    >
      <HorizontalGridLines />
      <LineSeries
        data={chartData}
        onNearestXY={d => {
          setY(d);
        }}
      />
      <XAxis
        tickValues={tickValues}
        tickFormat={v => {
          return dayjs.unix(v).format('DD/MM');
        }}
      />
      <YAxis tickFormat={v => `$${v}`} orientation="right" />
      {y && (
        <Crosshair
          titleFormat={dataPoints => {
            return {
              title: 'At',
              value: dayjs.unix(dataPoints[0].x).format('DD/MM HH:mm'),
            };
          }}
          itemsFormat={dataPoints => {
            return [
              {
                title: 'Price',
                value: dataPoints[0].y.toFixed(4),
              },
            ];
          }}
          values={[y]}
        />
      )}
    </FlexibleXYPlot>
  );
};

PriceChart.propTypes = {
  priceHistory: PropTypes.arrayOf(PropTypes.shape({})),
};

export default PriceChart;
