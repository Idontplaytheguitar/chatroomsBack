import { Controller, Get } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from '../db/schemas/Room';

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get('Rooms')
  getRooms(): Promise<Room[]> {
    return this.roomService.getRooms();
  }
}
