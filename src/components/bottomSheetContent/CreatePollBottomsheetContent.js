// import { StyleSheet, Text, View } from 'react-native';
// import React, { memo, useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import GradientText from '../GradientText';
// import { strings } from '../../language/strings';
// import Color from '../../utils/Color';
// import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
// import { Fonts } from '../../utils/Font';
// import CustomInputField from '../../custome/CustomInputField';

// const CreatePollBottomsheetContent = () => {
//   const [question, setQuestion] = useState('');

//   return (
//     <SafeAreaView style={styles.container}>
//       <GradientText text={strings.createPoll} colors={Color.gradientColor1} style={styles.title} />

//       <View>
//         <CustomInputField
//           label={strings.question}
//           labelStyle={styles.heading}
//           placeholder={strings.enterQuestion}
//           onChangeText={setQuestion}
//           value={question}
//           multiline
//           numberOfLines={3}
//           textAreaHeight={verticalScale(84)}
//           inputStyle={styles.inputStyle}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default memo(CreatePollBottomsheetContent);

// const styles = StyleSheet.create({
//   container: { backgroundColor: Color.White, paddingHorizontal: scale(22) },
//   title: {
//     fontSize: moderateScale(24),
//     fontFamily: Fonts.spaceGroteskBold,
//     textAlign: 'center',
//     marginTop: verticalScale(10),
//   },
//   heading: {
//     fontSize: scale(16),
//     fontFamily: Fonts.interSemiBold,
//     color: Color.Black,
//   },
//   inputStyle: {
//     backgroundColor: Color.fieldColor,
//     marginTop: verticalScale(6),
//     borderRadius: scale(16),
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  Platform,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import GradientText from '../GradientText';
import { strings } from '../../language/strings';
import Color from '../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';
import CustomInputField from '../../custome/CustomInputField';
import Entypo from '@react-native-vector-icons/entypo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { GestureScrollView } from 'react-native-gesture-handler';
import CustomButton from '../../custome/CustomButton';

const MAX_OPTIONS = 10;
const MIN_OPTIONS = 2;

const OptionRow = memo(function OptionRow({ value, index, onChange, onRemove }) {
  const onChangeText = useCallback(t => onChange(index, t), [index, onChange]);

  const onPressRemove = useCallback(() => onRemove(index), [index, onRemove]);

  return (
    <View style={styles.optionRow}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={`${strings?.option ?? 'Option'} ${index + 1}`}
        placeholderTextColor={Color?.placeholderColor ?? '#9A9A9A'}
        style={styles.optionInput}
        autoCapitalize="sentences"
      />

      <Pressable
        onPress={onPressRemove}
        style={({ pressed }) => [styles.minusBtn, pressed && { opacity: 0.75 }]}
        android_ripple={{ color: '#00000020', borderless: true }}
        hitSlop={10}
      >
        <Entypo name="minus" size={15} color={Color.White} />
      </Pressable>
    </View>
  );
});

