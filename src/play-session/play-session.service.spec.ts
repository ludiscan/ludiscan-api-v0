import { Test, TestingModule } from '@nestjs/testing';
import { PlaySessionService } from './play-session.service';

describe('PlaySessionService', () => {
  let service: PlaySessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaySessionService],
    }).compile();

    service = module.get<PlaySessionService>(PlaySessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
