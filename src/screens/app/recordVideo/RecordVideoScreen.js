// import React, {
//   memo,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';
// import { View, Text, StyleSheet, Pressable } from 'react-native';
// import { Camera, useCameraDevice } from 'react-native-vision-camera';
// import Slider from '@react-native-community/slider';
// import Ionicons from '@react-native-vector-icons/ionicons';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { strings } from '../../../language/strings';
// import Color from '../../../utils/Color';
// import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';

// const NEON = Color.theme1; // neon green like the mock
// const BG = '#0B0D16'; // deep navy/black
// const TEXT_MUTED = 'rgba(255,255,255,0.7)';

// const RecordVideoScreen = ({ defaultTargetSec = 60, onDone }) => {
//   const front = useCameraDevice('front'); // returns null until ready
//   const back = useCameraDevice('back');
//   const device = front ?? back;
//   const cameraRef = useRef(null);

//   const [hasPermission, setHasPermission] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [elapsed, setElapsed] = useState(0);
//   const [targetSec, setTargetSec] = useState(defaultTargetSec);
//   const [filePath, setFilePath] = useState(undefined);

//   // ask perms
//   useEffect(() => {
//     (async () => {
//       const cam = await Camera.requestCameraPermission();
//       const mic = await Camera.requestMicrophonePermission();
//       setHasPermission(cam === 'granted' && mic === 'granted');
//     })();
//   }, []);

//   // simple timer while recording
//   useEffect(() => {
//     if (!isRecording) return;
//     const t = setInterval(() => setElapsed(s => s + 1), 1000);
//     return () => clearInterval(t);
//   }, [isRecording]);

//   const stop = useCallback(async () => {
//     if (!cameraRef.current) return;
//     try {
//       await cameraRef.current.stopRecording();
//     } catch (_) {
//       // already stopped
//     }
//   }, []);

//   const start = useCallback(async () => {
//     if (!cameraRef.current || isRecording) return;
//     setElapsed(0);
//     setFilePath(undefined);
//     setIsRecording(true);

//     const timeout = setTimeout(() => {
//       stop();
//     }, targetSec * 1000);

//     cameraRef.current.startRecording({
//       onRecordingFinished: video => {
//         clearTimeout(timeout);
//         setFilePath(video.path);
//         setIsRecording(false);
//       },
//       onRecordingError: e => {
//         clearTimeout(timeout);
//         console.warn(e);
//         setIsRecording(false);
//       },
//     });
//   }, [isRecording, targetSec, stop]);

//   const reset = useCallback(() => {
//     setElapsed(0);
//     setFilePath(undefined);
//   }, []);

//   const handleMainButton = useCallback(() => {
//     if (isRecording) stop();
//     else start();
//   }, [isRecording, start, stop]);

//   const handleDone = useCallback(() => {
//     if (onDone) onDone(filePath);
//   }, [filePath, onDone]);

//   const timeLabel = useMemo(() => {
//     const m = Math.floor(elapsed / 60);
//     const s = elapsed % 60;
//     return `${m}:${s.toString().padStart(2, '0')}`;
//   }, [elapsed]);

//   if (!device || !hasPermission) {
//     return (
//       <SafeAreaView
//         style={[
//           styles.root,
//           { alignItems: 'center', justifyContent: 'center' },
//         ]}
//       >
//         <Text style={{ color: 'white' }}>Preparing camera…</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.root}>
//       <View style={styles.previewWrap}>
//         <Camera
//           ref={cameraRef}
//           style={StyleSheet.absoluteFill}
//           device={device}
//           isActive={true}
//           video={true}
//           audio={true}
//         />
//       </View>

