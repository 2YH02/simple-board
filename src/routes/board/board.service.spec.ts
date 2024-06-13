import { Test, TestingModule } from '@nestjs/testing';
import { Board } from 'src/entity/board.entity';
import { Repository } from 'typeorm';
import { BoardService } from './board.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BoardService', () => {
  let boardService: BoardService;
  let boardRepository: Repository<Board>;
  const boardRepositoryToken = getRepositoryToken(Board);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoardService,
        {
          provide: boardRepositoryToken,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findOen: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    boardService = module.get<BoardService>(BoardService);
    boardRepository = module.get<Repository<Board>>(boardRepositoryToken);
  });

  it('boardService should be defined', () => {
    expect(boardService).toBeDefined();
  });

  it('boardRepository should be defined', () => {
    expect(boardRepository).toBeDefined();
  });

  describe('게시글 조회', () => {
    it('2번 게시글의 작성자는 yong이다', async () => {
      jest.spyOn(boardRepository, 'findOneBy').mockResolvedValue({
        id: 1,
        userId: 2,
        content: '게시글',
        user: {
          id: 2,
          username: 'yong',
          name: 'yong',
        },
      } as Board);
      const board = await boardService.getBoardById(2);

      expect(board.user.name).toBe('yong');
    });
  });
});
