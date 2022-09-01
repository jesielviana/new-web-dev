---
number: 7
path: '/lectures/7-express'
date: '2021-03-19'
title: 'Introdução ao Express Framework'
hidden: false
---

class: center, middle, block-text

# Introdução ao Express Framework

Programação para Internet II - ADS

Prof. @jesielviana

---

# Modularização

- Já imaginou desenvolver um sistema como 150 mil linhas de código em um único arquivo?

- Módulos dividem programas em blocos de código, quebrando a complexidade, facilitando a manutenção, tornando reaproveitável, etc.

- Um módulo especifica quais outros módulos ele usa e quais funcionalidades ele fornece para outros usarem.

- As relações entre os módulos de um sistema são chamadas de dependências.

---

# CommonJS

É a abordagem mais usada para lidar com módulos JavaScript. O Node.js o utiliza e é o sistema usado pela maioria dos pacotes no NPM.

No padrão CommonJS utiliza-se **_module.exports_** ou **_exports.<nome>_** para exportar um módulo e a função **_require(<nomedomodulo>)_** para importar. A função **_require()_** garante que o que foi exportado pelo módulo requerido esteja carregado e disponível para uso em seu programa.

---

# Exportando Módulo com CommonJS

```javascript{numberLines: true}
exports.name = 'Steve'

exports.getLocation = () => {
  return 'Picos'
}
```

<div  class="reference">
user.js
</div>

ou

```javascript{numberLines: true}
module.exports = {
  name: 'Steve',

  getLocation: () => {
    return 'Picos'
  }
}
```

<div  class="reference">
user.js
</div>

---

# Importando Módulo com CommonJS

```javascript{numberLines: true}
const user = require('./user')

console.log(user.name, user.getLocation())
// Steve Picos
```

<div  class="reference">
app.js
</div>

ou

```javascript{numberLines: true}
const { name, getLocation } = require('./user')

console.log(name, getLocation())
// Steve Picos
```

<div  class="reference">
app.js
</div>

---

# ECMAScript modules

Exportação

```javascript{numberLines: true}
export function formatDate (date, format) {}
export default User
```

Importação

```javascript{numberLines: true}
import ordinal from 'ordinal'
import { days, months } from 'date-names'
```

---

# Gerenciamento de pacotes Node.js

O NPM (Node Package Manager) e Yarn são ferramenta para o gerenciamento de pacotes no Node.js. Eles permitem instalar, desinstalar e atualizar dependências em uma aplicação por meio de uma simples instrução na linha de comando.

Ambos cumprem basicamente a mesma missão, o Yarn surgiu em 2016 (NPM é de 2009) com a missão de ser mais performático que o NPM, porém atualmente os dois são equivalentes.

Use o de sua preferência!

---

# Express

- Express é um Framework Web para Node.js, 2010
- Mínimo
- Flexível
- Fornece um conjunto robusto de recursos para aplicativos web (APIs, HTTP, middlewares)
- Open-source, mantido pela Node Foundation
- Comunidade ativa e grande

---

# Configuração do projeto

```shell{numberLines: true}
npm init
ou
yarn init
# package.json
```

Instalação do Express

```shell{numberLines: true}
npm install express
ou
yarn add express
# package.json
```

---

# Hello World

```javascript{numberLines: true}
import express from 'express'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

<div  class="reference">
app.js
</div>

Execute o aplicativo com o seguinte comando:

```shell{numberLines: true}
node app.js
```

---

# Express Router

O Roteamento refere-se à determinação de como um aplicativo responde a uma solicitação do cliente por um endpoint específico, que é uma URI (ou caminho) e um método de solicitação HTTP específico (GET, POST, etc).

Cada rota pode ter uma ou mais funções de manipulação, que são executadas quando a rota é correspondida.

---

# Express Router

A definição de rotas aceita a seguinte estrutura:

```javascript{numberLines: true}
app.METHOD(PATH, HANDLER)
```

Exemplos:

```javascript{numberLines: true}
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  res.send('Got a POST request')
})

app.put('/', (req, res) => {
  res.send('Got a PUT request')
})

app.delete('/', (req, res) => {
  res.send('Got a DELETE request')
})
```

---

# Middlewares

Funções de <a href="https://expressjs.com/pt-br/guide/writing-middleware.html" target="_blank">Middleware</a> são funções que tem acesso ao objeto **_req_**, o objeto **_res_**, e a próxima função de middleware no ciclo req/res do app. A próxima função middleware é comumente denotada por uma variável chamada next.

Funções de middleware podem executar as seguintes tarefas:

- Executar qualquer código.
- Fazer mudanças nos objetos de solicitação e resposta.
- Encerrar o ciclo de solicitação-resposta.
- Chamar o próximo middleware na pilha.

Se a atual função de middleware não terminar o ciclo de req/res, ela precisa chamar next() para passar o controle para o próximo middleware. Caso contrário, a solicitação ficará suspensa.

---

# Exmplo de Middleware

```javascript{numberLines: true}
const express = require('express')
const app = express()
const port = 3000

const logger = function (req, res, next) {
  console.log('LOGGED', `Access url ${req.url} with method ${req.method}`)
  next()
}

const addToken = function (req, res, next) {
  res.setHeader('token', '123456789')
  next()
}

app.use(logger)
app.use(addToken)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
```

---

# Leitura recomendada

- <a href="https://expressjs.com/pt-br/guide/routing.html" target="_blank">https://expressjs.com/pt-br/guide/routing.html</a>
- <a href="https://expressjs.com/pt-br/guide/writing-middleware.html" target="_blank">https://expressjs.com/pt-br/guide/writing-middleware.html</a>
- <a href="https://flaviocopes.com/express/" target="_blank">https://flaviocopes.com/express/</a>
  <!-- - <a href="" target="_blank"></a> -->

---

class: center, middle, block-text

# Introdução ao Express Framework

Programação para Internet II - ADS

Prof. @jesielviana