//       <View style={styles.controls}>
//         <View style={styles.sliderRow}>
//           <Text style={styles.sliderEdge}>{strings.start}</Text>
//           <Slider
//             style={styles.slider}
//             minimumValue={0}
//             maximumValue={60}
//             value={targetSec}
//             step={1}
//             minimumTrackTintColor={NEON}
//             maximumTrackTintColor="rgba(255,255,255,0.2)"
//             thumbTintColor={NEON}
//             onValueChange={setTargetSec}
//           />
//           <Text style={styles.sliderEdge}>1 Min</Text>
//         </View>

//         <View style={styles.recordGroup}>
//           <Text style={styles.resetLabel}>{strings.reset}</Text>

//           <Pressable
//             onPress={handleMainButton}
//             style={({ pressed }) => [
//               styles.recordBtnOuter,
//               pressed && { opacity: 0.85 },
//               isRecording && { borderColor: Color.Red },
//             ]}
//           >
//             <View
//               style={[
//                 styles.recordBtnInner,
//                 isRecording && { backgroundColor: Color.Red },
//               ]}
//             />
//           </Pressable>

//           <Pressable
//             onPress={reset}
//             style={styles.smallCircleBtn}
//             accessibilityLabel="Reset"
//           >
//             <Ionicons name="refresh" size={20} color="white" />
//           </Pressable>
//         </View>

//         <Pressable style={styles.doneBtn} onPress={handleDone}>
//           <Text style={styles.doneText}>{strings.done}</Text>
//         </Pressable>

//         {/* tiny status / timer */}
//         <Text style={styles.timerText}>
//           {isRecording ? 'Recording… ' : filePath ? 'Saved • ' : ''}
//           {timeLabel}
//         </Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default memo(RecordVideoScreen);

// const CIRCLE = moderateScale(72);

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: BG,
//   },
//   previewWrap: {
//     height: '50%',
//     backgroundColor: '#111',
//     overflow: 'hidden',
//     borderBottomLeftRadius: scale(14),
//     borderBottomRightRadius: scale(14),
//   },
//   controls: {
//     flex: 1,
//     paddingHorizontal: scale(18),
//     paddingTop: verticalScale(12),
//   },
//   sliderRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: scale(10),
//   },
//   slider: { flex: 1 },
//   sliderEdge: {
//     color: TEXT_MUTED,
//     fontSize: moderateScale(12),
//     width: scale(44),
//     textAlign: 'center',
//   },
//   recordGroup: {
//     marginTop: verticalScale(10),
//     marginBottom: verticalScale(18),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   resetLabel: {
//     color: TEXT_MUTED,
//     marginBottom: verticalScale(6),
//   },
//   recordBtnOuter: {
//     width: CIRCLE,
//     height: CIRCLE,
//     borderRadius: CIRCLE / 2,
//     borderWidth: 3,
//     borderColor: NEON,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#121420',
//     elevation: 4,
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 6,
//     shadowOffset: { width: 0, height: 4 },
//   },
//   recordBtnInner: {
//     width: CIRCLE - 22,
//     height: CIRCLE - 22,
//     borderRadius: (CIRCLE - 22) / 2,
//     backgroundColor: '#FFFFFF',
//   },
//   smallCircleBtn: {
//     position: 'absolute',
//     right: scale(24),
//     top: verticalScale(18),
//     width: scale(38),
//     height: scale(38),
//     borderRadius: scale(19),
//     backgroundColor: 'rgba(255,255,255,0.12)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   doneBtn: {
//     marginTop: 8,
//     backgroundColor: NEON,
//     borderRadius: 28,
//     height: 52,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   doneText: {
//     color: '#0B0D16',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   timerText: {
//     marginTop: 10,
//     textAlign: 'center',
//     color: TEXT_MUTED,
//   },
// });

import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Ionicons from '@react-native-vector-icons/ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import { strings } from '../../../language/strings';
import Color from '../../../utils/Color';
import { moderateScale, scale, verticalScale } from '../../../utils/Responsive';
import Loader from '../../../utils/Loader';
import { buildFilePart, uploadIntroVideo } from './useRecordVideo';

