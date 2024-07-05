import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/controllers/auth/auth.module';
import { HealthModule } from './modules/controllers/health/health.module';
import { UsersModule } from './modules/controllers/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [HealthModule, AuthModule, PrismaModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
