import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment';

export default ({ mode }: { mode: string }) => {
    // eslint-disable-next-line no-undef
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return defineConfig({
        plugins: [react(), tsconfigPaths(), EnvironmentPlugin('all')],
        server: {
            watch: {
                usePolling: true,
            },
            host: true, // needed for the Docker Container back
            strictPort: true,
            port: 3000, // any port
        },
    });
};
