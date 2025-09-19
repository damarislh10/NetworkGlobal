var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment';
export default (function (_a) {
    var mode = _a.mode;
    // eslint-disable-next-line no-undef
    process.env = __assign(__assign({}, process.env), loadEnv(mode, process.cwd()));
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
});
