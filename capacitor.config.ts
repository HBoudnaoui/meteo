import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.meteohamid',
  appName: 'meteohamid',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
