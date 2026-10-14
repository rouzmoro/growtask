import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'https://growtask.ru/test-front',
                changeOrigin: true,
                secure: true,
            }
        }
    }
})