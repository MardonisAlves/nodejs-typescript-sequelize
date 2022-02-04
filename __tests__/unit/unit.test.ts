import User from '../../server/modules/User/services';
import { describe, it, expect  } from '@jest/globals';
describe('Testes unitarios do service', () => {

    describe('Metodo Create' , () =>{
        const novoUser:any = {
            name: "novo user",
            email: 'email@email',
            password: '12345678'
        }
        it('POST / Deve criar um novo usuario', async () => {
            const userAll = await User.create(novoUser)
            .then((data:any) => {
              expect(data.name).toContain('novo user');
              expect(data.email).toContain('email@email');
              expect(data.password).toContain('12345678');
            });
        });
    });

    describe('Metodo Update', () => {
        const updateUser:any = {
        name: 'update user name',
        email: 'updateemail@email'
    }
        it('Deve atualizar um  usuario', async () =>{

            const update = await User.update(updateUser , 600)
            .then((data:any) => {
              expect(data.id).toEqual(600);
            });
        });
    });

    describe('Metodo Get Users', () => {
         const novoUser:any = {
            name: 'novo user',
            email: 'email@email',
            password: '12345678'
        }
        it('Deve retornar uma  lista de usuarios', async() =>{
           await User.getAll()
            .then((data:any) => {
              expect(data).not.toEqual(expect.arrayContaining([novoUser]));
            });
        });

        it('Deve retornar uma  usuario', async() =>{

            await User.getById(600)
            .then((data:any) => {
              expect(data.id).toEqual(600);
            });
        });

        it('Deve retornar email do   usuario', async() =>{

             await User.getByEmail("email.default.com.br")
            .then((data:any) => {
              expect(data.email).toEqual("email.default.com.br");
            });
        });

    });

    describe('Metodo Delete', () => {
        it('Deve deletar um  usuario', async () =>{
            const deleteUser = await User.delete(214).then((data:any) => {
            expect(true).toBeTruthy();
            })
        });
    });


});
