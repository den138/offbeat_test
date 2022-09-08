import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromotionModule } from './modules/promotion/promotion.module';
import { PromotionCategoryModule } from './modules/promotion-category/promotion-category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/configuration';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [config],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: configService.get('MYSQL_USERNAME'),
                password: configService.get('MYSQL_PASSWORD'),
                database: configService.get('MYSQL_DB'),
                entities: [],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        PromotionModule,
        PromotionCategoryModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
