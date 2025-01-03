> ⚠️ **ATENCIÓN: Este repositorio es exclusivamente para profesores de Basecamp.**  
> Si eres un desarrollador que busca aprender Starknet, visita [speedrunstark.com](https://speedrunstark.com).

# Tutorial de Basecamp Scaffold

¡Bienvenido al Tutorial de Basecamp Scaffold! Este proyecto ofrece una guía paso a paso para construir aplicaciones descentralizadas en Starknet usando Scaffold-Stark. A lo largo de una serie de pasos progresivos, aprenderás a crear, desplegar y mejorar contratos inteligentes mientras construyes un frontend listo para producción.

> 💡 **Nota:** A lo largo de este tutorial, todo el código HTML y CSS se proporciona en comentarios; no es necesario que lo escribas. Concéntrate en implementar los hooks y la lógica del contrato según se indica en cada paso.

## Qué Construirás

Este tutorial te guía para construir una aplicación descentralizada en tres pasos progresivos, con cada sección diseñada para tomar entre 30 y 40 minutos en un entorno de taller. Todos los cambios a lo largo del tutorial se concentran en solo dos archivos principales:
- Frontend: [`packages/nextjs/app/page.tsx`](https://github.com/Scaffold-Stark/basecamp/blob/base/packages/nextjs/app/page.tsx)
- Contrato Inteligente: [`packages/snfoundry/contracts/src/yourcontract.cairo`](https://github.com/Scaffold-Stark/basecamp/blob/base/packages/snfoundry/contracts/src/yourcontract.cairo)

El tutorial está dividido en los siguientes pasos:

0. **Paso 0: Base de Scaffold Stark** ([rama: step-0](https://github.com/Scaffold-Stark/basecamp/tree/step-0))
   - Comienza desde cero como un clon fresco de Scaffold-Stark.
   - Layout básico de la interfaz con funcionalidad mínima.

1. **Paso 1: Integración de Hooks Básicos** ([rama: step-1](https://github.com/Scaffold-Stark/basecamp/tree/step-1))
   - No se necesitan actualizaciones del contrato.
   - Introduce hooks principales de Scaffold-Stark (`useScaffoldWriteContract` y `useScaffoldReadContract`).
   - Cambios solo en `page.tsx`.
   - [Ver cambios de step-0 a step-1](https://github.com/Scaffold-Stark/basecamp/compare/step-0...step-1).

2. **Paso 2: Soporte Multi-Token** ([rama: step-2](https://github.com/Scaffold-Stark/basecamp/tree/step-2))
   - Actualiza `yourcontract.cairo` para admitir depósitos de STRK y ETH.
   - Mejora `page.tsx` con selección de tokens y visualización de balances.
   - Sigue las indicaciones en ambos archivos para la implementación guiada.
   - [Ver cambios de step-1 a step-2](https://github.com/Scaffold-Stark/basecamp/compare/step-1...step-2).

3. **Paso 3: Integración Completa con zklend** ([rama: step-3](https://github.com/Scaffold-Stark/basecamp/tree/step-3))
   - Actualiza `yourcontract.cairo` con la integración del protocolo zklend.
   - Pequeñas actualizaciones en `page.tsx` y `scaffold.config.ts` para admitir pruebas en mainnetFork.
   - Incluye pasos para despliegue en mainnet.
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
   # Copia el archivo .env de ejemplo en packages/snfoundry
   cp packages/snfoundry/.env.example packages/snfoundry/.env
   ```
   Ejemplo de `packages/snfoundry/.env` para Sepolia:
   ```bash
   PRIVATE_KEY_SEPOLIA=0xALGO
   RPC_URL_SEPOLIA=https://starknet-sepolia.public.blastapi.io/rpc/v0_7
   ACCOUNT_ADDRESS_SEPOLIA=0xALGO
   ```
   > ⚠️ **NUNCA compartas ni subas tu archivo `.env` ni expongas tu clave privada.**  
   > 💡 El archivo `.env` pertenece al directorio `packages/snfoundry/` donde viven tus contratos inteligentes.  
   > 🔥 ¡Prueba usar mainnet para enseñar! Usa el mismo formato pero reemplaza `SEPOLIA` con `MAINNET` en los nombres de las variables.

3. **Iniciar el Desarrollo**
   ```bash
   yarn start
   yarn deploy --network sepolia
   ```

4. **Guía de Desarrollo**
   - Comienza con la rama `step-0`, que proporciona el layout básico.
   - Abre `packages/nextjs/app/page.tsx` en tu editor.
   - Compara con [cambios de step-0 a step-1](https://github.com/Scaffold-Stark/basecamp/compare/step-0...step-1) para ver qué necesitas implementar.
   - Implementa los hooks y funcionalidades según se guían en los comentarios.
   - Usa la vista de comparación como referencia si te quedas atascado.

> 💡 **Sugerencia:** Cada rama de un paso contiene la implementación completa. Si te quedas atascado, siempre puedes revisar el código final en la rama correspondiente o usar los enlaces de comparación proporcionados anteriormente.

## Actualización del Framework

Este tutorial está basado en Scaffold-Stark. Para actualizar la rama base desde [Scaffold-Stark main](https://github.com/Scaffold-Stark/scaffold-stark-2):

```bash
// En una terminal nueva sin un directorio `basecamp-temp`

git clone git@github.com:Scaffold-Stark/basecamp.git basecamp-temp && cd basecamp-temp && git checkout base && mkdir temp_scaffold && cd temp_scaffold && git clone git@github.com:Scaffold-Stark/scaffold-stark-2.git . && rm -rf .git .github README.md && cp -r * ../ && cd .. && rm -rf temp_scaffold && git add . && git commit -m "Actualizar framework a la versión más reciente" && git push origin base
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

Este proceso realizará lo siguiente:
1. Clonará el repositorio del tutorial.
2. Actualizará el framework base.
3. Fusionará cambios progresivamente de un paso al siguiente.
4. Enviará las ramas actualizadas.