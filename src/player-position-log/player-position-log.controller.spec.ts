import { Test, TestingModule } from '@nestjs/testing';
import { PlayerPositionLogController } from './player-position-log.controller';

describe('PlayerPositionLogController', () => {
    let controller: PlayerPositionLogController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlayerPositionLogController],
        }).compile();

        controller = module.get<PlayerPositionLogController>(
            PlayerPositionLogController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
