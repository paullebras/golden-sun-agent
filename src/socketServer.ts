import net from 'net';
import { envConfig } from './config/envConfig';

const { BIZHAWK_SERVER_PORT: PORT, BIZHAWK_SERVER_HOST: HOST } = envConfig;

export function sendMessage(data: string) {
  const client = new net.Socket();
  client.connect(PORT, HOST, () => {
    console.log(`Connected to BizHawk server at ${HOST}:${PORT}`);
    client.write(data + '\r\n');
  });

  client.on('data', (data) => {
    console.log('Received:', data.toString());
    client.destroy();
  });

  client.on('error', (err) => {
    console.error('Socket error:', err);
    client.destroy();
  });

  client.on('close', () => {
    console.log('Connection closed');
  });
}
