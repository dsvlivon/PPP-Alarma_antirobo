import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.relevamiento_visual',
  appName: 'relevamiento_visual',
  webDir: 'www',
  bundledWebRuntime: false,
  "plugins": {
    "Camera":{}
  }
};

export default config;
