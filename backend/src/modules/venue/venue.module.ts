import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../email/email.module';
import { FileStorageModule } from '../file-storage/file-storage.module';
import { VenueService } from './services/venue.service';
import { VenueController } from './venue.controller';

@Module({
  imports: [AuthModule, EmailModule, FileStorageModule],
  controllers: [VenueController],
  providers: [VenueService],
  exports: [VenueService],
})
export class VenueModule {}
