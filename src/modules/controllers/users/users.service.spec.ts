import { PrismaService } from '@modules/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have findAll defined', () => {
    expect(service.findAll).toBeDefined();
  });

  it('should have findOne defined', () => {
    expect(service.findOne).toBeDefined();
  });

  it('should have create defined', () => {
    expect(service.create).toBeDefined();
  });

  it('should have update defined', () => {
    expect(service.update).toBeDefined();
  });

  it('should have remove defined', () => {
    expect(service.remove).toBeDefined();
  });
});