const CreatePollBottomsheetContent = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '']);
  const [selectedDuration, setSelectedDuration] = useState('1 Days');

  const canAddMore = options.length < MAX_OPTIONS;
  const canRemove = options.length > MIN_OPTIONS;

  const pollDuratonData = ['1 Days', '3 Days', '7 Days'];

  const addOption = useCallback(() => {
    setOptions(prev => (prev.length >= MAX_OPTIONS ? prev : [...prev, '']));
  }, []);

  const removeOption = useCallback(index => {
    setOptions(prev => {
      if (prev.length <= MIN_OPTIONS) return prev; // keep at least 2
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const updateOption = useCallback((index, value) => {
    setOptions(prev => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const renderPollDuration = useCallback(
    ({ item }) => {
      const selected = selectedDuration === item;

      return (
        <TouchableOpacity
          style={[
            styles.durationChip,
            { borderColor: selected ? Color.theme1 : Color.rgba.Gray[2] },
          ]}
          onPress={() => setSelectedDuration(item)}
        >
          <Text style={styles.durationText}>{item}</Text>
        </TouchableOpacity>
      );
    },
    [selectedDuration],
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.indicator} />
      <GradientText
        text={strings?.createPoll ?? 'Create Poll'}
        colors={Color.gradientColor1}
        style={styles.title}
      />

      <KeyboardAwareScrollView
        ScrollViewComponent={GestureScrollView}
        keyboardShouldPersistTaps="handled"
        // bottomOffset={verticalScale(70)}
        extraKeyboardSpace={0}
      >
        <CustomInputField
          label={strings?.question ?? 'Question'}
          labelStyle={styles.heading}
          placeholder={strings?.enterQuestion ?? 'Enter question'}
          onChangeText={setQuestion}
          value={question}
          multiline
          numberOfLines={3}
          textAreaHeight={verticalScale(84)}
          inputStyle={styles.inputStyle}
        />

        <View style={styles.section}>
          <Text style={styles.heading}>{strings.options}</Text>

          <View style={styles.optionsList}>
            {options.map((opt, idx) => (
              <OptionRow
                key={`opt-${idx}`}
                value={opt}
                index={idx}
                onChange={updateOption}
                onRemove={canRemove ? removeOption : () => {}}
              />
            ))}
          </View>

          <Pressable
            onPress={addOption}
            disabled={!canAddMore}
            style={({ pressed }) => [
              styles.addBtn,
              !canAddMore && { opacity: 0.5 },
              pressed && { transform: [{ scale: 0.98 }] },
            ]}
          >
            <View style={styles.plusBox}>
              <Entypo name="plus" size={20} color={Color.Black} />
            </View>
          </Pressable>

          <Text style={styles.maxText}>{`(${strings?.max10})`}</Text>
        </View>

        <View>
          <Text style={[styles.heading, { textAlign: 'center' }]}>{strings.pollEnds}</Text>
          <FlatList
            data={pollDuratonData}
            renderItem={renderPollDuration}
            numColumns={3}
            key={'_'}
            columnWrapperStyle={styles.columnWrapperStyle}
          />
        </View>

        <CustomButton
          title={strings.create}
          buttonWidth={scale(331)}
          buttonHeight={verticalScale(53)}
          backgroundColor={Color.theme1}
          borderRadius={scale(30)}
          fontSize={moderateScale(16)}
          fontColor={Color.Black}
          fontFamily={Fonts.sfProBold}
          marginTop={verticalScale(25)}
          marginBottom={verticalScale(45)}
          onPress={() => {}}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default memo(CreatePollBottomsheetContent);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.White,
    paddingHorizontal: scale(22),
  },
  indicator: {
    width: scale(66),
    height: verticalScale(4),
    borderRadius: scale(2),
    backgroundColor: Color.Gray,
    alignSelf: 'center',
    marginTop: verticalScale(15),
    marginBottom: verticalScale(10),
  },
  title: {
    fontSize: moderateScale(24),
    fontFamily: Fonts.spaceGroteskBold,
    textAlign: 'center',
    marginTop: verticalScale(10),
  },
  heading: {
    fontSize: scale(16),
    fontFamily: Fonts.interSemiBold,
    color: Color.Black,
    paddingTop: verticalScale(15),
  },
  inputStyle: {
    backgroundColor: Color.fieldColor,
    marginTop: verticalScale(6),
    borderRadius: scale(16),
  },
  optionsList: {
    marginTop: verticalScale(10),
    gap: verticalScale(12),
  },
  optionRow: {
    height: verticalScale(48),
    borderRadius: scale(16),
    backgroundColor: Color.rgba.Gray[1],
    paddingLeft: scale(16),
    paddingRight: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionInput: {
    flex: 1,
    height: '100%',
    fontSize: scale(14),
    fontFamily: Fonts.interRegular,
    color: Color.Black,
    paddingVertical: 0,
  },
  minusBtn: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(5),
    backgroundColor: Color.Gray,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: scale(10),
  },
  addBtn: {
    marginTop: verticalScale(18),
    height: verticalScale(56),
    width: scale(184),
    borderRadius: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.Black,
    alignSelf: 'center',
  },
  plusBox: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(5),
    backgroundColor: Color.White,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maxText: {
    marginTop: verticalScale(10),
    textAlign: 'center',
    color: Color.Black,
    fontFamily: Fonts.interMedium,
    fontSize: scale(12),
    paddingBottom: verticalScale(10),
  },
  columnWrapperStyle: { gap: scale(4), marginTop: verticalScale(17) },
  durationChip: {
    width: scale(107.67),
    height: verticalScale(34),
    borderWidth: scale(1),
    borderRadius: scale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  durationText: { fontSize: moderateScale(12), fontFamily: Fonts.interMedium, color: Color.Black },
});
