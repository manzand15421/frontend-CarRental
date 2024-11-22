import {View} from 'react-native';
import {useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {GOOGLE_WEB_CLIENT_ID} from '@env';
import Button from './Button';
import {StyleSheet} from 'react-native';

GoogleSignin.configure({
  webClientId: GOOGLE_WEB_CLIENT_ID,
});

async function onGoogleButtonPress() {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const signInResult = await GoogleSignin.signIn();
  // Try the new style of google-sign in result, from v13+ of that module
  let idToken = signInResult.data?.idToken;

  if (!idToken) {
    throw new Error('No ID token found');
  }
  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(
    signInResult.data.idToken,
  );
  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

function onAuthStateChanged(user) {
  console.log('google', user);
  // if (initializing) setInitializing(false);
}

export default function GoogleButton() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
    });
    return subscriber;
  }, []);

  useEffect(() => {
    console.log('data user', user);
  }, [user]);

  const handleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess(); // Revoke akses Google
      await auth().signOut(); // Logout dari Firebase
      setUser(null); // Hapus data user
    } catch (error) {
      console.error('Error during logout: ', error);
    }
  };
  return (
    <View>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress}
        style={styles.ButtonContainer}
        // disabled={isInProgress}
      />
      <Button
        onPress={handleSignOut}
        style={styles.ButtonContainer}
        color="#3D7B3F"
        title="Log Out"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ButtonContainer: {
    alignSelf: 'center',
    width: '90%',
  },
});
