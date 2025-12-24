import { FlatList, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { styles } from './ProfileStyle';
import CustomHeader from '../../../custome/CustomHeader';
import { Fonts } from '../../../utils/Font';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import { strings } from '../../../language/strings';
import { Images } from '../../../utils/Images';
import CustomButton from '../../../custome/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Color from '../../../utils/Color';
import { screenName } from '../../../utils/NavigationKey';
import CustomBottomsheet from '../../../custome/CustomBottomsheet';
import LanguageBottomsheetContent from '../../../components/bottomSheetContent/LanguageBottomsheetContent';
import CustomInputField from '../../../custome/CustomInputField';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import CheckBox from '../../../custome/CustomCheckbox';
import { Shadow } from 'react-native-shadow-2';
import { useStateContext } from '../../../context/StateContext';
import CancelSubscriptionBottomsheetContent from '../../../components/bottomSheetContent/CancelSubscriptionBottomsheetContent';
import RefferalBottomsheetContent from '../../../components/bottomSheetContent/RefferalBottomsheetContent';
import { getProfileData } from './useProfile';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const languageSheetRef = useRef();
  const cancelSubscriptionSheetRef = useRef();
  const refferalSheetRef = useRef();

  const [email, setEmail] = useState('');
  const [profileName, setProfileName] = useState('');
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [denomination, setDenomination] = useState('');
  const [protestDenomination, setProtestDenomination] = useState('');
  const [otherDenomination, setOtherDenomination] = useState('');
  const [blurVisible, setBlurVisible] = useState(false);
  const [questionnaireVisible, setQuestionnaireVisible] = useState(false);
  const [answers, setAnswers] = useState({});
  const [profileImage, setProfileImage] = useState('');
  const [referalCode, setRefferalCode] = useState('');
  const [refferalCount, setRefferalCount] = useState('');

  const { setVisibleEditAccount, setLanguageChangeFromProfile } = useStateContext();

  const subscriptionData = useMemo(
    () => [
      { price: 1, image: Images.heartIcon, name: strings.jasper },
      { price: 5, image: Images.heartIcon, name: strings.jasper },
      { price: 10, image: Images.heartIcon, name: strings.jasper },
      { price: 25, image: Images.heartIcon, name: strings.jasper },
      { price: 50, image: Images.heartIcon, name: strings.jasper },
      { price: 100, image: Images.heartIcon, name: strings.jasper },
    ],
    [strings.jasper],
  );

  const inviteData = useMemo(
    () => [
      { image: Images.copyIcon1, name: strings.copyLink },
      { image: Images.whatsappIcon, name: strings.whatsapp },
      { image: Images.telegramIcon, name: strings.telegram },
      { image: Images.messageIcon, name: strings.message },
      { image: Images.twitterIcon, name: strings.x },
      { image: Images.facebookIcon, name: strings.facebook },
    ],
    [strings.copyLink, strings.whatsapp, strings.telegram, strings.message, strings.x, strings.facebook],
  );

  const refferalBadgesData = useMemo(
    () => [
      { id: 1, image: Images.referalImage1, referalCount: 5 },
      { id: 2, image: Images.referalImage2, referalCount: 10 },
      { id: 3, image: Images.referalImage3, referalCount: 20 },
      { id: 4, image: Images.referalImage4, referalCount: 30 },
      { id: 5, image: Images.referalImage5, referalCount: 50 },
    ],
    [],
  );

  const getProfileDataApi = useCallback(async () => {
    try {
      const response = await getProfileData();
      console.log('profile response', response);
      if (response?.success) {
        setEmail(response?.user?.email || '');
        setProfileName(response?.user?.profileName || '');
        setUserName(response?.user?.username || '');
        setBio(response?.user?.bio || '');
        setDenomination(response?.user?.denomination || '');
        setProtestDenomination(response?.user?.protestDenomination || '');
        setOtherDenomination(response?.user?.otherDenomination || '');
        setAnswers(response?.user?.questionnaire ?? []);
        setProfileImage(response?.user?.profileUrl || '');
      }
    } catch (error) {
      console.log('error in get profile data', error);
    }
  }, []);

  useLayoutEffect(() => {
    if (isFocused) {
      getProfileDataApi();
    }
  }, [isFocused, getProfileDataApi]);

  // ========================================= End =========================================== //

  const handleLogout = useCallback(async () => {
    try {
      await AsyncStorage.multiRemove(['TOKEN', 'USER']);
      navigation.reset({ index: 0, routes: [{ name: screenName.onBoarding }] });
    } catch (error) {
      console.error('Logout Error:', error);
    }
  }, [navigation]);

  const handleTermsAndPrivacy = useCallback(() => {
    navigation.navigate(screenName.termsAndPrivacy);
  }, [navigation]);

  const openLanguageBottomsheet = useCallback(() => {
    languageSheetRef.current.show();
    setTimeout(() => {
      setBlurVisible(true);
    }, 300);
  }, []);

  const closeLanguageBottomsheet = useCallback(() => {
    setBlurVisible(false);
    languageSheetRef.current.hide();
  }, []);

  const openCancelSubscriptionBottomSheet = useCallback(() => {
    cancelSubscriptionSheetRef.current.show();
    setTimeout(() => {
      setBlurVisible(true);
    }, 300);
  }, []);

  const closeCancelSubscriptionBottomSheet = useCallback(() => {
    setBlurVisible(false);
    cancelSubscriptionSheetRef.current.hide();
  }, []);

  const openRefferalBottomSheet = useCallback(() => {
    refferalSheetRef.current.show();
    setTimeout(() => {
      setBlurVisible(true);
    }, 300);
  }, []);

  const closeRefferalBottomSheet = useCallback(() => {
    setBlurVisible(false);
    refferalSheetRef.current.hide();
  }, []);

  const questionsData = useMemo(() => {
    return Array.from({ length: 28 }, (_, index) => {
      const id = (index + 1).toString();
      return {
        id,
        text: strings[`question${id}`], // will map question1, question2, … question21
      };
    });
  }, []);

  const options = useMemo(
    () => [
      { key: 'yes', value: strings.yes },
      { key: 'no', value: strings.no },
      { key: 'skip', value: strings.skip },
    ],
    [strings.yes, strings.no, strings.skip],
  );

  const renderQuestion = useCallback(
    ({ item }) => {
      return (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {item.id}. {item.text}
          </Text>
          <View style={styles.optionsRow}>
            {options.map(({ key, value }) => {
              const isSelected =
                Array.isArray(answers) &&
                answers.some(a => a.questionId === Number(item.id) && a.answer === key);

              return (
                <TouchableOpacity
                  key={key}
                  style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
                  // onPress={() => handleAnswer(item.id, key)}
                >
                  <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                    {value}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      );
    },
    [answers, options],
  );

  const renderSubscription = useCallback(({ item }) => {
    return (
      <View style={styles.subscriptionView}>
        <Text style={styles.subscriptionPrice}>${item?.price}</Text>
        <Image source={Images.heartIcon} style={styles.subscriptionImage} />
        <Text style={styles.subscriptionName}>{item?.name}</Text>
      </View>
    );
  }, []);

  const renderInvite = useCallback(({ item }) => {
    return (
      <View style={styles.inviteView}>
        <View style={styles.inviteIconView}>
          <Image source={item?.image} style={styles.inviteIcon} />
        </View>
        <Text style={styles.inviteText}>{item?.name}</Text>
      </View>
    );
  }, []);

  const renderReferalBadges = useCallback(
    ({ item }) => {
      const value = item?.referalCount;
      const selected = refferalCount.includes(value);

      const handleToggle = () => {
        setRefferalCount(
          prev =>
            prev.includes(value)
              ? prev.filter(v => v !== value) // remove if already selected
              : [...prev, value], // add if not selected
        );
      };

      return (
        <View style={styles.refferalCountView}>
          <Image source={item?.image} style={styles.Icon} />
          <Text style={styles.refferalCount}>{value}</Text>

          <CheckBox
            onPress={handleToggle}
            isChecked={selected}
            shape="circle"
            size={scale(22)}
            borderColor={selected ? Color.theme1 : Color.rgba.Gray[2]}
          />
        </View>
      );
    },
    [refferalCount],
  );

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader
        backArrowVisible={true}
        gradientTitle={strings.profile}
        titleFontSize={scale(30)}
        titleFontFamily={Fonts.spaceGroteskBold}
        languageIcon={Images.languageIcon}
        languageIconPress={() => {
          setLanguageChangeFromProfile(true);
          openLanguageBottomsheet();
        }}
        editIcon={Images.editIcon}
        editIconPress={() => {
          setVisibleEditAccount(true);
          navigation.navigate(screenName.myAccount);
        }}
      />
      <ScrollView>
        <View>
          <Image
            source={profileImage ? { uri: profileImage } : Images.profileImageIcon}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{profileName ? profileName : strings.myPicture}</Text>
        </View>

        <View style={styles.form}>
          <CustomInputField
            label={strings.email}
            labelStyle={styles.heading}
            placeholder={strings.enterEmail}
            onChangeText={setEmail}
            value={email}
            editable={false}
            inputStyle={styles.inputStyle}
          />
          <CustomInputField
            label={strings.profileName}
            labelStyle={styles.heading}
            onChangeText={setProfileName}
            value={profileName}
            editable={false}
            inputStyle={styles.inputStyle}
          />
          <CustomInputField
            label={strings.userName}
            labelStyle={styles.heading}
            onChangeText={setUserName}
            value={userName}
            editable={false}
            inputStyle={styles.inputStyle}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {bio && (
            <>
              <View style={styles.devider} />
              <View>
                <Text style={styles.heading}>{strings.bio}</Text>
                <Text style={styles.text}>{bio}</Text>
              </View>
            </>
          )}

          {denomination && (
            <>
              <View style={styles.devider} />
              <View>
                <Text style={styles.heading}>{strings.denomination}</Text>
                <Text style={styles.text}>{denomination}</Text>
                {protestDenomination && (
                  <Text style={[styles.text, { marginTop: verticalScale(-17) }]}>
                    {protestDenomination}
                  </Text>
                )}
                {otherDenomination && (
                  <Text style={[styles.text, { marginTop: verticalScale(-17) }]}>
                    {otherDenomination}
                  </Text>
                )}
              </View>
            </>
          )}

          <View style={styles.devider} />

          <View>
            <View style={styles.introVideoHeader}>
              <Text style={styles.heading}>{strings.introVideo}</Text>
              <Pressable onPress={() => navigation.navigate(screenName.introVideo)}>
                <Image source={Images.videoIcon} style={styles.videoIcon} />
              </Pressable>
            </View>
            <Image source={Images.videoImage} style={styles.videoImage} />
          </View>

          <View>
            <View style={styles.questionnaireHeader}>
              <Text style={styles.heading}>{strings.questionnaire}</Text>
              <View style={styles.questionnaireHeader}>
                <Pressable
                  onPress={() => {
                    setVisibleEditAccount(true);
                    navigation.navigate(screenName.myAccount, {
                      editQuestion: true,
                    });
                  }}
                >
                  <Image source={Images.editIcon} style={styles.editIcon} />
                </Pressable>
                <Pressable onPress={() => setQuestionnaireVisible(!questionnaireVisible)}>
                  <Image source={Images.downArrowImage} style={styles.downArrowIcon} />
                </Pressable>
              </View>
            </View>
          </View>
          {questionnaireVisible && (
            <View>
              <FlatList
                data={questionsData}
                renderItem={renderQuestion}
                keyExtractor={item => item.id}
                contentContainerStyle={{ padding: scale(16) }}
              />
            </View>
          )}

          <View style={styles.devider} />

          <View>
            <Text style={styles.subscriptionTitle}>{strings.subscription}</Text>
            <Pressable
              onPress={() => openCancelSubscriptionBottomSheet()}
              style={styles.infoIconBtn}
            >
              <Image source={Images.informationIcon} style={styles.infoIcon} />
            </Pressable>

            <FlatList
              data={subscriptionData}
              renderItem={renderSubscription}
              keyExtractor={(item, index) => `subscription-${item.price}-${index}`}
              numColumns={3}
              style={styles.subscriptionContainer}
            />
          </View>

          <CustomButton
            title={strings.active}
            backgroundColor={Color.theme1}
            borderRadius={scale(30)}
            fontSize={moderateScale(16)}
            fontColor={Color.Black}
            fontFamily={Fonts.sfProBold}
            marginTop={verticalScale(10)}
            marginBottom={verticalScale(15)}
            onPress={() => {}}
          />

          <View style={styles.profileRow}>
            <Text style={styles.profileName}>Test</Text>
            <Image source={Images.heartIcon} style={styles.selectedScriptionImage} />
          </View>

          <View style={styles.referalDetailView}>
            <Text style={styles.heading}>{strings.yourReferalCode}</Text>
            <View style={[styles.row, { marginTop: verticalScale(10) }]}>
              <View style={styles.referalView}>
                <Text style={styles.referalText}>XT3148</Text>
                <Pressable onPress={() => alert('copy')}>
                  <Image source={Images.copyIcon} style={styles.Icon} />
                </Pressable>
              </View>
              <View style={[styles.row, { gap: scale(10) }]}>
                <Text style={styles.totalReferalText}>{strings.totalReferal}</Text>
                <View style={styles.totalReferalView}>
                  <Text style={styles.totalReferalValue}>5</Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <Text style={[styles.heading, { textAlign: 'center' }]}>{strings.invite}</Text>
            <FlatList
              data={inviteData}
              renderItem={renderInvite}
              keyExtractor={(item, index) => `invite-${item.name}-${index}`}
              numColumns={3}
              columnWrapperStyle={styles.inviteColumnStyle}
            />
          </View>

          <View style={styles.reffralInputView}>
            <Text style={styles.heading}>{strings.someNesRefferal}</Text>
            <View style={[styles.row, { justifyContent: 'flex-start' }]}>
              <CustomInputField
                placeholder={strings.enterRefferalCode}
                onChangeText={setRefferalCode}
                value={referalCode}
                inputStyle={styles.referalInputStyle}
                rightImage={Images.telegramIcon1}
                rightImageStyle={styles.Icon}
              />
              <Image source={Images.rightTickIcon} style={styles.Icon} />
            </View>
          </View>

          <View style={styles.reffralBadgesContainer}>
            <Text style={[styles.heading, { marginBottom: verticalScale(10) }]}>
              {strings.referalBadges}
            </Text>
            <Pressable
              onPress={() => openRefferalBottomSheet()}
              style={[styles.infoIconBtn, { top: verticalScale(5) }]}
            >
              <Image source={Images.informationIcon} style={styles.infoIcon} />
            </Pressable>
            <Shadow
              style={styles.refferalBadgeView}
              distance={10}
              startColor={'rgba(0, 0, 0, 0.04)'}
            >
              <FlatList
                data={refferalBadgesData}
                renderItem={renderReferalBadges}
                keyExtractor={item => `badge-${item.id}`}
                horizontal
              />
            </Shadow>
          </View>

          <View style={[styles.profileRow, { marginVertical: verticalScale(15) }]}>
            <Text style={styles.profileName}>Test</Text>
            <Image source={Images.refferalBadgesIcon} style={styles.Icon} />
          </View>

          <View style={[styles.row, styles.bottomTab]}>
            <Pressable onPress={handleTermsAndPrivacy}>
              <Shadow style={styles.singleGrid} distance={5} startColor={'rgba(0, 0, 0, 0.02)'}>
                <Image source={Images.termsAndPrivacyIcon} style={styles.Icon} />
                <Text style={styles.inviteText}>{strings.termsAndPrivacy}</Text>
              </Shadow>
            </Pressable>
            <Pressable onPress={handleLogout}>
              <Shadow style={styles.singleGrid} distance={5} startColor={'rgba(0, 0, 0, 0.02)'}>
                <Image source={Images.logoutIcon} style={styles.Icon} />
                <Text style={styles.inviteText}>{strings.logout}</Text>
              </Shadow>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      {blurVisible && (
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={4}
          reducedTransparencyFallbackColor="white"
        />
      )}
      <CustomBottomsheet
        ref={languageSheetRef}
        onBottomsheetClose={closeLanguageBottomsheet}
        bottomSheetContent={<LanguageBottomsheetContent />}
      />
      <CustomBottomsheet
        ref={cancelSubscriptionSheetRef}
        onBottomsheetClose={closeCancelSubscriptionBottomSheet}
        bottomSheetContent={<CancelSubscriptionBottomsheetContent />}
      />
      <CustomBottomsheet
        ref={refferalSheetRef}
        onBottomsheetClose={closeRefferalBottomSheet}
        bottomSheetContent={<RefferalBottomsheetContent />}
      />
    </SafeAreaView>
  );
};

export default memo(ProfileScreen);
