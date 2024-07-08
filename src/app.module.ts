import { AuthModule } from '@controllers/auth/auth.module';
import { HealthModule } from '@controllers/health/health.module';
import { UsersModule } from '@controllers/users/users.module';
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './error-handling/http-exception.filter';
import { KnownErrorInterceptor } from './error-handling/known-error.interceptor';
import { RequestLoggerMiddleware } from './middleware/request-logger.middleware';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [HealthModule, AuthModule, PrismaModule, UsersModule],
  controllers: [AppController],
  providers: [
    Logger,
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: KnownErrorInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
