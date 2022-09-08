import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromotionModule } from './modules/promotion/promotion.module';
import { PromotionCategoryModule } from './modules/promotion-category/promotion-category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfiguration from './config/db.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [dbConfiguration],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                ...configService.get('database'),
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
