# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
🛠️ Proyecto Final POO - Interfaz Técnica
📚 Tecnologías utilizadas
Este proyecto fue desarrollado con:

⚛️ React

⚡ Vite – para desarrollo rápido y liviano

🎨 Tailwind CSS – para estilos utilitarios

🧩 MUI (Material UI) – librería de componentes UI

✅ Requisitos previos
Antes de empezar, asegurate de tener instalado lo siguiente en tu sistema:

Node.js (recomendado: versión 18 o superior)

npm (viene incluido con Node.js)

Podés verificar si están instalados ejecutando:

bash
Copiar
Editar
node -v
npm -v
🚀 Instalación y ejecución del proyecto
Cloná el repositorio:

bash
Copiar
Editar
git clone https://github.com/Brian-Ache/tp-final-poo.git
Ingresá al directorio del proyecto:

bash
Copiar
Editar
cd tp-final-poo
Instalá las dependencias:
(Solo necesario la primera vez)

bash
Copiar
Editar
npm install
Iniciá el servidor de desarrollo:

bash
Copiar
Editar
npm run dev
Abrí tu navegador y accedé al enlace que aparece en la consola, generalmente algo como:

arduino
Copiar
Editar
http://localhost:5173/