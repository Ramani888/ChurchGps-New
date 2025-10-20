import { View, Modal, StyleSheet } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { UIActivityIndicator } from 'react-native-indicators';
import Color from './Color';

const Loader = ({ visible, color = Color.theme1, overlayOpacity = 0.3 }) => {
  return (
    <Modal transparent={true} animationType="none" visible={visible}>
      <View
        style={[
          styles.loaderContainer,
          { backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` },
        ]}
      >
        <UIActivityIndicator
          color={color}
          animating={visible}
          size={scale(30)}
        />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
