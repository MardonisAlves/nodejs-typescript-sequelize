import request from 'supertest';
import app from '../../server/server';
import { expect, describe, it, beforeEach} from '@jest/globals';
import User from '../../server/models/user';
import * as HTTPStatus from 'http-status';
import * as jwt from 'jwt-simple';

describe('TESTE DE INTEGRAÇÂO', () => {
    'use strict'
    let token:any;
    const userDefault = {
        name: 'Usuario de Teste',
        email: 'email.default.com.br',
        password: 'teste'
    }

    // beforeEach((done) =>{
    //     const del = User.destroy({
    //         where:{}
    //     })
    //     .then(async () =>{
    //     const user = await User.create(userDefault);
    //     }).then(async (user:any) => {
    //         const res = await request(app)
    //             .post('/token')
    //             .send({email: 'email.default.com.br',   password: 'teste'})
    //             expect(res.status).toBe(HTTPStatus.OK);
    //             token = res.body.token;
                
            
    //     });
    // });

     describe('POST /api/users/create', () => {
        const user:any = {
            "user": {
                "name": "Usuario novo user de itergração",
                "email": "email.novo.com.br",
                "password": "teste123"
            }
        }

    describe('POST /token' , () =>{
        it('Deve retornar token' ,async () =>{
            const res = await request(app)
            .post('/token')
            .send({email: 'email.novo.com.br',   password: 'teste123'})
            expect(res.status).toBe(HTTPStatus.OK);
            token = res.body.token;
        });
    });
    
    describe('GET /api/users/all', () => {

        it('Deve retornar uma lista de usuarios', async () => {
            const res = await request(app)
                .get('/api/users/all')
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWT ${token}`)
            expect(res.status).toBe(HTTPStatus.OK);
            expect(res.body).not.toEqual(expect.arrayContaining([userDefault]));
        });

    });


    describe('GET /api/users/:id', () => {
        it('Deve retornar um usuario', async () => {
            const res = await request(app)
                .get(`/api/users/${412}`)
                 .set('Content-Type', 'application/json')
                .set('Authorization', `JWt ${token}`)
            expect(res.status).toBe(HTTPStatus.OK);
            expect(res.body).not.toEqual(expect.arrayContaining([userDefault]))
        });
    });

   

        it('Deve criar um novo user', async () => {
            const res = await request(app)
                .post('/api/users/create')
                .send(user)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWt ${token}`)
            expect(res.status).toBe(HTTPStatus.CREATED);
            expect(res.body).not.toEqual(expect.arrayContaining([user]));
        });
    });


    describe('PUT /api/users/:id/update', () => {
        const userUpdate:any = {
            name: 'Update tester',
            email: 'update@gmail.com' 
        }

        it('Deve atualizar um usuario', async () => {
            const res = await request(app)
                .put(`/api/users/${401}/update`)
                .send(userUpdate)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWt ${token}`)
            expect(res.status).toBe(HTTPStatus.OK);
            expect(res.body).not.toEqual(expect.arrayContaining([userUpdate]))
        });
    });
    
    describe('DELETE /api/users/:id', () => {
        const data = {
            data: 1

        }
        it('Deve deletar um usuario', async () => {
            const res = await request(app)
                .delete(`/api/users/${616}/destroy`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWt ${token}`)
            expect(res.status).toBe(HTTPStatus.OK);
            expect(res.body).toEqual(data);
        });
    });

});
