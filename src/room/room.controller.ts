import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from '../db/schemas/Room';
import { roomDuration } from 'src/types/roomDuration';

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('rooms')
  @HttpCode(HttpStatus.OK)
  async getRooms(): Promise<Room[]> {
    return this.roomService.getRooms();
  }

  @Post('room')
  @HttpCode(HttpStatus.CREATED)
  async postRoom(
    @Body()
    requestBody: {
      roomName: string;
      chatPrivate: boolean;
      listed: boolean;
      duration: roomDuration;
    },
    @Request() request: any,
  ) {
    const { chatPrivate, duration, listed, roomName } = requestBody;
    const creator = request.user;
    console.log(request, 'ADJKADSJKASD');
    return this.roomService.postRoom(
      roomName,
      creator,
      chatPrivate,
      listed,
      duration,
    );
  }
}
