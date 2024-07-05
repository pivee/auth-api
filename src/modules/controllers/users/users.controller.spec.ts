import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have create', () => {
    expect(controller.create).toBeDefined();
  });

  it('should have findAll', () => {
    expect(controller.findAll).toBeDefined();
  });

  it('should have findOne', () => {
    expect(controller.findOne).toBeDefined();
  });

  it('should have update', () => {
    expect(controller.update).toBeDefined();
  });

  it('should have remove', () => {
    expect(controller.remove).toBeDefined();
  });
});
