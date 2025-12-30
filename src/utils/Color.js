const buildRgba = hex => {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);

  const out = {};
  for (let i = 1; i <= 10; i++) {
    const a = (i / 10).toFixed(1); // 0.1 .. 1.0
    out[i] = `rgba(${r},${g},${b},${a})`;
  }
  return out;
};

const baseColors = {
  theme1: '#C4F72B',
  theme2: '#1A1E24',
  Black: '#000000',
  White: '#FFFFFF',
  OffWhite: '#F5F5F5',
  Gray: '#9F9F9F',
  Gray1: '#BABABA',
  Red: '#FF0000',
  Pink: '#FF7D7D',
  Green: '#008000',
  transparent: 'transparent',
  fieldColor: '#9F9F9F1A',
  linkColor: '#0429FF',

  // gradients
  gradientColor1: ['#343434', '#454545', '#89D332'],
  gradientColor2: ['#343434', '#89D332'],
  gradientColor3: ['#343434', '#343434', '#333333', '#333333', '#89D332', '#89D332'],

  gradientBackground2: ['transparent', 'transparent'],
  gradientBackground3: ['#BFFFA0', '#89FFB9'],
  gradientBackground4: ['#B5EF87', '#E8E577'],
  gradientBackground5: ['#DCDFC0', '#E6F280'],
  gradientBackground6: ['#5D657C', '#708FEA'],
  gradientBackground7: ['#8185C5', '#7595EF'],
  gradientBackground8: ['#A486F3', '#CA76F5'],
  gradientBackground9: ['#989898', '#767676'],
};

const Color = {
  ...baseColors,
  rgba: {
    theme1: buildRgba(baseColors.theme1),
    Black: buildRgba(baseColors.Black),
    White: buildRgba(baseColors.White),
    Gray: buildRgba(baseColors.Gray),
    Pink: buildRgba(baseColors.Pink),
    Green: buildRgba(baseColors.Green),
  },
};

export default Color;

// '#A7DE65'
