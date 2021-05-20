export function pieTop(d, rx, ry, ir) {
  if (d.endAngle - d.startAngle === 0) {
    return 'M 0 0';
  }

  const sx = rx * Math.cos(d.startAngle);
  const sy = ry * Math.sin(d.startAngle);
  const ex = rx * Math.cos(d.endAngle);
  const ey = ry * Math.sin(d.endAngle);
  const rot = d.endAngle - d.startAngle > Math.PI ? 1 : 0;

  return [
    `M${sx},${sy} A${rx},${ry},0,${rot},1,${ex},${ey} L${ir * ex},${ir * ey}`,
    `A${ir * rx},${ir * ry},0,${rot},0,${ir * sx},${ir * sy} z`,
  ].join(' ');
}

export function pieOuter(d, rx, ry, h) {
  const { startAngle, endAngle } = d;

  const sx = rx * Math.cos(startAngle);
  const sy = ry * Math.sin(startAngle);
  const ex = rx * Math.cos(endAngle);
  const ey = ry * Math.sin(endAngle);
  const rot = endAngle - startAngle > Math.PI ? 1 : 0;

  return `M${sx},${h + sy} A${rx},${ry},0,${rot},1,${ex},${h +
    ey} L${ex},${ey} A${rx},${ry},0,${rot},0,${sx},${sy} z`;
}

export function pieInner(d, rx, ry, h, ir) {
  const { startAngle, endAngle } = d;

  const sx = ir * rx * Math.cos(startAngle);
  const sy = ir * ry * Math.sin(startAngle);
  const ex = ir * rx * Math.cos(endAngle);
  const ey = ir * ry * Math.sin(endAngle);
  const rot = endAngle - startAngle > Math.PI ? 1 : 0;

  return `M${sx},${sy} A${ir * rx},${ir *
    ry},0,${rot},1,${ex},${ey} L${ex},${h + ey} A${ir * rx},${ir *
    ry},0,${rot},0,${sx},${h + sy} z`;
}

function sum(a, b) {
  return a + b;
}

export function prepareData(data) {
  return data.map((piece, i, source) => {
    const prependPercent = source
      .slice(0, i)
      .map(p => p.percent)
      .reduce(sum, 0);
    return Object.assign(
      {
        startAngle:
          prependPercent / 100 * Math.PI * 2 - Math.PI * 0.01 - Math.PI / 2,
        endAngle:
          (piece.percent + prependPercent) / 100 * Math.PI * 2 - Math.PI / 2,
      },
      piece
    );
  });
}
