import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';

@Controller('board')
@ApiTags('Board')
export class BoardController {
  constructor(private readonly boardSevice: BoardService) {}
  @Get()
  findAll() {
    return this.boardSevice.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.boardSevice.find(Number(id));
  }

  @Post()
  create(@Body() data) {
    return this.boardSevice.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data) {
    return this.boardSevice.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.boardSevice.delete(Number(id));
  }
}
