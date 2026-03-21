import { forwardRef, Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { MessageController } from './message.controller';
import { MessageService } from './services/message.service';

@Module({
  imports: [forwardRef(() => AuthModule)],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
