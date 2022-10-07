import * as React from 'react';
import {useRef, useCallback, createRef} from 'react';

import {StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {useCameraDevices, useFrameProcessor} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
export default function Photo({navigation}) {
  const cameraRef = useRef(Camera);

  const [hasPermission, setHasPermission] = React.useState(false);
  const [photoFile, setPhotoFile] = React.useState();

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const devices = useCameraDevices();
  const device = devices.back;

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    // const values = examplePlugin(frame);
    // console.log(`Return Values: ${JSON.stringify(values)}`);
  }, []);

  const onPressCapturebtn = async () => {
    try {
      if (cameraRef.current == null) throw new Error('Camera ref is null!');
      else console.log(cameraRef.current);
      const photo = await cameraRef.current.takePhoto({
        photoCodec: 'jpeg',
        qualityPrioritization: 'quality',
        skipMetadata: true,
      });
      console.log('photo  ', photo.path);
      //photo.then(result => Alert.alert(result));
      setPhotoFile(photo.path);

      navigation.navigate('MediaPage', {
        path: photo.path,
        type: 'photo',
      });
      //   Alert.alert(photoFile);
    } catch (e) {
      console.log('failed try catch', e);
    }

    // try {
    //   photo.then(result => {
    //     if (result != null) {
    //       Alert.alert(result);
    //     }
    //   });
    // } catch (error) {
    //   Alert.alert(error);
    // }
    // photo.then(result => Alert.alert(result));
  };

  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={styles.RNcamera}
          device={device}
          isActive={true}
          photo={true}
          frameProcessorFps={5}
          ref={cameraRef}
        />
        <TouchableOpacity style={styles.capturebtn} onPress={onPressCapturebtn}>
          <Text style={styles.text}>Capture</Text>
        </TouchableOpacity>
        <Text style={{alignSelf: 'center'}}>{photoFile}</Text>
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
