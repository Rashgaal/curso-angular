

const { writeFileSync, mkdirSync } = require('fs');  // file system

//leer variables de entorno
require('dotenv').config();
//definir los paths
const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';
//leemos la variable de entorno del env
const mapboxkey = process.env['MAPBOX_KEY'];
//si no existe lanzamos error
if (!mapboxkey) {
  throw new Error('MAPBOX_KEY is not set,')
}
//contenido del archivo
const envFileContent = `
export const environment = {
  mapboxKey : "${mapboxkey}"
};
`


mkdirSync('./src/environments', { recursive: true });
//se creara en estos dos paths
writeFileSync(targetPath, envFileContent)
writeFileSync(targetPathDev, envFileContent)
