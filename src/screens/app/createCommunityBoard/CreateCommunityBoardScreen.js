import { View, Text } from 'react-native';
import React, { memo, useCallback, useMemo, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './CreateCommunityBoardStyle';
import CustomHeader from '../../../custome/CustomHeader';
import { strings } from '../../../language/strings';
import { Images } from '../../../utils/Images';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import CustomInputField from '../../../custome/CustomInputField';
import CustomButton from '../../../custome/CustomButton';
import Color from '../../../utils/Color';
import { Fonts } from '../../../utils/Font';
import Entypo from '@react-native-vector-icons/entypo';
import CustomDropdown from '../../../custome/CustomDropdown';
import CheckBox from '../../../custome/CustomCheckbox';
import CustomBottomsheet from '../../../custome/CustomBottomsheet';
import AddGroupBottomsheetContent from '../../../components/bottomSheetContent/AddGroupBottomsheetContent';

const DropdownItem = memo(({ label, value, selected, onSelect }) => {
  return (
    <View style={styles.dropdownItemStyle}>
      <CheckBox isChecked={value === selected} checkboxColor={Color.theme1} pressable={false} />
      <Text style={styles.checkboxTitleStyle}>{label}</Text>
    </View>
  );
});

const CreateCommunityBoardScreen = () => {
  const sheetRef = useRef();

  const [description, setDescription] = useState('');
  const [denomination, setDenomination] = useState('');
  const [protestantDenominations, setProtestantDenominations] = useState('');
  const [otherDenomination, setOtherDenomination] = useState('');

  const denominationData = useMemo(
    () => [
      { label: strings.noPreference, value: 'No Preference' },
      { label: strings.catholic, value: 'Catholic' },
      { label: strings.protestant, value: 'Protestant' },
      { label: strings.orthodox, value: 'Orthodox' },
      { label: strings.otherCristian, value: 'Other Christian' },
    ],
    [strings],
  );

  const protestonDenominationData = useMemo(
    () => [
      { label: strings.noPreference, value: 'No Preference' },
      { label: strings.baptist, value: 'Baptist' },
      {
        label: strings.pentecostalCharismatic,
        value: 'Pentecostal/Charismatic',
      },
      { label: strings.lutheran, value: 'Lutheran' },
      { label: strings.methodistWesleyan, value: 'Methodist/Wesleyan' },
      { label: strings.anglicanEpiscopal, value: 'Anglican/Episcopal' },
      { label: strings.presbyterianReformed, value: 'Presbyterian/Reformed' },
      { label: strings.adventist, value: 'Adventist' },
      { label: strings.nonDenominetionals, value: 'Non-Denominetional' },
      { label: strings.otherProtestant, value: 'Other Protestant' },
      { label: strings.otherCristian, value: 'Other Cristian' },
    ],
    [strings],
  );

  const otherDenominationData = useMemo(
    () => [
      { label: strings.jevovahWitness, value: 'Jehovah Witness' },
      { label: strings.mormon, value: 'Mormon' },
      { label: strings.messianicJew, value: 'messianic Jew' },
      { label: strings.other, value: 'Other' },
    ],
    [strings],
  );

  const renderDenominationItem = useCallback(
    item => <DropdownItem label={item.label} value={item.value} selected={denomination} />,
    [denomination],
  );

  const renderProtestantItem = useCallback(
    item => (
      <DropdownItem label={item.label} value={item.value} selected={protestantDenominations} />
    ),
    [protestantDenominations],
  );

  const renderOtherDenominationItem = useCallback(
    item => <DropdownItem label={item.label} value={item.value} selected={otherDenomination} />,
    [otherDenomination],
  );

  const openBottomsheet = useCallback(() => {
    sheetRef.current.show();
  }, []);

  const closeBottomsheet = useCallback(() => {
    sheetRef.current.hide();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backArrowVisible
        firstLineTitle={strings.create}
        gradientTitle={strings.communityBoard}
        infoIcon={Images.infoIcon}
        titleViewStyle={{ marginTop: verticalScale(55) }}
        infoIconPress={() => {}}
      />

      <View style={styles.bodyContaier}>
        <CustomInputField
          label={strings.description}
          labelStyle={styles.headingStyle}
          placeholder={strings.enterDescription}
          onChangeText={setDescription}
          value={description}
          multiline
          numberOfLines={4}
          inputStyle={styles.inputStyle}
        />

        <CustomButton
          title={strings.addGroup}
          backgroundColor={Color.theme2}
          buttonHeight={verticalScale(54)}
          borderRadius={scale(30)}
          fontSize={moderateScale(16)}
          fontColor={Color.White}
          fontFamily={Fonts.sfProBold}
          rightIcon={
            <Entypo name="plus" size={scale(19)} color={Color.Black} style={styles.plusIcon} />
          }
          onPress={openBottomsheet}
          marginVertical={verticalScale(10)}
        />

        <Text style={styles.optionalText}>({strings.optional})</Text>
        <Text style={styles.text}>{strings.communityBoardNote1}</Text>

        <View style={styles.dropdownView}>
          <CustomDropdown
            dropdownPlaceholder={strings.denomination}
            data={denominationData}
            renderItem={renderDenominationItem}
            setValue={v => {
              keyboardDismiss();
              setDenomination(v);
            }}
            value={denomination}
            dropdownStyle={styles.dropdownStyle}
          />

          <CustomDropdown
            dropdownPlaceholder={strings.protestonDenominationData}
            data={protestonDenominationData}
            renderItem={renderProtestantItem}
            setValue={v => {
              keyboardDismiss();
              setProtestantDenominations(v);
            }}
            value={protestantDenominations}
            dropdownStyle={styles.dropdownStyle}
          />

          <CustomDropdown
            dropdownPlaceholder={strings.otherDenomination}
            data={otherDenominationData}
            renderItem={renderOtherDenominationItem}
            setValue={v => {
              keyboardDismiss();
              setOtherDenomination(v);
            }}
            value={otherDenomination}
            dropdownStyle={styles.dropdownStyle}
          />
        </View>

        <Text style={[styles.text, { textAlign: 'center' }]}>{strings.communityBoardNote2}</Text>

        <CustomButton
          title={strings.create}
          backgroundColor={Color.theme1}
          borderRadius={scale(30)}
          fontSize={moderateScale(16)}
          fontColor={Color.Black}
          fontFamily={Fonts.sfProBold}
          marginTop={verticalScale(15)}
          marginBottom={verticalScale(20)}
          onPress={() => {}}
        />
      </View>

      <CustomBottomsheet
        ref={sheetRef}
        gestureEnabled={true}
        onBottomsheetClose={closeBottomsheet}
        bottomSheetContent={<AddGroupBottomsheetContent />}
      />
    </SafeAreaView>
  );
};

export default memo(CreateCommunityBoardScreen);
