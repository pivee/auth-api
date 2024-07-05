import { AuthModule } from '@controllers/auth/auth.module';
import { HealthModule } from '@controllers/health/health.module';
import { UsersModule } from '@controllers/users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [HealthModule, AuthModule, PrismaModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
