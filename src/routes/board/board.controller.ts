import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserInfo } from 'src/decorators/user-info.decorator';
import { BoardService } from './board.service';
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
  @UseGuards(JwtAuthGuard)
  create(@UserInfo() userInfo, @Body('content') content: string) {
    if (!userInfo) throw new UnauthorizedException();

    return this.boardSevice.create({
      userId: userInfo.id,
      content,
    });
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @UserInfo() userInfo,
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) data: UpdateBoardDto,
  ) {
    return this.boardSevice.update(userInfo.id, id, data);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@UserInfo() userInfo, @Param('id', ParseIntPipe) id: number) {
    return this.boardSevice.delete(userInfo.id, id);
  }
}
