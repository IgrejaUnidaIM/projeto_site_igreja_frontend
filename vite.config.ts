import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// Função para modificar os arquivos CSS gerados
const modifyCssPlugin = () => {
  return {
    name: 'modify-css-plugin',
    writeBundle(options, bundle) {
      // Processa os arquivos após o build
      Object.keys(bundle).forEach(fileName => {
        if (fileName.endsWith('.css')) {
          const filePath = path.join(options.dir || 'dist', fileName);
          if (fs.existsSync(filePath)) {
            let cssContent = fs.readFileSync(filePath, 'utf-8');
            
            // Adiciona regras de sobrescrita no final do arquivo CSS
            cssContent += `
              /* Sobrescritas para header e footer */
              header, .header {
                background-color: #1a365d !important;
                color: white !important;
              }
              
              footer, .footer {
                background-color: #1a365d !important;
                color: white !important;
              }
              
              .dark header, .dark .header {
                background-color: #1a202c !important;
              }
              
              .dark footer, .dark .footer {
                background-color: #1a202c !important;
              }
              
              /* Outras sobrescritas necessárias */
              .bg-blue-950 {
                background-color: #1a365d !important;
              }
              
              .dark .bg-slate-900 {
                background-color: #0f172a !important;
              }
            `;
            
            fs.writeFileSync(filePath, cssContent);
          }
        }
      });
    }
  };
};

export default defineConfig({
  plugins: [
    react(),
    modifyCssPlugin() // Adiciona o plugin personalizado
  ],
  server: {
    port: 5123,
  },
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.name ? assetInfo.name.split('.') : [];
          const ext = fileName.length > 0 ? fileName[fileName.length - 1] : '';
          
          if (/png|jpe?g|gif|tiff|bmp|svg/i.test(ext)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
