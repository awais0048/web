import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';



@Module({
  controllers: [AuthController],  // Important: Register the controller here
  providers: [AuthService],
  imports: [DatabaseModule,

  ],  // Important: Register the database module here
})
export class AuthModule { }
