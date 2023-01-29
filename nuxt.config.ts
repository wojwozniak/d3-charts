export default function defineNuxtConfig() {
  return {
    target: 'static',
    router: {
      base: '/d3-collection/'
    },
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