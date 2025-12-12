import { GoogleSignin } from '@react-native-google-signin/google-signin';

// TODO: Replace with your actual Web Client ID from Google Cloud Console
// Get it from: https://console.cloud.google.com/apis/credentials?project=church-gps
// Use the "Web application" OAuth 2.0 Client ID (not Android or iOS client ID)
const WEB_CLIENT_ID = '415886254123-e2i0ca6c4kvcsiu8221ijcbqo9p9j673.apps.googleusercontent.com';

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    offlineAccess: true, // if you need server-side access
    forceCodeForRefreshToken: true, // recommended for backend token verification
  });
};
