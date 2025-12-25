import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { memo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStateContext } from '../../context/StateContext';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../../utils/Color';
import { Images } from '../../utils/Images';
import CustomInputField from '../../custome/CustomInputField';
import { strings } from '../../language/strings';
import CustomButton from '../../custome/CustomButton';
import { moderateScale, scale, verticalScale } from '../../utils/Responsive';
import { Fonts } from '../../utils/Font';

const ChatComponent = ({ searchFieldVisible, setSearchFieldVisible }) => {
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState('');

  const { changeBackgroundNumber } = useStateContext();

  return (
    <SafeAreaView style={styles.container}>
      {changeBackgroundNumber !== '1' ? (
        <LinearGradient
          colors={
            changeBackgroundNumber === '2'
              ? Color.gradientBackground2
              : changeBackgroundNumber === '3'
              ? Color.gradientBackground3
              : changeBackgroundNumber === '4'
              ? Color.gradientBackground4
              : changeBackgroundNumber === '5'
              ? Color.gradientBackground5
              : changeBackgroundNumber === '6'
              ? Color.gradientBackground6
              : changeBackgroundNumber === '7'
              ? Color.gradientBackground7
              : changeBackgroundNumber === '8'
              ? Color.gradientBackground8
              : changeBackgroundNumber === '9'
              ? Color.gradientBackground9
              : [Color.White]
          }
          style={styles.backgroundImage}
        >
          <ImageBackground
            source={Images.backgroundImage}
            style={styles.backgroundImage}
            imageStyle={{ opacity: 0.85 }}
          >
            {searchFieldVisible && (
              <>
                <View
                  style={[
                    styles.searchInput,
                    {
                      backgroundColor:
                        changeBackgroundNumber !== '1' ? Color.OffWhite : Color.rgba.Gray[1],
                    },
                  ]}
                >
                  <TouchableOpacity onPress={() => {}}>
                    <Image source={Images.searchIcon1} style={styles.icon} tintColor={Color.Gray} />
                  </TouchableOpacity>
                  <CustomInputField
                    placeholder={strings.searchPlaceholder}
                    onChangeText={setSearch}
                    value={search}
                    inputStyle={styles.inputStyle}
                  />
                  <TouchableOpacity onPress={() => {}}>
                    <Image source={Images.userIcon} style={styles.icon} tintColor={Color.Gray} />
                  </TouchableOpacity>
                </View>
                <CustomButton
                  title={strings.close}
                  buttonWidth={scale(96)}
                  buttonHeight={verticalScale(26)}
                  backgroundColor={
                    changeBackgroundNumber !== '1' ? Color.OffWhite : Color.rgba.Gray[1]
                  }
                  borderRadius={scale(10)}
                  fontSize={moderateScale(12)}
                  fontColor={Color.Gray}
                  fontFamily={Fonts.interRegular}
                  marginTop={verticalScale(5)}
                  onPress={() => setSearchFieldVisible(false)}
                />
              </>
            )}

            <View
              style={[
                styles.messageInput,
                {
                  backgroundColor:
                    changeBackgroundNumber !== '1' ? Color.OffWhite : Color.rgba.Gray[1],
                },
              ]}
            >
              <TouchableOpacity onPress={() => {}}>
                <Image source={Images.gridIcon} style={styles.icon} />
              </TouchableOpacity>
              <CustomInputField
                placeholder={strings.message}
                onChangeText={setMessage}
                value={message}
                inputStyle={styles.inputStyle}
              />
              <TouchableOpacity onPress={() => {}}>
                <Image source={Images.microphoneIcon} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </LinearGradient>
      ) : (
        <>
          {searchFieldVisible && (
            <>
              <View style={styles.searchInput}>
                <TouchableOpacity onPress={() => {}}>
                  <Image source={Images.searchIcon1} style={styles.icon} tintColor={Color.Gray} />
                </TouchableOpacity>
                <CustomInputField
                  placeholder={strings.searchPlaceholder}
                  onChangeText={setSearch}
                  value={search}
                  inputStyle={styles.inputStyle}
                />
                <TouchableOpacity onPress={() => {}}>
                  <Image source={Images.userIcon} style={styles.icon} tintColor={Color.Gray} />
                </TouchableOpacity>
              </View>
              <CustomButton
                title={strings.close}
                buttonWidth={scale(96)}
                buttonHeight={verticalScale(26)}
                backgroundColor={Color.rgba.Gray[2]}
                borderRadius={scale(10)}
                fontSize={moderateScale(12)}
                fontColor={Color.Gray}
                fontFamily={Fonts.interRegular}
                marginTop={verticalScale(5)}
                onPress={() => setSearchFieldVisible(false)}
              />
            </>
          )}

          <View style={styles.messageInput}>
            <TouchableOpacity onPress={() => {}}>
              <Image source={Images.gridIcon} style={styles.icon} />
            </TouchableOpacity>
            <CustomInputField
              placeholder={strings.message}
              onChangeText={setMessage}
              value={message}
              inputStyle={styles.inputStyle}
            />
            <TouchableOpacity onPress={() => {}}>
              <Image source={Images.microphoneIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default memo(ChatComponent);

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: verticalScale(-34) },
  backgroundImage: { flex: 1 },
  searchInput: {
    zIndex: 1,
    width: scale(343),
    height: scale(56),
    backgroundColor: Color.rgba.Gray[1],
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(16),
    paddingHorizontal: scale(16),
    borderRadius: scale(50),
    marginTop: verticalScale(15),
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  messageInput: {
    zIndex: 1,
    position: 'absolute',
    bottom: verticalScale(10),
    width: scale(343),
    height: scale(56),
    backgroundColor: Color.rgba.Gray[1],
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: scale(16),
    paddingHorizontal: scale(16),
    borderRadius: scale(50),
  },
  inputStyle: {
    width: scale(258),
    height: scale(50),
    marginTop: verticalScale(8.5),
    marginRight: scale(10),
    fontSize: moderateScale(14),
  },
  icon: { width: scale(24), height: scale(24) },
});
