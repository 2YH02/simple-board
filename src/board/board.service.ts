import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  private boards = [
    { id: 1, title: 'hello 1', content: 'content 1' },
    { id: 2, title: 'hello 2', content: 'content 2' },
    { id: 3, title: 'hello 3', content: 'content 3' },
    { id: 4, title: 'hello 4', content: 'content 4' },
    { id: 5, title: 'hello 5', content: 'content 5' },
    { id: 6, title: 'hello 6', content: 'content 6' },
    { id: 7, title: 'hello 7', content: 'content 7' },
    { id: 8, title: 'hello 8', content: 'content 8' },
    { id: 9, title: 'hello 9', content: 'content 9' },
    { id: 10, title: 'hello 10', content: 'content 10' },
  ];

  findAll() {
    return this.boards;
  }

  find(id: number) {
    const index = this.getBoardId(id);
    return this.boards[index];
  }

  create(data) {
    const newBoard = { id: this.getNextId(), ...data };
    this.boards.push(newBoard);
    return newBoard;
  }

  update(id: number, data) {
    const index = this.getBoardId(id);
    if (index > -1) {
      this.boards[index] = {
        ...this.boards[index],
        ...data,
      };

      return this.boards[index];
    }

    return null;
  }

  delete(id: number) {
    const index = this.getBoardId(id);

    if (index > -1) {
      const deleteBoard = this.boards[index];
      this.boards.splice(index, 1);
      return deleteBoard;
    }

    return null;
  }

  getBoardId(id: number) {
    return this.boards.findIndex((board) => board.id === id);
  }

  getNextId() {
    return this.boards.sort((a, b) => b.id - a.id)[0].id + 1;
  }
}
