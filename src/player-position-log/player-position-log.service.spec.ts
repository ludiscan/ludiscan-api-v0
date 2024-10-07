import { Test, TestingModule } from '@nestjs/testing';
import { PlayerPositionLogService } from './player-position-log.service';

describe('PlayerPositionLogService', () => {
    let service: PlayerPositionLogService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PlayerPositionLogService],
        }).compile();

        service = module.get<PlayerPositionLogService>(
            PlayerPositionLogService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
