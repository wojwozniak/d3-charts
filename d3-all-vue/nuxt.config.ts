export default function defineNuxtConfig() {
  return {
    css: [
      '@/assets/css/main.css',
    ],

    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
    
    build: {
      loaders: {
        scss: {
          implementation: require('sass'),
          sassOptions: {
            indentedSyntax: true
          },
          modules: true
        }
      }
    }
  }
}