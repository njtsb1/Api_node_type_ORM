import { CreateUserService } from '../services/CreateUserService';
import { v4 as uuid } from 'uuid';

class FakeData{
    createUserService = new CreateUserService();

    async execute(){
        await this.createUserService.execute({
            id: uuid(),
            name: 'Some user',
            email: 'someuser@gmail.com',
        })

        await this.createUserService.execute({
            id: uuid(),
            name: 'Another user',
            email: 'anotheruser@gmail.com',
        })
    }

    async createUser(){
        const user = await this.createUserService.execute({
            id: uuid(),
            name: 'Some user',
            email: 'someuser@gmail.com',
        })

        return user
    }
}

export { FakeData }
