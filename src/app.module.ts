import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PakistanBoundryModule } from './pakistan_boundry/pakistan_boundry.module';
import { PakistanProvincesModule } from './pakistan_provinces/pakistan_provinces.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { FacilityModule } from './facility/facility.module';
import { LevelModule } from './level/level.module';
import { UnitModule } from './unit/unit.module';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: false, // disable for safety
      }),
    }),
    PakistanBoundryModule,
    PakistanProvincesModule,
    UserModule,
    FacilityModule,
    LevelModule,
    UnitModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
