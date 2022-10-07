import * as React from 'react';
import {useRef, useCallback} from 'react';

import {StyleSheet, Text, TouchableOpacity, Alert, View} from 'react-native';
import {useCameraDevices, useFrameProcessor} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
export default function Video({navigation}) {
  const cameraRef = useRef(Camera);

  const [hasCameraPermission, setHasCameraPermission] = React.useState(false);
  const [hasMicPermission, sethasMicPermission] = React.useState(false);
  const [isStartRecoding, setIsStartRecording] = React.useState(false);

  const [videoFile, setVideoFile] = React.useState();

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasCameraPermission(status === 'authorized');
      const micstatus = await Camera.requestMicrophonePermission();
      sethasMicPermission(micstatus === 'authorized');
    })();
  }, []);

  const devices = useCameraDevices();
  const device = devices.back;

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    // const values = examplePlugin(frame);
    // console.log(`Return Values: ${JSON.stringify(values)}`);
  }, []);

  const startRecording = useCallback(() => {
    try {
      if (cameraRef.current == null) throw new Error('Camera ref is null!');

      console.log('calling startRecording()...');
      cameraRef.current.startRecording({
        onRecordingError: error => {
          console.error('Recording failed!', error);
        },
        onRecordingFinished: video => {
          console.log(`Recording successfully finished! ${video.path}`);

          setVideoFile(video.path);
          navigation.navigate('MediaPage', {
            path: video.path,
            type: 'video',
          });
        },
      });
      // TODO: wait until startRecording returns to actually find out if the recording has successfully started
      console.log('called startRecording()!');
    } catch (e) {
      console.error('failed to start recording!', e, 'camera');
    }
  });

  const stopRecording = useCallback(async () => {
    try {
      if (cameraRef.current == null) throw new Error('Camera ref is null!');

      console.log('calling stopRecording()...');
      await cameraRef.current.stopRecording();
      console.log('called stopRecording()!');
    } catch (e) {
      console.error('failed to stop recording!', e);
    }
  });

  const onPressStartbtn = () => {
    if (isStartRecoding) {
      stopRecording();
      setIsStartRecording(false);
    } else {
      startRecording();
      setIsStartRecording(true);
    }
  };

  return (
    device != null &&
    hasCameraPermission && (
      <>
        <Camera
          style={styles.RNcamera}
          device={device}
          isActive={true}
          video={true}
          audio={hasMicPermission}
          frameProcessorFps={5}
          ref={cameraRef}
        />
        <TouchableOpacity style={styles.capturebtn} onPress={onPressStartbtn}>
          {isStartRecoding ? (
            <Text style={styles.text}>stop</Text>
          ) : (
            <Text style={styles.text}>start</Text>
          )}
        </TouchableOpacity>
        <Text style={[{alignSelf: 'center'}]}>{videoFile}</Text>
      </>
    )
  );
}

const styles = StyleSheet.create({
  RNcamera: {
    height: '80%',
    width: '100%',
  },
  capturebtn: {
    alignItems: 'center',
    marginTop: 40,
  },
  text: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    fontSize: 20,
    fontWeight: '800',
  },
});
