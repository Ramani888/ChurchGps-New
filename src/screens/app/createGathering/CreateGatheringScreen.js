import { FlatList, Image, Text, View } from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './CreateGatheringScreenStyle';
import CustomHeader from '../../../custome/CustomHeader';
import { strings } from '../../../language/strings';
import { Shadow } from 'react-native-shadow-2';
import CheckBox from '../../../custome/CustomCheckbox';
import Color from '../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import CustomInputField from '../../../custome/CustomInputField';
import { Formik } from 'formik';
import CustomButton from '../../../custome/CustomButton';
import { CreateGatheringSchema } from './useCreateGathering';
import { Fonts } from '../../../utils/Font';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { GestureScrollView } from 'react-native-gesture-handler';
import { Images } from '../../../utils/Images';
import CustomDropdown from '../../../custome/CustomDropdown';
import { keyboardDismiss } from '../../../utils/ReusableFunctions';

const DropdownItem = memo(({ label, value, selected, onSelect }) => {
  const onPress = useCallback(() => {
    onSelect(value);
    dropdownRef.current?.close();
  }, [onSelect, value]);
  return (
    <View style={styles.dropdownItemStyle}>
      <CheckBox
        onPress={onPress}
        isChecked={value === selected}
        checkboxColor={Color.theme1}
      />
      <Text style={styles.checkboxTitleStyle} onPress={onPress}>
        {label}
      </Text>
    </View>
  );
});

