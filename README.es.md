> ⚠️ **ATENCIÓN: Este repositorio es exclusivamente para profesores de Basecamp.**  
> Si eres un desarrollador que busca aprender Starknet, visita [speedrunstark.com](https://speedrunstark.com).

# Tutorial de Basecamp Scaffold

¡Bienvenido al Tutorial de Basecamp Scaffold! Este proyecto ofrece una guía paso a paso para construir aplicaciones descentralizadas en Starknet usando Scaffold-Stark. A lo largo de una serie de pasos progresivos, aprenderás a crear, desplegar y mejorar smart contracts mientras construyes un frontend listo para producción.

> 💡 **Nota:** A lo largo de este tutorial, todo el código HTML y CSS se proporciona en comentarios; no es necesario que lo escribas. Concéntrate en implementar los hooks y la lógica del contrato según se indica en cada paso.

## Qué Construirás

Este tutorial te guía para construir una aplicación descentralizada en tres pasos progresivos, con cada sección diseñada para tomar entre 30 y 40 minutos en un entorno de taller. Todos los cambios a lo largo del tutorial se concentran en solo dos archivos principales:
- Frontend: [`packages/nextjs/app/page.tsx`](https://github.com/Scaffold-Stark/basecamp/blob/base/packages/nextjs/app/page.tsx)
- Smart Contract: [`packages/snfoundry/contracts/src/yourcontract.cairo`](https://github.com/Scaffold-Stark/basecamp/blob/base/packages/snfoundry/contracts/src/yourcontract.cairo)

El tutorial está dividido en los siguientes pasos:

0. **Paso 0: Base de Scaffold Stark** ([branch: step-0](https://github.com/Scaffold-Stark/basecamp/tree/step-0))
   - Comienza desde cero como un clon nuevo de Scaffold-Stark
   - En este paso, mostramos el diseño de la UI básica y el diseño del contrato con la pestaña `debug-ui`
   - Juegue con la pestaña `debug-ui`, enviando transacciones y leyendo valores
   - Diseño de la interfaz de usuario básica sin funcionalidad

1. **Paso 1: Integración de Hooks Básicos** ([branch: step-1](https://github.com/Scaffold-Stark/basecamp/tree/step-1))
   - No se necesitan actualizaciones de contrato, es hora de escribir la UI
   - Cambios solo en [`page.tsx`](https://github.com/Scaffold-Stark/basecamp/blob/step-1/packages/nextjs/app/page.tsx)
   - Presenta los hooks principales de Scaffold-Stark (`useScaffoldWriteContract`, `useScaffoldReadContract`, `useScaffoldMultiWriteContract`, `useTargetNetwork`, `useDeployedContractInfo`)
   - Ahora puede interactuar con el contrato usando los hooks en la UI e implementar el contrato y el sitio web en la red que elija
   - En este punto deberíamos mostrar una implementación de `MAINNET` o `SEPOLIA`
   - En este punto deberíamos mostrar una implementación de `VERCEL`
   - [Ver cambios desde step-0 al step-1](https://github.com/Scaffold-Stark/basecamp/compare/step-0...step-1)


2. **Paso 2: Soporte Multi-Token** ([branch: step-2](https://github.com/Scaffold-Stark/basecamp/tree/step-2))
   - Actualiza [`YourContract.cairo`](https://github.com/Scaffold-Stark/basecamp/blob/step-2/packages/snfoundry/contracts/src/YourContract.cairo) para admitir depósitos de STRK y ETH
   - Mejora [`page.tsx`](https://github.com/Scaffold-Stark/basecamp/blob/step-2/packages/nextjs/app/page.tsx) con selección de tokens y visualización de balances.
   - Introduce el hook `useScaffoldEventHistory` para obtener eventos filtrados del contrato
   - No necesitamos mostrar aquí la implementación de `MAINNET` o `SEPOLIA` ni la implementación de `VERCEL`
   - En este punto, el usuario debería poder enviar STRK y ETH al contrato a través de nuestra UI y ver los eventos registrados en la parte inferior.
   - [Ver cambios del step-1 al step-2](https://github.com/Scaffold-Stark/basecamp/compare/step-1...step-2)

3. **Paso 3: Integración Completa con zklend** ([branch: step-3](https://github.com/Scaffold-Stark/basecamp/tree/step-3))
   - Actualiza [`YourContract.cairo`](https://github.com/Scaffold-Stark/basecamp/blob/step-3/packages/snfoundry/contracts/src/YourContract.cairo) con la integración del protocolo zklend
   - Todos los depósitos de STRK y ETH ahora se envían a zklend para rendimientos haciendo yield farming
   - Presenta el desarrollo en un mainnet fork
   - Pequeñas actualizaciones en `page.tsx` y `scaffold.config.ts` para admitir pruebas en mainnetFork
   - Incluye pasos para despliegue en mainnet
   - Puedes enviar STRK y ETH junto con un saludo, estos depósitos generarán rendimiento desde el primer segundo en adelante, el propietario puede retirar el rendimiento en cualquier momento
   - [Ver cambios de step-2 a step-3](https://github.com/Scaffold-Stark/basecamp/compare/step-2...step-3).

Cada paso se construye sobre el anterior, introduciendo nuevos conceptos y características mientras se mantiene una base de código limpia y lista para producción.

## Comenzando

1. **Clonar y Configurar**
   ```bash
   git clone https://github.com/Scaffold-Stark/basecamp.git
   cd basecamp
   git checkout step-0
   yarn install
   ```

2. **Configuración del Entorno**
   ```bash
   # [OPCIONAL] La instalación posterior debería haber creado el archivo .env para usted; de lo contrario, copie el archivo env de ejemplo en packages/snfoundry
   cp packages/snfoundry/.env.example packages/snfoundry/.env
   ```
   Ejemplo de `packages/snfoundry/.env` para Sepolia:
   ```bash
   PRIVATE_KEY_SEPOLIA=0xTUCLAVE
   RPC_URL_SEPOLIA=https://starknet-sepolia.public.blastapi.io/rpc/v0_7
   ACCOUNT_ADDRESS_SEPOLIA=0xTUDIRECCION
   ```
   > ⚠️ **NUNCA compartas ni subas tu archivo `.env` ni expongas tu clave privada.**  
   > 💡 El archivo `.env` pertenece al directorio `packages/snfoundry/` donde viven tus contratos inteligentes.  
   > 🔥 ¡Prueba usar mainnet para enseñar! Usa el mismo formato pero reemplaza `SEPOLIA` con `MAINNET` en los nombres de las variables.

3. **Iniciar el Desarrollo**
   ```bash
   # Terminal 1
   yarn deploy --network sepolia

   # Terminal 2
   yarn start
   ```

4. **Guía de desarrollo**
   - Comienza con la rama `step-0` que proporciona el diseño básico
   - Abre `packages/nextjs/app/page.tsx` en tu editor
   - Compara con [los cambios de step-0 a step-1](https://github.com/Scaffold-Stark/basecamp/compare/step-0...step-1) para ver qué se debe implementar
   - Implementa los ganchos y la funcionalidad como se indica en los comentarios de la sección `What You'll Build`, asegúrate de comprender lo que estamos construyendo a través de cada uno de los pasos
   - Usa la vista de comparación como referencia si te quedas atascado

> 💡 **Sugerencia:** La rama de cada paso contiene la implementación completa. Si te quedas atascado, siempre puedes verificar el código final en la rama correspondiente o usar los enlaces de comparación provistos anteriormente.

## Actualización del Framework

Para actualizar la rama base desde [Scaffold-Stark main](https://github.com/Scaffold-Stark/scaffold-stark-2):

```bash
# Desde un terminal sin el directorio `basecamp-temp`

git clone git@github.com:Scaffold-Stark/basecamp.git basecamp-temp && cd basecamp-temp && git checkout base && mkdir temp_scaffold && cd temp_scaffold && git clone git@github.com:Scaffold-Stark/scaffold-stark-2.git . && rm -rf .git .github README.md && cp -r * ../ && cd .. && rm -rf temp_scaffold && git add . && git commit -m "Update framework to latest version" && git push origin base
```

Para actualizar cada paso con cambios desde el paso anterior:

```bash
git checkout step-0 && git merge base --no-edit && git push origin step-0
```

```bash
git checkout step-1 && git merge step-0 --no-edit && git push origin step-1
```

```bash
git checkout step-2 && git merge step-1 --no-edit && git push origin step-2
```

```bash
git checkout step-3 && git merge step-2 --no-edit && git push origin step-3
```

Este proceso hará lo siguiente:
1. Clonará el repositorio del tutorial
2. Actualizará el marco base
3. Fusionará los cambios progresivamente de cada paso al siguiente
4. Enviará las ramas actualizadas
