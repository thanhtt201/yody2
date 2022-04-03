import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { typeOrmConfig } from './configs/database/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
