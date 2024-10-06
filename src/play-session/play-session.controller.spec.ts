import { Test, TestingModule } from '@nestjs/testing';
import { PlaySessionController } from './play-session.controller';

describe('PlaySessionController', () => {
    let controller: PlaySessionController;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PlaySessionController],
        }).compile();

        controller = module.get<PlaySessionController>(PlaySessionController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
