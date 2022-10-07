import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import Video from 'react-native-video';

import {PressableOpacity} from 'react-native-pressable-opacity';
import CameraRoll from '@react-native-community/cameraroll';

import React, {useState, useMemo, useCallback} from 'react';
import IonIcon from 'react-native-vector-icons/Ionicons';

const requestSavePermission = async () => {
  if (Platform.OS !== 'android') return true;

  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
  if (permission == null) return false;
  let hasPermission = await PermissionsAndroid.check(permission);
  if (!hasPermission) {
    const permissionRequestResult = await PermissionsAndroid.request(
      permission,
    );
    hasPermission = permissionRequestResult === 'granted';
  }
  return hasPermission;
};

export default function MediaPage({navigation, route}) {
  const {path, type} = route.params;

  const [hasMediaLoaded, setHasMediaLoaded] = useState(false);
  const [savingState, setSavingState] = useState('none');

  const onMediaLoadEnd = useCallback(() => {
    console.log('media has loaded.');
    setHasMediaLoaded(true);
  }, []);

  const onMediaLoadError = useCallback(error => {
    console.log(`failed to load media: ${JSON.stringify(error)}`);
  }, []);

  const onSavePressed = useCallback(async () => {
    try {
      setSavingState('saving');

      const hasPermission = await requestSavePermission();
      if (!hasPermission) {
        Alert.alert(
          'Permission denied!',
          'Vision Camera does not have permission to save the media to your camera roll.',
        );
        return;
      }
      await CameraRoll.save(`file://${path}`, {
        type: type,
      });
      setSavingState('saved');
    } catch (e) {
      const message = e instanceof Error ? e.message : JSON.stringify(e);
      setSavingState('none');
      Alert.alert(
        'Failed to save!',
        `An unexpected error occured while trying to save your ${type}. ${message}`,
      );
    }
  }, [path, type]);

  //   const onMediaLoad = useCallback(event => {
  //     if (isVideoOnLoadEvent(event)) {
  //       console.log(
  //         `Video loaded. Size: ${event.naturalSize.width}x${event.naturalSize.height} (${event.naturalSize.orientation}, ${event.duration} seconds)`,
  //       );
  //     } else {
  //       console.log(
  //         `Image loaded. Size: ${event.nativeEvent.source.width}x${event.nativeEvent.source.height}`,
  //       );
  //     }
  //   }, []);

  const source = useMemo(() => ({uri: `file://${path}`}), [path]);

  const screenStyle = () => ({opacity: hasMediaLoaded ? 1 : 0});
  return (
    <View style={[styles.container, screenStyle]}>
      {type === 'photo' && (
        <Image
          source={source}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          onLoadEnd={onMediaLoadEnd}
        />
      )}
      {type === 'video' && (
        <Video
          source={source}
          style={StyleSheet.absoluteFill}
          posterResizeMode="cover"
          allowsExternalPlayback={false}
          automaticallyWaitsToMinimizeStalling={false}
          disableFocus={true}
          repeat={true}
          useTextureView={false}
          controls={false}
          playWhenInactive={true}
          ignoreSilentSwitch="ignore"
          onReadyForDisplay={onMediaLoadEnd}
          onError={onMediaLoadError}
        />
      )}
      <PressableOpacity style={styles.closeButton} onPress={navigation.goBack}>
        <IonIcon name="close" size={35} color="white" style={styles.icon} />
      </PressableOpacity>

      <PressableOpacity
        style={styles.saveButton}
        onPress={onSavePressed}
        disabled={savingState !== 'none'}>
        {savingState === 'none' && (
          <IonIcon
            name="download"
            size={35}
            color="white"
            style={styles.icon}
          />
        )}
        {savingState === 'saved' && (
          <IonIcon
            name="checkmark"
            size={35}
            color="white"
            style={styles.icon}
          />
        )}
        {savingState === 'saving' && <ActivityIndicator color="white" />}
      </PressableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
  },
  saveButton: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    width: 40,
    height: 40,
  },
  icon: {
    textShadowColor: 'black',
    textShadowOffset: {
      height: 0,
      width: 0,
    },
    textShadowRadius: 1,
  },
});
