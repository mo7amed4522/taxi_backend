import { FirebaseAdminModule } from '@aginix/nestjs-firebase-admin';
import { Module } from '@nestjs/common';
import { DriverNotificationService } from './driver-notification.service';
import { RiderNotificationService } from './rider-notification.service';
import * as admin from 'firebase-admin';
import { existsSync, promises as fs } from 'fs';
import { Logger } from '@nestjs/common';

async function getFirebaseConfig() {
  const configAddress = `${process.cwd()}/config/config.${process.env.NODE_ENV}.json`;
  if (existsSync(configAddress)) {
    const file = await fs.readFile(configAddress, { encoding: 'utf-8' });
    const config = JSON.parse(file as string);
    const firebaseKeyFileAddress = `${process.cwd()}/config/${config.firebaseProjectPrivateKey}`;
    if (config.firebaseProjectPrivateKey != null && existsSync(firebaseKeyFileAddress)) {
      return {
        credential: admin.credential.cert(firebaseKeyFileAddress),
      };
    }
  }
  return null;
}

@Module({
  imports: [
    FirebaseAdminModule.forRootAsync({
      useFactory: async () => {
        const config = await getFirebaseConfig();
        if (!config) {
          Logger.warn('Firebase configuration not found, notifications will be disabled');
          return {
            credential: admin.credential.applicationDefault(),
          };
        }
        return config;
      },
    }),
  ],
  providers: [DriverNotificationService, RiderNotificationService],
  exports: [DriverNotificationService, RiderNotificationService],
})
export class FirebaseNotificationModule {}
