const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './src/**/*.vue',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.html',
  ],
  extend: {
    animation: ['motion-safe', 'motion-reduce'],
  },
  theme: {
    fontFamily: {
      'serif': ['IRANSans']
    },
    fonSize: {
      xxs: "0.6rem"
    },
    colors: {
      white: '#F5F5F5',
      red: "#FF0000",
      'red-900' : '#c00000',
      black:'#252526',
      gray: '#6f737c',
      'gray-100': '#EBE8F3',
      'gray-200': '#e0daee',
      'gray-300': '#535252',
      green: '#01B182',
      'green-100': '#c7f6e8',
      'green-200': '#e0daee',
      'green-300': '#3f967f',
      'green-400': '#92d050',
      'green-900': '#00b050',
      blue: '#332A7C',
      blueLight: '#332A7C',
      yellow: '#ffff00',
      orange: '#ffc000'
    },
    textColor: {
      white: '#F8F8F8',
      black:'#23262B',
      gray: '#6f737c',
      'gray-100': '#EBE8F3',
      'gray-200': '#e0daee',
      'gray-300': '#535252',
      green: '#56b99c',
      blue: '#332A7C',
      red: '#ff0000'
    },
    backgroundColor: {
      white: '#FFFFFF',
      red: "#FF0000",
      'red-900' : '#c00000',
      black:'#252526',
      gray: '#6f737c',
      'gray-100': '#EBE8F3',
      'gray-200': '#e0daee',
      'gray-300': '#535252',
      green: '#01B182',
      'green-100': '#c7f6e8',
      'green-200': '#75C6AE',
      'green-300': '#3f967f',
      'green-400': '#92d050',
      'green-900': '#00b050',
      blue: '#332A7C',
      'blue-100': '#e0daee',
      blueLight: '#38475a',
      yellow: '#ffff00',
      orange: "#FFA000",
      'orange-100': "#fcc66b",
      'orange-200': "#ffc000"
    },
  }
}
