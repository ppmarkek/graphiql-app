import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: env.VITE_ROUTER_BASEPATH,
    define: {
      'process.env.VITE_ROUTER_BASEPATH': JSON.stringify(
        env.VITE_ROUTER_BASEPATH
      ),
      'process.env.REACT_APP_API_KEY': JSON.stringify(env.REACT_APP_API_KEY),
      'process.env.REACT_APP_AUTH_DOMAIN': JSON.stringify(
        env.REACT_APP_AUTH_DOMAIN
      ),
      'process.env.REACT_APP_PROJECT_ID': JSON.stringify(
        env.REACT_APP_PROJECT_ID
      ),
      'process.env.REACT_APP_STORAGE_BUCKET': JSON.stringify(
        env.REACT_APP_STORAGE_BUCKET
      ),
      'process.env.REACT_APP_MESSAGING_SENDER_ID': JSON.stringify(
        env.REACT_APP_MESSAGING_SENDER_ID
      ),
      'process.env.REACT_APP_APP_ID': JSON.stringify(env.REACT_APP_APP_ID),
      'process.env.REACT_APP_MEASUREMENT_ID': JSON.stringify(
        env.REACT_APP_MEASUREMENT_ID
      ),
      'process.env.REACT_APP_DEFAULT_GQL_API': JSON.stringify(
        env.REACT_APP_DEFAULT_GQL_API
      ),
    },
    plugins: [
      react({
        babel: {
          plugins: [
            [
              'babel-plugin-styled-components',
              {
                displayName: true,
                fileName: false,
              },
            ],
          ],
        },
      }),
      {
        name: 'configure-response-headers',
        configureServer: (server) => {
          server.middlewares.use((_req, res, next) => {
            res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
            res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
            next();
          });
        },
      },
    ],
  };
});
