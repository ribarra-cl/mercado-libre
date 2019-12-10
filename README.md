# 0 Prequisitos
El proyecto se construyó usando **Docker** para levantar los contenedores de la aplicación y motor de BD, Asegurarse de tenerlo instalado.

# 1 Run

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

Puedes acceder a la aplicación a través del browser mediante la url http://localhost:8080/

# 2 Tests
Los tests pueden ser corridos instalando los paquetes localmente

```
npm install
npm test
```

Para correr la herramienta de **coverage** es necesario correr el siguiente comando:

```
npm install
npm run coverage
```

# 3 Producción
La aplicación se encuentra corriendo en una instacia EC2 en la siguiente url
http://ec2-3-19-213-145.us-east-2.compute.amazonaws.com:8080/
