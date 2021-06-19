const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './src/**/*.vue',
    './src/**/*.js',
    './src/**/*.jsx',
    './src/**/*.html',
  ],
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
      black:'#252526',
      gray: '#f8f8f8',
      'gray-100': '#e0e2e4',
      'gray-200': '#3c3c3c',
      'gray-300': '#535252',
      green: '#01B182',
      'green-100': '#c7f6e8',
      'green-200': '#75C6AE',
      'green-300': '#3f967f',
      blue: '#2e3f51',
      blueLight: '#38475a'
    },
    textColor: {
      white: '#F8F8F8',
      black:'#23262B',
      gray: '#3c3c3c',
      'gray-100': '#e0e2e4',
      'gray-200': '#3c3c3c',
      'gray-300': '#535252',
      green: '#56b99c',
      blue: '#2e3f51',
      red: '#ff0000'
    },
    backgroundColor: {
      white: '#FFFFFF',
      red: "#FF0000",
      black:'#252526',
      gray: '#6f737c',
      'gray-100': '#EBE8F3',
      'gray-200': '#e0daee',
      'gray-300': '#535252',
      green: '#01B182',
      'green-100': '#c7f6e8',
      'green-200': '#75C6AE',
      'green-300': '#3f967f',
      blue: '#332A7C',
      blueLight: '#38475a',
      orange: "#FFA000",
      'orange-100': "#fcc66b"
    },
  }
}
