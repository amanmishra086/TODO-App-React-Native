import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {
  DBRConfig,
  decode,
  TextResult,
} from 'vision-camera-dynamsoft-barcode-reader';
import * as REA from 'react-native-reanimated';

export default function DynamsoftScanner() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [barcodeResults, setBarcodeResults] = React.useState([]);
  const devices = useCameraDevices();
  const device = devices.back;

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const config = {};
    config.template =
      '{"ImageParameter":{"BarcodeFormatIds":["BF_QR_CODE"],"Description":"","Name":"Settings"},"Version":"3.0"}'; //scan qrcode only

    const results = decode(frame, config);
    REA.runOnJS(setBarcodeResults)(results);
  }, []);

  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />
        {barcodeResults.map((barcode, idx) => (
          <Text key={idx} style={styles.barcodeText}>
            {barcode.barcodeFormat + ': ' + barcode.barcodeText}
          </Text>
        ))}
      </>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodeText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
