import { getConnection } from 'typeorm';
import createConnection from '../database'
import { CreateUserController } from './CreateUserController';
import { Request } from 'express'
import { makeMockResponse } from '../utils/mocks/mockResponse';

describe('CreateUserController', () => {
    beforeAll(async () => {
        const connection = await createConnection()
        await connection.runMigrations()
    })

    afterAll(async () => {
        const connection = getConnection()
        await connection.query('DELETE FROM users')
        await connection.close()
    })

    const createUserController = new CreateUserController();

    const response = makeMockResponse()
    it('Should return status 201 when user is created', async()=>{
        const request = {
            body: {
                name: 'Some user',
                email: 'email@email.com'
            }
        } as Request

        await createUserController.handle(request, response)

        expect(response.state.status).toBe(201)
    })

    it('Should return status 400 when the name is not informed', async() => {
        const request = {
            body: {
                name: '',
                email: 'email@email.com'
            }
        } as Request

        await createUserController.handle(request, response)

        expect(response.state.status).toBe(400)
    })

    it('Should return status 201 when email is not informed', async() => {
        const request = {
            body: {
                name: 'Some user',
                email: ''
            }
        } as Request

        await createUserController.handle(request, response)

        expect(response.state.status).toBe(201)
    })
    
})
