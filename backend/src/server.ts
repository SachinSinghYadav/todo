import http from 'http';
import app from './app';

const PORT = process.env.PORT;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log('server is running');
});
