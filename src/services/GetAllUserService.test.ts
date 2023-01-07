import { getConnection } from 'typeorm';
import createConnection from '../database';
import { GetAllUserService } from './GetAllUserService';
import { FakeData } from '../utils/FakeData';

describe('GetAllUserService', () => {
    beforeAll(async () => {
        const connection = await createConnection();
        await connection.runMigrations
    })

    afterAll(async () => {
        const connection = getConnection();
        await connection.query('DELETE FROM users')
        await connection.close()
    })

    const fakeData = new FakeData();

    it('Must return all registered users', async()=> {

        await fakeData.execute()

        const expectedResponse = [
            {
                name: 'Some user',
                email: 'someuser@gmail.com',
            },
            {
                name: 'Another user',
                email: ''
            }
        ]

        const getAllUserService = new GetAllUserService();

        const result = await getAllUserService.execute();

        expect(result).toMatchObject(expectedResponse)
    })
})