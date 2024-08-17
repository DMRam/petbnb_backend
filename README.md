# Para ejecutar este backend deben:
> unzip the file
> Abrir el archivo en VS code
> Verificar que están el la mismo directorio que package.json

* Si el projecto viene desde un archivo zip y no desde GitHub propbablemente no sea necesario este paso ya que la carpeta node_modules está incluida dentro del proyecto

> ejecutar 
"npm install"
"npm install -g nodemon" 

* Este proyecto usa variables de entorno en el archivo .env si este archivo no se encuentra dentro del proyecto, deberán agregarlo al directorio raíz (mismo nivel de package.json)

> cambiar la configuracion de COORS 
    . comentar en models/server.js desde la línea 33 hasta la linea 53 - también la línea 56 y habilitar la linea 57 "> this.app.use(cors())" --- GUARDAR LOS CAMBIOS

> Finalmente ejecutar "nodemon app" para usar el backend 

