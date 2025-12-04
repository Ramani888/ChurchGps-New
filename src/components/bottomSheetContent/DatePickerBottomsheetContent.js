import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { DatePicker } from 'react-native-wheel-pick';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { formatDate } from '../../screens/auth/signup/UseSignup';
import GradientText from '../GradientText';
import { Fonts } from '../../utils/Font';
import { strings } from '../../language/strings';
import Color from '../../utils/Color';

const DatePickerBottomsheetContent = ({ setDob, setEighteenPlus }) => {
  const initialDate = useMemo(() => new Date(), []);

  const is18Plus = d => {
    const today = new Date();
    const cutoff = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return d <= cutoff;
  };

  const handleDateChange = val => {
    let d = null;

    if (val instanceof Date) {
      d = val;
    } else if (typeof val === 'string') {
      const [y, m, day] = val.split('-').map(Number);
      if (y && m && day) d = new Date(y, m - 1, day);
    } else if (val && typeof val === 'object') {
      const { year, month, day } = val;
      if (year && month && day) d = new Date(year, month - 1, day);
    }

    if (d) {
      const { humanReadable, isoLike } = formatDate(d);
      setEighteenPlus(is18Plus(d));
      setDob({
        showDate: humanReadable,
        sendFormateDate: isoLike,
      });
    }
  };

  return (
    <View>
      <GradientText text={strings.dateOfBirth} colors={Color.gradientColor1} style={styles.title} />
      <View style={styles.devider} />
      <View style={styles.datePickerView}>
        <DatePicker
          date={initialDate}
          style={styles.datePicker}
          onDateChange={handleDateChange}
          minimumDate={new Date(1900, 0, 1)}
          maximumDate={new Date(2100, 0, 1)}
          textSize={moderateScale(21)} // font size of month name + numbers
          itemStyle={{
            fontSize: moderateScale(22),
            fontFamily: Fonts.spaceGroteskBold,
            color: Color.theme1,
            width: scale(150), // width for each column (month/day/year)
            textAlign: 'center',
          }}
        />
      </View>
    </View>
  );
};

export default DatePickerBottomsheetContent;

const styles = StyleSheet.create({
  title: {
    fontSize: moderateScale(28),
    fontFamily: Fonts.spaceGroteskBold,
    alignSelf: 'center',
    paddingTop: verticalScale(10),
  },
  devider: {
    borderBottomWidth: scale(1),
    width: scale(331),
    borderColor: Color.rgba.Gray[2],
    alignSelf: 'center',
    marginVertical: verticalScale(15),
  },
  datePickerView: { margin: scale(25) },
  datePicker: {
    backgroundColor: 'white',
    width: '100%',
    height: verticalScale(240),
  },
});
