## Get started

1. Install dependencies for backend and frontend separately.

   ```bash
   npm install
   ```

2. Start the FrontEnd app

   ```bash
   npx expo start
   ```

3. To run backend 

   ```bash
   npm run start
   ```

4. You need to connect your own PostgreSQL database within .env or use environment variable from the message;
5. To check registration forms from your Expo App you may need to edit the 
const CLIENT_REGISTER_URL = 'http://192.168.1.130:3003/users/client';
and insert your IP address (Metro or one from the IP config)