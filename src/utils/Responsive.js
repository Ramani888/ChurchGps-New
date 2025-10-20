// responsive.js
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/**
 * Base guideline width & height (Figma/Sketch design size)
 * You can change this to whatever your designer used.
 */
const guidelineBaseWidth = 375; // iPhone X width
const guidelineBaseHeight = 812; // iPhone X height

// scale horizontally
export const scale = size => (wp('100%') / guidelineBaseWidth) * size;

// scale vertically
export const verticalScale = size => (hp('100%') / guidelineBaseHeight) * size;

// scale moderately (not too big/small on very large/small screens)
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
