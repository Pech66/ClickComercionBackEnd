// src/service/resend/resend.module.ts
import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [MailModule,ResendModule],
  providers: [VerificationService],
  exports: [VerificationService],
})
export class ResendModule {}
