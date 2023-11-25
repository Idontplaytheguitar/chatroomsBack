import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configdb from './db/config';
import { Room, RoomSchema } from './db/schemas/Room';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(configdb()),
    MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
