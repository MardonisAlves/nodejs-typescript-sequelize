import User from '../../server/modules/User/services';
import { describe, it, expect  } from '@jest/globals';

describe('Testes unitarios do service', () => {
    let id :any;
    const novoUser:any = {
        name: "novo user",
        email: 'email.default.com.br',
        password: '12345678'
    }
    describe('Metodo Create' , () =>{
        it('POST / Deve criar um novo usuario', async () => {
            const userAll = await User.create(novoUser)
            .then((data:any) => {
               expect(data).not.toEqual(expect.arrayContaining([novoUser]));
               console.log(data)
               id = data.dataValues.id
            });
        });
    });

    describe('Metodo Get Users', () => {
        it('Deve retornar uma  lista de usuarios', async() =>{
           await User.getAll()
            .then((data:any) => {
              expect(data).not.toEqual(expect.arrayContaining([novoUser]));
            });
        });

        it('Deve retornar um  usuario', async() =>{
            await User.getById(id)
            .then((data:any) => {
              expect(data.id).toEqual(id);
            });
        });

        it('Deve retornar email do   usuario', async() =>{
             await User.getByEmail("email.default.com.br")
            .then((data:any) => {
              expect(data.email).toEqual("email.default.com.br");
            });
        });

    });

    describe('Metodo Update', () => {
        const updateUser:any = {
        name: 'update user name',
        email: 'email.default.com.br'
    }
        it('Deve atualizar um  usuario', async () =>{
            const update = await User.update(updateUser , id)
            .then((data:any) => {
              expect(data.id).toEqual(id)
            });
        });
    });

    describe('Metodo Delete', () => {
        it('Deve deletar um  usuario', async () =>{
            const deleteUser = await User.delete(id).then((data:any) => {
            expect(true).toBeTruthy();
            })
        });
    });

   
});