const NEON = Color.theme1;
const BG = '#0B0D16';
const TEXT_MUTED = 'rgba(255,255,255,0.7)';
const CIRCLE = moderateScale(72);

const RecordVideoScreen = ({ defaultTargetSec = 60, onDone }) => {
  const front = useCameraDevice('front');
  const back = useCameraDevice('back');
  const device = front ?? back;
  const isFocused = useIsFocused();
  const cameraRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [targetSec, setTargetSec] = useState(defaultTargetSec);
  const [filePath, setFilePath] = useState(undefined);

  const timerRef = useRef(null);
  const timeoutRef = useRef(null);
  const startingRef = useRef(false);

  // Request camera + mic permissions
  useEffect(() => {
    (async () => {
      const cam = await Camera.requestCameraPermission();
      const mic = await Camera.requestMicrophonePermission();
      setHasPermission(cam === 'granted' && mic === 'granted');
    })();
  }, []);

  // Timer while recording
  useEffect(() => {
    if (!isRecording) return;
    timerRef.current = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRecording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      try {
        cameraRef.current?.stopRecording?.();
      } catch {}
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // ====================================== Api =================================== //

  const uploadVideoApi = useCallback(async videoFile => {
    console.log('file 13', videoFile);
    const File = buildFilePart(videoFile, `intro_${Date.now()}.mp4`);
    console.log('video file', File);
    if (!File) return;

    const body = new FormData();
    body.append('video', File);

    try {
      setVisible(true);
      const response = await uploadIntroVideo(body);
      console.log('response upload video', response);
      if (response?.success) {
        ToastMessage(response?.message);
      }
    } catch (error) {
      console.log('error in upload intro video api', error);
    } finally {
      setVisible(false);
    }
  }, []);

  // ====================================== End =================================== //

  const normalizePath = p =>
    p ? (p.startsWith('file://') ? p : `file://${p}`) : undefined;

  const stop = useCallback(async () => {
    if (!cameraRef.current) return;
    try {
      await cameraRef.current.stopRecording();
    } catch {}
  }, []);

  const start = useCallback(async () => {
    if (!cameraRef.current || isRecording || startingRef.current) return;
    startingRef.current = true;

    try {
      setElapsed(0);
      setFilePath(undefined);
      setIsRecording(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        () => stop(),
        Math.max(1, targetSec) * 1000,
      );

      await cameraRef.current.startRecording({
        fileType: 'mp4', // prefers MP4 container (iOS & Android on recent versions)
        videoCodec: 'h264', // H.264 -> widely compatible with MP4
        onRecordingFinished: video => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          setIsRecording(false);
          const normalized = normalizePath(video?.path);
          setFilePath(normalized);
          startingRef.current = false;
        },
        onRecordingError: e => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          console.warn('Recording Error', e);
          setIsRecording(false);
          startingRef.current = false;
        },
      });
    } catch (e) {
      console.warn('Start Recording Error', e);
      setIsRecording(false);
      startingRef.current = false;
    }
  }, [isRecording, targetSec, stop]);

  const reset = useCallback(() => {
    setElapsed(0);
    setFilePath(undefined);
  }, []);

  const handleMainButton = useCallback(() => {
    if (filePath) return;
    if (isRecording) stop();
    else start();
  }, [isRecording, start, stop, filePath]);

  const handleDone = useCallback(() => {
    if (filePath) {
      uploadVideoApi(filePath);
      onDone?.(filePath);
    }
  }, [filePath, uploadVideoApi, onDone]);

  const timeLabel = useMemo(() => {
    const m = Math.floor(elapsed / 60);
    const s = elapsed % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  }, [elapsed]);

  if (!device || !hasPermission) {
    return (
      <SafeAreaView
        style={[
          styles.root,
          { alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        <Loader />
      </SafeAreaView>
    );
  }

  const cameraActive = isFocused && !filePath;

  return (
    <SafeAreaView style={styles.root}>
      <Loader visible={visible} />
      <View style={styles.previewWrap}>
        {!filePath ? (
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={cameraActive}
            video
            audio
          />
        ) : (
          <Video
            source={{ uri: filePath }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
            controls
            paused={false}
            repeat={false}
            onError={e => console.warn('Video error', e)}
          />
        )}
      </View>

      <View style={styles.controls}>
        <View style={styles.sliderRow}>
          <Text style={styles.sliderEdge}>{strings.start}</Text>
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={60}
            value={targetSec}
            step={1}
            minimumTrackTintColor={NEON}
            maximumTrackTintColor="rgba(255,255,255,0.2)"
            thumbTintColor={NEON}
            onValueChange={setTargetSec}
            disabled={isRecording || !!filePath}
          />
          <Text style={styles.sliderEdge}>1 Min</Text>
        </View>

        <View style={styles.recordGroup}>
          <Text style={styles.resetLabel}>
            {filePath ? strings.retack : strings.reset}
          </Text>

          <Pressable
            onPress={handleMainButton}
            disabled={!!filePath}
            style={({ pressed }) => [
              styles.recordBtnOuter,
              pressed && !filePath && { opacity: 0.85 },
              (isRecording || filePath) && {
                borderColor: filePath ? Color.theme1 : Color.Red,
              },
            ]}
          >
            <View
              style={[
                styles.recordBtnInner,
                (isRecording || filePath) && {
                  backgroundColor: filePath ? Color.theme1 : Color.Red,
                },
              ]}
            />
          </Pressable>

          <Pressable
            onPress={reset}
            style={styles.smallCircleBtn}
            accessibilityLabel={filePath ? 'Retake' : 'Reset'}
          >
            <Ionicons name={'refresh'} size={20} color="white" />
          </Pressable>
        </View>

        {/* Done */}
        <Pressable
          style={[styles.doneBtn, { opacity: filePath ? 1 : 0.5 }]}
          disabled={!filePath}
          onPress={handleDone}
        >
          <Text style={styles.doneText}>{strings.done}</Text>
        </Pressable>

        {/* Timer */}
        <Text style={styles.timerText}>
          {isRecording ? 'Recording… ' : filePath ? 'Saved • ' : ''}
          {timeLabel}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default memo(RecordVideoScreen);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG,
  },
  previewWrap: {
    height: '50%',
    backgroundColor: '#111',
    overflow: 'hidden',
    borderBottomLeftRadius: scale(14),
    borderBottomRightRadius: scale(14),
  },
  controls: {
    flex: 1,
    paddingHorizontal: scale(18),
    paddingTop: verticalScale(12),
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  slider: { flex: 1 },
  sliderEdge: {
    color: TEXT_MUTED,
    fontSize: moderateScale(12),
    width: scale(44),
    textAlign: 'center',
  },
  recordGroup: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetLabel: {
    color: TEXT_MUTED,
    marginBottom: verticalScale(6),
  },
  recordBtnOuter: {
    width: CIRCLE,
    height: CIRCLE,
    borderRadius: CIRCLE / 2,
    borderWidth: 3,
    borderColor: NEON,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121420',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  recordBtnInner: {
    width: CIRCLE - 22,
    height: CIRCLE - 22,
    borderRadius: (CIRCLE - 22) / 2,
    backgroundColor: '#FFFFFF',
  },
  smallCircleBtn: {
    position: 'absolute',
    right: scale(24),
    top: verticalScale(18),
    width: scale(38),
    height: scale(38),
    borderRadius: scale(19),
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneBtn: {
    marginTop: 8,
    backgroundColor: NEON,
    borderRadius: 28,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneText: {
    color: '#0B0D16',
    fontSize: 18,
    fontWeight: '600',
  },
  timerText: {
    marginTop: 10,
    textAlign: 'center',
    color: TEXT_MUTED,
  },
});
