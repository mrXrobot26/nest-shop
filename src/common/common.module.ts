import { Module } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [],
  providers: [AuthGuard],
  exports: [AuthGuard],
})
export class CommonModule {}
