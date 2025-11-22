import { FlatList, Image, ScrollView, Text, View } from 'react-native';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './FilterScreenStyles';
import { strings } from '../../../language/strings';
import CustomHeader from '../../../custome/CustomHeader';
import { Images } from '../../../utils/Images';
import { Shadow } from 'react-native-shadow-2';
import LocationPreview from '../../../components/LocationPreview';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import CheckBox from '../../../custome/CustomCheckbox';
import Color from '../../../utils/Color';
import CustomDropdown from '../../../custome/CustomDropdown';

const DropdownItem = memo(({ label, value, selected, onSelect }) => {
  const onPress = useCallback(() => onSelect(value), [onSelect, value]);
  return (
    <View style={styles.dropdownItemStyle}>
      <CheckBox
        onPress={onPress}
        title={label}
        isChecked={value === selected}
        checkboxColor={Color.theme1}
        checkboxTitleStyle={styles.checkboxTitleStyle}
      />
    </View>
  );
});

const FilterScreen = () => {
  const [gatheringOption, setGatheringOption] = useState([]);
  const [locationOption, setLocationOption] = useState([]);
  const [denomination, setDenomination] = useState('');
  const [protestantDenominations, setProtestantDenominations] = useState('');
  const [otherDenomination, setOtherDenomination] = useState('');

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

  const renderoption = useCallback(
    (item, option) => {
      const isGathering = option === 'GatheringOption';
      // const isLocation = option === 'LocationOption';
      const isSelected = isGathering
        ? gatheringOption.includes(item?.key)
        : locationOption.includes(item?.key);

      return (
        <View style={[styles.checkboxView, { width: isGathering ? '33.33%' : '25%' }]}>
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

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backArrowVisible
        gradientTitle={strings.filter}
        searchIcon={Images.searchIcon1}
        searchIconPress={() => {}}
      />

      <Shadow
        offset={[0, 0]}
        distance={40}
        startColor="rgba(0,0,0,0.12)"
        finalColor="rgba(0,0,0,0)"
        radius={16}
        style={styles.shadowView}
      >
        <View style={styles.locationView}>
          <LocationPreview latitude={22.263} longitude={70.7863} />
        </View>
        <Text style={[styles.heading, { fontSize: moderateScale(16) }]}>{strings.location}</Text>
      </Shadow>

      <Shadow
        distance={40}
        offset={[0, 10]}
        startColor="rgba(0,0,0,0.05)"
        finalColor="rgba(0,0,0,0.07)"
        radius={16}
        style={styles.shadowView}
      >
        <Text style={styles.heading}>{strings.gathering}</Text>
        <View style={styles.optionViewStyle}>
          <FlatList
            data={gatheringData}
            renderItem={({ item }) => renderoption(item, 'GatheringOption')}
            numColumns={3}
            key={'_'}
            scrollEnabled={false}
          />
        </View>
      </Shadow>

      <Shadow
        distance={40}
        offset={[0, 10]}
        startColor="rgba(0,0,0,0.05)"
        finalColor="rgba(0,0,0,0.07)"
        radius={16}
        style={styles.shadowView}
      >
        <Text style={styles.heading}>{strings.location}</Text>

        <View style={[styles.optionViewStyle, { height: verticalScale(84) }]}>
          <FlatList
            data={LocationData}
            renderItem={({ item }) => renderoption(item, 'LocationOption')}
            numColumns={4}
            key={'_'}
            scrollEnabled={false}
          />
        </View>
      </Shadow>

      <View style={styles.dropdownView}>
        <Text style={styles.heading}>({strings.optional})</Text>

        <CustomDropdown
          dropdownPlaceholder={strings.denomination}
          data={denominationData}
          renderItem={renderDenominationItem}
          setValue={setDenomination}
          value={denomination}
          dropdownStyle={styles.dropdownStyle}
        />

        <CustomDropdown
          dropdownPlaceholder={strings.protestonDenominationData}
          data={protestonDenominationData}
          renderItem={renderProtestantItem}
          setValue={setProtestantDenominations}
          value={protestantDenominations}
          dropdownStyle={styles.dropdownStyle}
        />

        <CustomDropdown
          dropdownPlaceholder={strings.otherDenomination}
          data={otherDenominationData}
          renderItem={renderOtherDenominationItem}
          setValue={setOtherDenomination}
          value={otherDenomination}
          dropdownStyle={styles.dropdownStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default memo(FilterScreen);
