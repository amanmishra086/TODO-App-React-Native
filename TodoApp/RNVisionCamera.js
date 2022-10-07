// import {View, Text} from 'react-native';
// import React from 'react';
// // import {useCameraDevices} from 'react-native-vision-camera';
// // import {Camera} from 'react-native-vision-camera';

// export default function RNVisionCamera() {
//   const [hasPermission, setHasPermission] = React.useState(false);

//   // const devices = useCameraDevices();
//   // const device = devices.back;

//   // React.useEffect(() => {
//   //   (async () => {
//   //     const status = await Camera.requestCameraPermission();
//   //     setHasPermission(status === 'authorized');
//   //   })();
//   // }, []);

//   return (
//     <View>
//       <Text>Hello</Text>
//     </View>
//     // device != null &&
//     // hasPermission && (
//     //   <>
//     //     <Camera
//     //       style={StyleSheet.absoluteFill}
//     //       device={device}
//     //       isActive={true}
//     //       // frameProcessor={frameProcessor}
//     //       // frameProcessorFps={5}
//     //     />
//     //   </>
//     // )
//   );
// }

import * as React from 'react';
import {useRef} from 'react';

import {StyleSheet, Text, Linking, Alert} from 'react-native';
import {useCameraDevices} from 'react-native-vision-camera';
import {Camera} from 'react-native-vision-camera';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';

export default function RNVisionCamera() {
  const cameraRef = useRef < Camera > null;
  console.log('camera ref   ', cameraRef);

  const [hasPermission, setHasPermission] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const devices = useCameraDevices();
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes([
    BarcodeFormat.ALL_FORMATS,
  ]);

  //Alternatively you can use the underlying function:

  // const frameProcessor = useFrameProcessor(frame => {
  //   'worklet';
  //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], {
  //     checkInverted: true,
  //   });
  //   runOnJS(setBarcodes)(detectedBarcodes);
  // }, []);

  return (
    device != null &&
    hasPermission && (
      <>
        <Text>Hello vision camera</Text>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        {barcodes.map((barcode, idx) => (
          <Text
            key={idx}
            style={styles.barcodeTextURL}
            onPress={() => {
              //Linking.openURL(barcode.displayValue);
            }}>
            {barcode.displayValue}
          </Text>
        ))}
      </>
    )
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
