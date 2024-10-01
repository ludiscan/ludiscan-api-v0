import AppDataSource from '../data-source';
import { User } from '../entities/user.entity';

const seed = async () => {
    const dataSource = await AppDataSource.initialize();
    const userRepository = dataSource.getRepository(User);

    const users = [
        { firstName: 'John', lastName: 'Doe', isActive: true },
        { firstName: 'Jane', lastName: 'Doe', isActive: true },
    ];

    for (const userData of users) {
        if (
            await userRepository.findOne({
                where: {
                    name: userData.firstName,
                },
            })
        ) {
            continue;
        }
        const user = userRepository.create(userData);
        await userRepository.save(user);
    }

    console.log('Users have been seeded');
    await dataSource.destroy();
};

export default seed;
