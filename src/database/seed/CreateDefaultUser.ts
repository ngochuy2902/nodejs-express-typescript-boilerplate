import { Seeder } from 'typeorm-seeding';
import { User } from '../../entity/user.entity';

export default class CreateDefaultUser implements Seeder {
  public async run(): Promise<any> {
    const users = await User.find();
    if (users.length) {
      return;
    }
    const admin = {
      id: 1,
      email: 'admin@localhost.com',
      password: '$2b$10$BSEVuhlYsMNn2tZnhQya4.fGEz6yfTmgcrvUZjlqvYLsagUMGnt8u',
      name: 'Admin',
      role: 'ADMIN',
      createdBy: 1,
      updatedBy: 1,
    } as User;
    await User.save(admin);

    const user: any = {
      id: 2,
      email: 'user@localhost.com',
      password: '$2b$10$BSEVuhlYsMNn2tZnhQya4.fGEz6yfTmgcrvUZjlqvYLsagUMGnt8u',
      name: 'User',
      role: 'USER',
      createdBy: 1,
      updatedBy: 1,
    } as User;
    await User.save(user);
  }
}
