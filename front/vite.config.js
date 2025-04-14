import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite acesso externo
    port: 3000, // Porta que o Vite vai usar
    strictPort: true, // Se a porta estiver em uso, não tenta usar outra
    cors: true,
  },
  build: {
    outDir: 'dist', // Diretório de saída para os arquivos buildados
    emptyOutDir: true, // Limpa o diretório de saída antes de construir
  },
});