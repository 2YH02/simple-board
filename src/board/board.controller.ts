import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('board')
@ApiTags('Board')
export class BoardController {
  constructor(private readonly boardSevice: BoardService) {}

  @Get()
  findAll() {
    return this.boardSevice.findAll();
  }

  @Get(':id')
  find(@Param('id', ParseIntPipe) id: number) {
    return this.boardSevice.find(id);
  }

  @Post()
  create(@Body(new ValidationPipe()) data: CreateBoardDto) {
    return this.boardSevice.create(data);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) data: UpdateBoardDto,
  ) {
    return this.boardSevice.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardSevice.delete(id);
  }
}
