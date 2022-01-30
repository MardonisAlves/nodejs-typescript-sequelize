import * as http from 'http';
import Api from './api/api';


const server = http.createServer(Api);

const  port = 3000
server.listen(port , () => console.log(`O server está na port ${port}`))
server.on('error' , () => (error: NodeJS.ErrnoException) => console.log(`Ocorreu um erro: ${Error}`))
export default  server