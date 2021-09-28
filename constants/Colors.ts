const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

// Base Colors

export const white: string = '#fff';

export const black100: string = '#000000';
export const black80: string = '#2D2D2D';

export const gray100: string = '#707070';
export const gray80: string = '#F3F3F3';

// Primary Colors

export const purple100: string = '#5D5FEF';
export const purple80: string = '#7879F1';
export const purple60: string = '#A5A6F6';

export const peach100: string = '#FF5C58';
export const peach80: string = '#FF6B6B';
export const peach60: string = '#FE8F8F';

// Secondary Colors

export const emerald100: string = '#138900';
export const emerald80: string = '#41B82D';
export const emerald60: string = '#74D264';

export const crimson100: string = '#F10C0C';
export const crimson80: string = '#FF5050';
export const crimson60: string = '#FF7A7A';

export const coffee100: string = '#6D5454';

export default {
  light: {
    text: black100,
    background: white,
    tint: tintColorLight,
    tabIconDefault: white,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: white,
    background: black100,
    tint: tintColorDark,
    tabIconDefault: white,
    tabIconSelected: tintColorDark,
  },
};
