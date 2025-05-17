import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.clubpratibimb.twa',
  appName: 'Pratibimb',
  webDir: 'dist',
  server: {
    // Critical for Android/iOS network requests
    hostname: 'www.clubpratibimb.com', // Your production domain
    androidScheme: 'https',
   allowNavigation: [
      'pratibimb-backend.vercel.app', // Your backend domain
      'localhost', // For development
      '10.0.2.2' // Android emulator to localhost
    ]
  },
  plugins: {
    CapacitorHttp: {
      enabled: true // Enable native HTTP requests
    },
    SplashScreen: {
      launchShowDuration: 0, // Hide splash screen immediately
      androidSpinnerStyle: 'large', // Use large spinner on Android
      androidScaleType: 'CENTER_CROP', // Scale type for splash image
      showSpinner: true, // Show spinner
      backgroundColor: '#ffffff', // Background color of splash screen
      androidSplashResourceName: 'splash', // Name of the splash image resource
    },
     FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"]
    }
  }
};

export default config;
