import { AuthModule } from '@controllers/auth/auth.module';
import { HealthModule } from '@controllers/health/health.module';
import { UsersModule } from '@controllers/users/users.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestLoggerMiddleware } from './middleware/request-logger/request-logger.middleware';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [HealthModule, AuthModule, PrismaModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // Setup middleware functions here
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
