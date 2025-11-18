import {
  findNodeHandle,
  FlatList,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import React, {
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import CustomHeader from '../../../custome/CustomHeader';
import { strings } from '../../../language/strings';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { Fonts } from '../../../utils/Font';
import { styles } from './MyAccountStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInputField from '../../../custome/CustomInputField';
import CustomDropdown from '../../../custome/CustomDropdown';
import CheckBox from '../../../custome/CustomCheckbox';
import Color from '../../../utils/Color';
import CustomButton from '../../../custome/CustomButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { GestureScrollView } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Images } from '../../../utils/Images';
import { useStateContext } from '../../../context/StateContext';
import {
  handleCamera,
  handleGallery,
} from '../../../custome/CustomImagePicker';
import { Formik } from 'formik';
import {
  AccountSchema,
  getProfileData,
  saveAccount,
  uploadProfileImage,
} from './useMyAccount';
import Loader from '../../../utils/Loader';
import ToastMessage from '../../../utils/ToastMessage';
import { useUserDetail } from '../../../context/UserContext';
import { screenName } from '../../../utils/NavigationKey';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { keyboardDismiss } from '../../../utils/ReusableFunctions';
import { BlurView } from '@react-native-community/blur';

const SectionBlock = ({
  disabled,
  children,
  blurAmount = 12,
  blurType = 'light',
  radius = 12,
}) => {
  return (
    <View
      style={{ position: 'relative', borderRadius: radius, overflow: 'hidden' }}
    >
      <View
        pointerEvents={disabled ? 'none' : 'auto'}
        style={{ opacity: disabled ? 1 : 1 }}
      >
        {children}
      </View>
      {disabled && (
        <BlurView
          style={StyleSheet.absoluteFill}
          blurType={blurType}
          blurAmount={blurAmount}
          reducedTransparencyFallbackColor="rgba(200,200,200,0.45)"
        />
      )}
    </View>
  );
};

const ActionButton = memo(({ icon, label }) => {
  return (
    <View style={styles.btnView}>
      <Image source={icon} style={styles.plusIconImage} resizeMode="contain" />
      <Text style={styles.btnTextStyle}>{label}</Text>
    </View>
  );
});

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

const MyAccountScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const scrollRef = useRef(null);
  const questionnaireRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [denomination, setDenomination] = useState('');
  const [protestantDenominations, setProtestantDenominations] = useState('');
  const [otherDenomination, setOtherDenomination] = useState('');
  const [answers, setAnswers] = useState([]);
  const [profileImage, setProfileImage] = useState({});
  const [profileData, setProfileData] = useState({});

  const [skipImageSection, setSkipImageSection] = useState(false);
  const [skipBelowSection, setSkipBelowSection] = useState(false);

  const { visibleEditAccount, setVisibleEditAccount } = useStateContext();
  const { user, onUpdateProfile } = useUserDetail();

  const editQuestion = route.params?.editQuestion || false;

  useLayoutEffect(() => {
    if (global.token) {
      getProfileDataApi();
    }
    return () => {
      if (visibleEditAccount) {
        setVisibleEditAccount(false);
      }
    };
  }, []);

  useEffect(() => {
    if (!questionsData?.length) return;

    const defaults = questionsData.map(q => ({
      questionId: Number(q.id),
      answer: 'yes',
    }));

    setAnswers(defaults);
  }, [questionsData]);

  useEffect(() => {
    if (!editQuestion) return;

    const id = setTimeout(() => {
      const target = findNodeHandle(questionnaireRef.current);
      const scrollNode = scrollRef.current?.getNode?.() ?? scrollRef.current; // unwrap if wrapped
      const relativeTo = findNodeHandle(scrollNode);

      if (target && relativeTo && scrollNode?.scrollTo) {
        UIManager.measureLayout(
          target,
          relativeTo,
          () => {},
          (x, y) => scrollNode.scrollTo({ y, animated: true }),
        );
      }
    }, 300);

    return () => clearTimeout(id);
  }, [editQuestion]);

  // ========================================== Api =========================================== //

  const uploadProfileImageApi = useCallback(async imageFile => {
    setProfileImage(imageFile);
    const body = new FormData();
    body.append('image', imageFile);

    try {
      setVisible(true);
      const response = await uploadProfileImage(body);
      if (response?.success) {
        ToastMessage(response?.message);
      }
    } catch (error) {
      console.log('error in upload profile image', error);
    } finally {
      setVisible(false);
    }
  }, []);

  const getProfileDataApi = useCallback(async () => {
    try {
      setVisible(true);
      const response = await getProfileData();
      if (response?.success) {
        setProfileData(response?.user);
        setAnswers(response?.user?.questionnaire ?? []);
        onUpdateProfile(response?.user);
      }
    } catch (error) {
      console.log('error in get profile data', error);
    } finally {
      setVisible(false);
    }
  }, []);

  const handleSaveAccount = useCallback(
    async (values, resetForm) => {
      const body = {
        _id: user?._id,
        username: user?.username ?? '',
        profileName: values?.profileName ?? '',
        bio: values?.bio ?? '',
        denomination: values?.denomination ?? '',
        protestantDenomination: values?.protestantDenomination ?? '',
        otherDenomination: values?.otherDenomination ?? '',
        questionnaire: answers ?? [],
      };

      try {
        setVisible(true);
        const response = await saveAccount(JSON.stringify(body));
        if (response?.success) {
          ToastMessage(response?.message);
          getProfileDataApi();
          if (visibleEditAccount === false) {
            await AsyncStorage.setItem(`SETUP_ACCOUNT_${user?._id}`, 'true');
            resetForm();
            navigation.reset({
              index: 0,
              routes: [{ name: screenName.login }],
            });
          }
        }
      } catch (error) {
        console.log('error in save account', error);
      } finally {
        setVisible(false);
      }
    },
    [
      answers,
      visibleEditAccount,
      visible,
      navigation,
      screenName?.tabStack,
      getProfileDataApi,
      user,
    ],
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

  const questionsData = useMemo(() => {
    return Array.from({ length: 21 }, (_, index) => {
      const id = (index + 1).toString();
      return {
        id,
        text: strings[`question${id}`], // will map question1, question2, … question21
      };
    });
  }, [strings]);

  const options = useMemo(
    () => [
      { key: 'yes', value: strings.yes },
      { key: 'no', value: strings.no },
      { key: 'skip', value: strings.skip },
    ],
    [],
  );

  const handleAnswer = (questionId, key) => {
    setAnswers(prev => {
      const existingIndex = prev.findIndex(
        a => a.questionId === Number(questionId),
      );

      if (existingIndex !== -1) {
        // update existing answer
        const updated = [...prev];
        updated[existingIndex] = {
          questionId: Number(questionId),
          answer: key,
        };
        return updated;
      } else {
        // add new answer (shouldn’t normally happen)
        return [...prev, { questionId: Number(questionId), answer: key }];
      }
    });
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

  const renderQuestion = ({ item }) => {
    return (
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {item.id}. {item.text}
        </Text>
        <View style={styles.optionsRow}>
          {options?.map(({ key, value }) => {
            const isSelected = answers.some(
              a => a?.questionId === Number(item.id) && a.answer === key,
            );

            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.optionButton,
                  isSelected && styles.optionButtonSelected,
                ]}
                onPress={() => handleAnswer(item.id, key)}
              >
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                >
                  {value} {/* translated label */}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  const schema = useMemo(() => AccountSchema(), []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Loader visible={visible} />
      <CustomHeader
        backArrowVisible
        gradientTitle={
          visibleEditAccount ? strings.editAccount : strings.myAccount
        }
        titleFontSize={scale(30)}
        titleFontFamily={Fonts.spaceGroteskBold}
      />

      <KeyboardAwareScrollView
        ref={scrollRef}
        ScrollViewComponent={GestureScrollView}
        keyboardShouldPersistTaps="handled"
        bottomOffset={verticalScale(70)}
        extraKeyboardSpace={0}
      >
        <Formik
          initialValues={{
            userName: user?.username ?? '',
            profileName: visibleEditAccount ? profileData?.profileName : '',
            bio: visibleEditAccount ? profileData?.bio : '',
            denomination: visibleEditAccount ? profileData?.denomination : '',
            protestantDenomination: visibleEditAccount
              ? profileData?.protestantDenomination
              : '',
            otherDenomination: visibleEditAccount
              ? profileData?.otherDenomination
              : '',
          }}
          enableReinitialize
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            handleSaveAccount(values, resetForm);
          }}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formView}>
              <View style={styles.inputFieldView}>
                <CustomInputField
                  label={strings.profileName}
                  labelStyle={styles.heading}
                  onChangeText={handleChange('profileName')}
                  onBlur={handleBlur('profileName')}
                  value={values.profileName}
                  touched={touched.profileName}
                  errors={errors.profileName}
                  inputStyle={styles.inputStyle}
                />
              </View>

              <View style={styles.inputFieldView}>
                <CustomInputField
                  label={strings.userName}
                  labelStyle={styles.heading}
                  onChangeText={handleChange('userName')}
                  onBlur={handleBlur('userName')}
                  value={values.userName}
                  touched={touched.userName}
                  errors={errors.userName}
                  inputStyle={styles.inputStyle}
                  autoCapitalize="none"
                  editable={false}
                  autoCorrect={false}
                />
              </View>

              <View style={styles.devider} />

              <CustomButton
                title={skipImageSection ? strings.undo : strings.skip}
                buttonWidth={scale(90)}
                buttonHeight={verticalScale(34)}
                backgroundColor={Color.rgba.Pink[1]}
                borderRadius={scale(16)}
                fontSize={moderateScale(16)}
                fontColor={Color.Black}
                fontFamily={Fonts.interBold}
                marginBottom={verticalScale(15)}
                marginTop={verticalScale(10)}
                borderWidth={scale(1)}
                borderColor={Color.Pink}
                onPress={() => setSkipImageSection(v => !v)}
              />

              <SectionBlock
                disabled={skipImageSection}
                blurAmount={8}
                blurType="light"
                radius={16}
              >
                <View>
                  <Image
                    source={
                      Images.profileImageIcon
                      // profileImage?.uri || profileData?.profileUrl
                      //   ? { uri: profileImage?.uri || profileData?.profileUrl }
                      //   : Images.profileImageIcon
                    }
                    style={styles.accountIconImage}
                  />
                  <Text style={styles.name}>{strings.myPicture}</Text>
                </View>
                <View style={styles.btnMainView}>
                  <Pressable
                    onPress={() => handleGallery(uploadProfileImageApi)}
                  >
                    <ActionButton
                      icon={Images.plusIcon}
                      label={strings.upload}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => handleCamera(uploadProfileImageApi)}
                  >
                    <ActionButton
                      icon={Images.cameraIcon}
                      label={strings.takeSelfi}
                    />
                  </Pressable>
                </View>
              </SectionBlock>

              <View
                style={[styles.devider, { marginTop: verticalScale(20) }]}
              />

              <Text style={styles.accountInfoText}>
                {strings.accountInfoText}
              </Text>

              <CustomButton
                title={skipBelowSection ? strings.undo : strings.skip}
                buttonWidth={scale(90)}
                buttonHeight={verticalScale(34)}
                backgroundColor={Color.rgba.Pink[1]}
                borderRadius={scale(16)}
                fontSize={moderateScale(16)}
                fontColor={Color.Black}
                fontFamily={Fonts.interBold}
                marginBottom={verticalScale(25)}
                marginTop={verticalScale(3)}
                borderWidth={scale(1)}
                borderColor={Color.Pink}
                onPress={() => setSkipBelowSection(v => !v)}
              />

              <SectionBlock
                disabled={skipBelowSection}
                blurAmount={8}
                blurType="light"
                radius={16}
              >
                <View style={styles.inputFieldView}>
                  <CustomInputField
                    label={strings.bio}
                    labelStyle={styles.heading}
                    onChangeText={handleChange('bio')}
                    onBlur={handleBlur('bio')}
                    value={values.bio}
                    touched={touched.bio}
                    errors={errors.bio}
                    multiline
                    numberOfLines={4}
                    inputStyle={styles.inputStyle}
                  />
                </View>

                <View style={styles.dropdownView}>
                  <Text style={styles.heading}>{strings.denomination}</Text>

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
                    dropdownPlaceholder={strings.protestonDenominationData}
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

                <View style={styles.questionnaireView} ref={questionnaireRef}>
                  <Text style={styles.heading}>{strings.questionnaire}</Text>
                  <FlatList
                    data={questionsData}
                    renderItem={renderQuestion}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ padding: scale(16) }}
                  />
                </View>
              </SectionBlock>

              <CustomButton
                title={strings.save}
                backgroundColor={Color.theme1}
                borderRadius={scale(30)}
                fontSize={moderateScale(16)}
                fontColor={Color.Black}
                fontFamily={Fonts.sfProBold}
                marginBottom={verticalScale(15)}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default memo(MyAccountScreen);
