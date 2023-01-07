import { getConnection } from 'typeorm';
import createConnection from '../database';
import { v4 as uuid } from 'uuid'
import { CreateUserService } from './CreateUserService';

describe('CreateUserService', () =>{
    beforeAll(async()=>{
        const connection = await createConnection();
        await connection.runMigrations();
    })

    afterAll(async()=>{
        const connection = getConnection();
        await connection.query('DELETE FROM users')
        await connection.close();
    })

    it('It should return the created user id', async()=>{
        const createUserService = new CreateUserService();

        const result = await createUserService.execute({
            id: uuid(),
            name: 'Some user',
            email: 'email@user.com'
        })

        expect(result).toHaveProperty('id')
    })
})
