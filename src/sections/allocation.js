import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section, { SectionTitle } from '../components/section';
import Container from '../components/container';
import DoughnutChart from '../components/doughnut-chart';
import { breakpoints, colors } from '../constants';
import { getPaletteColor } from '../utils';

const Row = styled.div`
  @media screen and (min-width: ${breakpoints.mobile}px) {
    display: flex;
  }
`;

const Chart = styled.aside`
  text-align: center;
  svg {
    width: 250px;
    height: auto;
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    text-align: left;
    width: auto;
    svg {
      width: 400px;
    }
  }

  @media screen and (min-width: ${breakpoints.desktop}px) {
    width: 700px;
    svg {
      width: auto;
    }
  }
`;

const Percents = styled.dl`
  line-height: 22px;
  padding-top: 0px;
  padding-left: 30px;

  @media screen and (min-width: ${breakpoints.mobile}px) {
    padding-top: 30px;
    padding-left: 40px;
    line-height: 30px;
  }
`;

const Percent = styled.dd`
  font-size: 15px;
  font-weight: bold;

  position: relative;

  margin: 0;

  color: ${props => props.color};
  transition: color 0.2s;

  &::before,
  &::after {
    position: absolute;
    right: 100%;
    top: 5px;
    content: '';
    border-radius: 50%;
  }

  &::before {
    width: 10px;
    height: 10px;
    margin-right: 15px;

    transition: background-color 0.2s;
    background-color: ${props => props.color};
  }

  &::after {
    width: 16px;
    height: 16px;
    margin-top: -3px;
    margin-right: 12px;

    opacity: 0.5;

    transition: border-color 0.2s;
    border: 2px solid ${props => props.color};
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    font-size: 22px;

    &::before,
    &::after {
      top: 8px;
    }

    &::before {
      margin-right: 23px;
    }

    &::after {
      margin-top: -3px;
      margin-right: 20px;
    }
  }
`;

const PercentLabel = styled.dt`
  font-size: 13px;
  font-weight: normal;
  margin: 10px 0 0;

  ${Percent}:first-child + & {
    margin-top: 0;
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    font-size: 18px;
  }
`;

const Facts = styled.div`
  font-size: 13px;

  padding: 30px 40px;

  line-height: 18px;
  text-align: center;

  border-radius: 12px;
  background-color: ${colors.white};
  color: ${colors.darkGray};
  box-shadow: 0px 7px 24px 0px rgba(0, 0, 0, 0.1);

  p {
    margin: 0;
  }

  p + p {
    margin-top: 20px;
  }

  strong {
    font-size: 28px;
    display: block;

    margin-top: 10px;

    color: ${colors.realBlack};
  }

  @media screen and (min-width: ${breakpoints.mobile}px) {
    font-size: 18px;

    padding: 30px 40px;

    line-height: 40px;
    text-align: left;

    strong {
      margin-top: 0;
    }

    p + p {
      margin-top: 10px;
    }
  }
`;

const numFormatter = new Intl.NumberFormat('en-US');

const setPaletteHover = (palette, hover) => {
  if (hover === null) {
    return palette;
  }

  const i = hover % palette.length;
  return Object.assign([], palette, {
    [i]: getPaletteColor(palette, i, 0.2),
  });
};

class Allocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allocationHover: null,
      infoHover: null,
    };
  }

  render() {
    const { settings } = this.props;
    const { allocationHover, infoHover } = this.state;
    const palette = [
      colors.primary,
      colors.lightGray,
      colors.darkGray,
      '#484848',
      colors.black,
    ];
    const allocationPallete = setPaletteHover(palette, allocationHover);
    const infoPallete = setPaletteHover(palette, infoHover);
    const onMouseLeave = () =>
      this.setState({
        allocationHover: null,
        infoHover: null,
      });
    return (
      <Section style={{ backgroundColor: colors.eggWhite }}>
        <Container>
          <SectionTitle>{settings.allocationTitle}</SectionTitle>

          <Row>
            <Chart>
              <DoughnutChart
                data={settings.allocation}
                palette={allocationPallete}
                width={490}
                height={490}
                radiusX={235}
                radiusY={195}
                thick={30}
                innerRadius={0.65}
                onMouseEnter={i => this.setState({ allocationHover: i })}
                onMouseLeave={onMouseLeave}
              />
            </Chart>
            <Percents>
              {settings.allocation.reduce((nodes, { percent, label }, i) => {
                const onMouseEnter = () =>
                  this.setState({ allocationHover: i });
                return [
                  ...nodes,
                  <PercentLabel
                    key={`dt-${label}`}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  >
                    {label}
                  </PercentLabel>,
                  <Percent
                    key={`dd-${label}`}
                    color={getPaletteColor(allocationPallete, i)}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  >
                    {percent}% of all tokens issued
                  </Percent>,
                ];
              }, [])}
            </Percents>
          </Row>

          <SectionTitle>{settings.infoTitle}</SectionTitle>

          <Row>
            <Chart>
              <DoughnutChart
                data={settings.information}
                palette={infoPallete}
                width={490}
                height={490}
                radiusX={235}
                radiusY={195}
                thick={30}
                innerRadius={0.65}
                onMouseEnter={i => this.setState({ infoHover: i })}
                onMouseLeave={onMouseLeave}
              />
            </Chart>
            <div>
              <Percents>
                {settings.information.reduce((nodes, { percent, label }, i) => {
                  const onMouseEnter = () => this.setState({ infoHover: i });
                  return [
                    ...nodes,
                    <PercentLabel
                      key={`dt-${label}`}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                    >
                      {label}
                    </PercentLabel>,
                    <Percent
                      key={`dd-${label}`}
                      color={getPaletteColor(infoPallete, i)}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                    >
                      {numFormatter.format((settings.supply / 100) * percent)}
                    </Percent>,
                  ];
                }, [])}
              </Percents>

              <Facts>
                {settings.icoSupply && (
                  <p>
                    Maximum number of tokens to be issued in the ICO:
                    <strong>{numFormatter.format(settings.icoSupply)}</strong>
                  </p>
                )}
                <p>
                  Maximum number of tokens to be issued:
                  <strong>{numFormatter.format(settings.supply)}</strong>
                </p>
              </Facts>
            </div>
          </Row>
        </Container>
      </Section>
    );
  }
}

Allocation.propTypes = {
  settings: PropTypes.object.isRequired,
};

export default Allocation;
