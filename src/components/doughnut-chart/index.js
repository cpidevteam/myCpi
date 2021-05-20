import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { pieTop, pieInner, pieOuter, prepareData } from './utils';
import { getPaletteColor } from '../../utils';

const Path = styled.path`
  transition: fill 0.2s;
`;

const DoughnutChart = ({
  data,
  palette,
  width,
  height,
  radiusX,
  radiusY,
  thick,
  innerRadius,
  onMouseEnter,
  onMouseLeave,
}) => {
  const renderData = prepareData(data);
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="16" />
        </filter>
      </defs>
      <g
        width={width}
        height={height}
        id="donut"
        transform={`translate(${width / 2} ${height / 2.5})`}
      >
        <Path
          fill="rgba(0,0,0,0.3)"
          d={pieTop(
            { startAngle: 0, endAngle: Math.PI * 2 },
            radiusX * 0.9,
            radiusY * 0.9,
            innerRadius
          )}
          transform="translate(0, 60)"
          filter="url(#blur)"
        />

        {renderData.map((piece, i) => (
          <Path
            transform="scale(0.999)"
            key={`outer-${i}`}
            fill={getPaletteColor(palette, i, -0.2)}
            d={pieOuter(piece, radiusX, radiusY, thick)}
            onMouseEnter={onMouseEnter && (() => onMouseEnter(i))}
            onMouseLeave={onMouseLeave}
          />
        ))}

        {renderData.map((piece, i) => (
          <Path
            transform="scale(1.01)"
            key={`inner-${i}`}
            fill={getPaletteColor(palette, i, -0.2)}
            d={pieInner(piece, radiusX, radiusY, thick, innerRadius)}
            onMouseEnter={onMouseEnter && (() => onMouseEnter(i))}
            onMouseLeave={onMouseLeave}
          />
        ))}

        {renderData.map((piece, i) => (
          <Path
            key={`top-${i}`}
            fill={getPaletteColor(palette, i)}
            d={pieTop(piece, radiusX, radiusY, innerRadius)}
            onMouseEnter={onMouseEnter && (() => onMouseEnter(i))}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </g>
    </svg>
  );
};

DoughnutChart.propTypes = {
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  radiusX: PropTypes.number.isRequired,
  radiusY: PropTypes.number.isRequired,
  thick: PropTypes.number.isRequired,
  innerRadius: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      percent: PropTypes.number.isRequired,
    })
  ),
  palette: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DoughnutChart;
