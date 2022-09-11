import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromotionModule } from './modules/promotion/promotion.module';
import { PromotionCategoryModule } from './modules/promotion-category/promotion-category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { RouterModule } from '@nestjs/core';
import { routes } from './app.routes';
import { LoggerMiddleware } from './utils/logger.middleware';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: process.env.MYSQL_USERNAME,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DB,
                // should avoid using synchronize in production environment
                synchronize: process.env.ENVIRONMENT === 'development' || true,
                autoLoadEntities: true,
                entities: [
                    join(__dirname, '..', 'modules', '**', '*.entity.{ts,js}'),
                ],
                migrations: [join(__dirname, '..', 'migrations', '*.ts')],
            }),
        }),
        PromotionModule,
        PromotionCategoryModule,
        RouterModule.register(routes),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('api');
    }
}
