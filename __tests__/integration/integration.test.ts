import request from 'supertest';
import app from '../../server/server';
import { expect, describe, it, beforeEach} from '@jest/globals';
import User from '../../server/models/user';
import * as HTTPStatus from 'http-status';
import * as jwt from 'jwt-simple';

describe('TESTE DE INTEGRAÇÂO', () => {
    'use strict'
    let token:any;
    let id:any;
    
    const userDefault:any = {
        "user": {
            "name": "Usuario novo user de itergração",
            "email": "email.default.com.br",
            "password": "teste"
        }
    }


     describe('POST / create user e get token', () => {
        it('Deve criar um novo user', async () => {
            const res = await request(app)
                .post('/api/users/create')
                .send(userDefault)
            expect(res.status).toBe(HTTPStatus.CREATED);
            expect(res.body).not.toEqual(expect.arrayContaining([userDefault]));
            id = res.body.data.id

        });

        it('Deve retornar token' ,async () =>{
            const res = await request(app)
            .post('/token')
            .send({email: 'email.default.com.br',   password: 'teste'})
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
                .get(`/api/users/${id}`)
                 .set('Content-Type', 'application/json')
                .set('Authorization', `JWt ${token}`)
            expect(res.status).toBe(HTTPStatus.OK);
            expect(res.body).not.toEqual(expect.arrayContaining([userDefault]));
        });
   });




    describe('PUT /api/users/:id/update', () => {
        const userUpdate:any = {
            name: 'Update tester',
            email: 'email.default.com.br' 
        }

        it('Deve atualizar um usuario', async () => {
            const res = await request(app)
                .put(`/api/users/${id}/update`)
                .send(userUpdate)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWt ${token}`)
            expect(res.status).toBe(HTTPStatus.OK);
            expect(res.body).not.toEqual(expect.arrayContaining([userUpdate]))
        });
    });
    


    describe('DELETE /api/users/:id', () => {
        const data = { data: 1 }
        it('Deve deletar um usuario', async () => {
            const res = await request(app)
                .delete(`/api/users/${id}/destroy`)
                .set('Content-Type', 'application/json')
                .set('Authorization', `JWt ${token}`)
            expect(res.status).toBe(HTTPStatus.OK);
            expect(res.body).toEqual(data);
        });
    });

});
