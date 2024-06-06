import {PermissionsAndroid, Platform} from 'react-native';

export const getPremissionToReadImages = async () => {
  if (Platform.OS === 'android') {
    const premissionRes = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ]);
  }
};