const CreateGatheringScreen = () => {
  const [gatheringOption, setGatheringOption] = useState([]);
  const [locationOption, setLocationOption] = useState([]);
  const [denomination, setDenomination] = useState('');
  const [protestantDenominations, setProtestantDenominations] = useState('');
  const [otherDenomination, setOtherDenomination] = useState('');

  const precizetext = strings.precizeLocationText.replace(
    '{title}',
    strings.precizeLocationTitle,
  );
  const approximatetext = strings.approximateLocationText.replace(
    '{title}',
    strings.approximateLocationTitle,
  );

  const [precizetitle, precizevalue] = precizetext.split(' - ');
  const [approximatetitle, approximatevalue] = approximatetext.split(' - ');

  const gatheringData = useMemo(
    () => [
      { key: 'Music', value: strings.music },
      { key: 'Bible Study', value: strings.bibleStudy },
      { key: 'Public Help', value: strings.publicHelp },
      { key: 'Full Service', value: strings.fullService },
      { key: 'Casual', value: strings.casual },
      { key: 'Evangelize', value: strings.evangelize },
    ],
    [strings],
  );

  const LocationData = useMemo(
    () => [
      { key: 'Outdors', value: strings.outdors },
      { key: 'Home', value: strings.home },
      { key: 'Church Building', value: strings.churchBuilding },
      { key: 'Other', value: strings.other },
    ],
    [strings],
  );

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

  const handleFormSubmit = values => {
    console.log('Formik values:', values);
    console.log('Selected gatheringOption:', gatheringOption);
    console.log('Selected locationOption:', locationOption);
  };

  const toggleGatheringOption = (item, isGathering) => {
    if (isGathering) {
      setGatheringOption(prev => {
        if (prev.includes(item)) {
          return prev.filter(i => i !== item);
        } else {
          return [...prev, item];
        }
      });
    } else {
      setLocationOption(prev => {
        if (prev.includes(item)) {
          return prev.filter(i => i !== item);
        } else {
          return [...prev, item];
        }
      });
    }
  };

  const renderDenominationItem = useCallback(
    item => (
      <DropdownItem
        label={item.label}
        value={item.value}
        selected={denomination}
        onSelect={setDenomination}
      />
    ),
    [denomination],
  );

  const renderProtestantItem = useCallback(
    item => (
      <DropdownItem
        label={item.label}
        value={item.value}
        selected={protestantDenominations}
        onSelect={setProtestantDenominations}
      />
    ),
    [protestantDenominations],
  );

  const renderOtherDenominationItem = useCallback(
    item => (
      <DropdownItem
        label={item.label}
        value={item.value}
        selected={otherDenomination}
        onSelect={setOtherDenomination}
      />
    ),
    [otherDenomination],
  );

  const renderoption = useCallback(
    (item, option) => {
      const isGathering = option === 'GatheringOption';
      // const isLocation = option === 'LocationOption';
      const isSelected = isGathering
        ? gatheringOption.includes(item?.key)
        : locationOption.includes(item?.key);

      return (
        <View
          style={[
            styles.checkboxView,
            { width: isGathering ? '33.33%' : '50%' },
          ]}
        >
          <CheckBox
            onPress={() => toggleGatheringOption(item?.key, isGathering)}
            isChecked={isSelected}
            checkboxColor={Color.theme1}
            checkboxSize={scale(24)}
            size={scale(18.5)}
          />
          <Text style={styles.checkboxTitleStyle}>{item?.value}</Text>
        </View>
      );
    },
    [gatheringOption, locationOption],
  );

  const gatheringSchema = useMemo(() => CreateGatheringSchema(), []);

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader backArrowVisible gradientTitle={strings.createGathering} />

      <View style={styles.childContainer}>
        <Formik
          initialValues={{
            description: '',
            groupName: '',
            denomination: '',
            protestantDenomination: '',
            otherDenomination: '',
          }}
          validationSchema={gatheringSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <>
              <Shadow
                distance={40}
                offset={[0, 0]}
                startColor="rgba(0,0,0,0.12)"
                finalColor="rgba(0,0,0,0)"
                radius={16}
                style={styles.shadowView}
              >
                <KeyboardAwareScrollView
                  ScrollViewComponent={GestureScrollView}
                  keyboardShouldPersistTaps="handled"
                  extraKeyboardSpace={0}
                >
                  <View>
                    <Text style={styles.headingStyle}>{strings.gathering}</Text>
                    <View style={styles.optionViewStyle}>
                      <FlatList
                        data={gatheringData}
                        renderItem={({ item }) =>
                          renderoption(item, 'GatheringOption')
                        }
                        numColumns={3}
                        key={'_'}
                        scrollEnabled={false}
                      />
                    </View>
                  </View>
                  <Text style={styles.informText}>
                    {strings.gatheringInfoText1}
                  </Text>
                  <View>
                    <Text style={styles.headingStyle}>{strings.location}</Text>
                    <View style={styles.optionViewStyle}>
                      <FlatList
                        data={LocationData}
                        renderItem={({ item }) =>
                          renderoption(item, 'LocationOption')
                        }
                        numColumns={2}
                        key={'_'}
                        scrollEnabled={false}
                      />
                    </View>
                  </View>
                  <Text style={styles.informText}>
                    {strings.gatheringInfoText2}
                  </Text>

                  <View>
                    <View style={styles.inputFieldView}>
                      <CustomInputField
                        label={strings.description}
                        labelStyle={styles.headingStyle}
                        placeholder={strings.descriptionPlaceholder}
                        onChangeText={handleChange('description')}
                        onBlur={handleBlur('description')}
                        value={values.description}
                        touched={touched.description}
                        errors={errors.description}
                        multiline
                        numberOfLines={4}
                        inputStyle={[styles.inputStyle]}
                      />
                      <CustomInputField
                        label={strings.groupName}
                        labelStyle={styles.headingStyle}
                        placeholder={strings.groupNamePlaceholder}
                        onChangeText={handleChange('groupName')}
                        onBlur={handleBlur('groupName')}
                        value={values.groupName}
                        errors={errors.groupName}
                        touched={touched.groupName}
                        inputStyle={styles.inputStyle}
                      />

                      <Text style={styles.headingStyle}>
                        {strings.groupPicture}
                      </Text>

                      <View style={styles.groupPictureContainerStyle}>
                        <View style={styles.groupPictureViewStyle}>
                          <Image
                            source={Images.groupPictureImageIcon}
                            style={styles.groupPictureStyle}
                          />
                          <Text style={styles.myPictureText}>
                            {strings.myPicture}
                          </Text>
                        </View>

                        <View style={styles.groupPictureViewStyle}>
                          <Image
                            source={Images.uploadImageIcon}
                            style={styles.groupPictureStyle}
                          />
                          <Text style={styles.myPictureText}>
                            {strings.upload}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.dropdownView}>
                        <CustomDropdown
                          dropdownPlaceholder={strings.denomination}
                          data={denominationData}
                          renderItem={renderDenominationItem}
                          setValue={v => {
                            keyboardDismiss();
                            setFieldValue('denomination', v);
                          }}
                          value={values.denomination}
                          touched={touched.denomination}
                          errors={errors.denomination}
                          dropdownStyle={styles.dropdownStyle}
                        />

                        <CustomDropdown
                          dropdownPlaceholder={
                            strings.protestonDenominationData
                          }
                          data={protestonDenominationData}
                          renderItem={renderProtestantItem}
                          setValue={v => {
                            keyboardDismiss();
                            setFieldValue('protestantDenomination', v);
                          }}
                          value={values.protestantDenomination}
                          touched={touched.protestantDenomination}
                          errors={errors.protestantDenomination}
                          dropdownStyle={styles.dropdownStyle}
                        />

                        <CustomDropdown
                          dropdownPlaceholder={strings.otherDenomination}
                          data={otherDenominationData}
                          renderItem={renderOtherDenominationItem}
                          setValue={v => {
                            keyboardDismiss();
                            setFieldValue('otherDenomination', v);
                          }}
                          value={values.otherDenomination}
                          touched={touched.otherDenomination}
                          errors={errors.otherDenomination}
                          dropdownStyle={styles.dropdownStyle}
                        />
                      </View>

                      <Text style={styles.headingStyle}>
                        {strings.locationType}
                      </Text>
                      <Text style={styles.precizeText}>
                        <Text style={styles.title}>{precizetitle}</Text>
                        <Text> - </Text>
                        <Text style={styles.value}>{precizevalue}</Text>
                      </Text>

                      <Text style={styles.precizeText}>
                        <Text style={styles.title}>{approximatetitle}</Text>
                        <Text> - </Text>
                        <Text style={styles.value}>{approximatevalue}</Text>
                      </Text>

                      <View>
                        <View style={styles.locationView}>
                          <Image
                            source={Images.precizeLocationImage}
                            style={styles.locationImage}
                          />
                          <CustomButton
                            title={strings.precize}
                            buttonWidth={scale(153.5)}
                            buttonHeight={verticalScale(34)}
                            backgroundColor={Color.rgba.Gray[1]}
                            borderRadius={scale(16)}
                            fontSize={moderateScale(16)}
                            fontColor={Color.Black}
                            fontFamily={Fonts.sfProBold}
                            marginTop={verticalScale(15)}
                            marginBottom={verticalScale(20)}
                            onPress={handleSubmit}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </KeyboardAwareScrollView>
              </Shadow>

              <CustomButton
                title={strings.create}
                buttonWidth={scale(343)}
                backgroundColor={Color.theme1}
                borderRadius={scale(30)}
                fontSize={moderateScale(16)}
                fontColor={Color.Black}
                fontFamily={Fonts.sfProBold}
                marginTop={verticalScale(15)}
                marginBottom={verticalScale(20)}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
};

export default memo(CreateGatheringScreen);
