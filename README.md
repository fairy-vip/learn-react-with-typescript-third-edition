# Learn React with TypeScript - Third Edition

测试环境
[.env.local](chapter8/fetching-tanstack/.env.local)

[createDatabase.mjs](chapter8/fetching-tanstack/src/scripts/createDatabase.mjs)
createDatabase.mjs当前目录下创建/src/data目录，然后执行，创建db文件。


在Node Express项目中，`.env.local`文件在多环境配置中有以下一些特殊性：
- **优先级较高**：通常在项目中会有多个环境配置文件，如`.env.development`、`.env.production`等分别用于不同的环境。而`.env.local`文件的优先级一般较高，其定义的环境变量会覆盖其他环境配置文件中相同的变量。这使得开发者可以在本地开发时，方便地根据自己的需求快速调整某些配置，而不必修改其他环境特定的配置文件。
- **本地开发专属**：主要用于本地开发环境，它允许开发者在不影响其他环境（如测试环境、生产环境）配置的情况下，对本地开发所需的环境变量进行个性化设置。例如，本地数据库连接信息可能与生产环境不同，就可以在`.env.local`中单独配置。
- **不被纳入版本控制**：由于`.env.local`通常包含敏感信息或本地特定的配置，如本地的数据库密码、个人的API密钥等，所以它一般会被添加到`.gitignore`文件中，不被纳入版本控制系统。这样可以避免将敏感信息泄露到代码仓库中，保证了项目的安全性和环境配置的独立性。

在 Node.js 的 Express 应用中实现多环境配置（如开发、测试、生产环境）是项目开发中的常见需求。以下是几种常见的实现方法：


### **方法一：使用 `.env` 文件 + `dotenv` 库**
这是最常用的方法，通过不同环境加载不同的 `.env` 文件。

#### **步骤 1：安装依赖**
```bash
npm install dotenv
```

#### **步骤 2：创建环境配置文件**
在项目根目录下创建多个 `.env` 文件：
```
.env.development  # 开发环境
.env.production   # 生产环境
.env.test         # 测试环境
```

#### **步骤 3：配置文件示例**
`.env.development`:
```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_USER=dev_user
DB_PASSWORD=dev_password
```

`.env.production`:
```env
NODE_ENV=production
PORT=8080
DB_HOST=prod-db-server
DB_USER=prod_user
DB_PASSWORD=prod_password
```

#### **步骤 4：在应用中加载环境变量**
在应用入口文件（如 `app.js` 或 `server.js`）中根据当前环境加载对应的 `.env` 文件：

```javascript
const dotenv = require('dotenv');

// 根据 NODE_ENV 加载对应的 .env 文件
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

// 验证环境变量是否加载成功
console.log(`当前环境: ${process.env.NODE_ENV}`);
console.log(`数据库主机: ${process.env.DB_HOST}`);
```

#### **步骤 5：启动应用时指定环境**
在 `package.json` 中添加启动脚本：
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "NODE_ENV=development node server.js",
    "prod": "NODE_ENV=production node server.js",
    "test": "NODE_ENV=test node server.js"
  }
}
```


### **方法二：使用环境变量 + `process.env`**
直接通过命令行或系统环境变量传递配置参数。

#### **示例 1：命令行传递参数**
```bash
# 启动时直接设置环境变量
NODE_ENV=production PORT=8080 DB_HOST=prod-db node server.js
```

#### **示例 2：在 `package.json` 中配置**
```json
{
  "scripts": {
    "start": "cross-env NODE_ENV=production node server.js"
  }
}
```
需要安装 `cross-env` 以兼容不同操作系统：
```bash
npm install cross-env --save-dev
```


### **方法三：自定义配置文件**
创建独立的配置模块，根据环境变量导出不同配置。

#### **步骤 1：创建配置目录**
```
config/
  ├── default.js
  ├── development.js
  ├── production.js
  └── index.js
```

#### **步骤 2：配置文件内容**
`config/default.js`:
```javascript
module.exports = {
  port: 3000,
  database: {
    host: 'localhost',
    dialect: 'mysql',
  },
  logging: true,
};
```

`config/development.js`:
```javascript
const defaultConfig = require('./default');

module.exports = {
  ...defaultConfig,
  database: {
    ...defaultConfig.database,
    username: 'dev_user',
    password: 'dev_password',
  },
};
```

`config/production.js`:
```javascript
const defaultConfig = require('./default');

module.exports = {
  ...defaultConfig,
  port: 8080,
  logging: false,
  database: {
    ...defaultConfig.database,
    host: 'prod-db-server',
    username: 'prod_user',
    password: process.env.DB_PASSWORD, // 从环境变量获取敏感信息
  },
};
```

`config/index.js`:
```javascript
const env = process.env.NODE_ENV || 'development';
module.exports = require(`./${env}`);
```

#### **步骤 3：在应用中使用配置**
```javascript
const config = require('./config');

console.log(`服务器端口: ${config.port}`);
console.log(`数据库主机: ${config.database.host}`);
```


### **方法四：使用第三方库（如 `config` 模块）**
`config` 模块是一个流行的 Node.js 配置管理工具，支持多环境配置。

#### **步骤 1：安装依赖**
```bash
npm install config
```

#### **步骤 2：创建配置目录**
```
config/
  ├── default.json
  ├── development.json
  ├── production.json
  └── custom-environment-variables.json
```

#### **步骤 3：配置文件示例**
`config/default.json`:
```json
{
  "port": 3000,
  "database": {
    "host": "localhost",
    "username": "user",
    "password": "password"
  }
}
```

`config/production.json`:
```json
{
  "port": 8080,
  "database": {
    "host": "prod-db-server",
    "username": "prod_user",
    "password": "${DB_PASSWORD}" // 从环境变量获取
  }
}
```

`config/custom-environment-variables.json`:
```json
{
  "database": {
    "password": "DB_PASSWORD" // 将环境变量映射到配置
  }
}
```

#### **步骤 4：在应用中使用**
```javascript
const config = require('config');

console.log(`服务器端口: ${config.get('port')}`);
console.log(`数据库密码: ${config.get('database.password')}`);
```


### **最佳实践**
1. **敏感信息保护**：
   - 不要将敏感信息（如密码、API 密钥）直接写在配置文件中，应通过环境变量传递。
   - 将 `.env` 文件添加到 `.gitignore` 中，避免提交到版本控制系统。

2. **配置优先级**：
   - 环境变量 > 配置文件 > 默认值。

3. **验证配置**：
   - 在应用启动时验证必要的配置是否存在，避免运行时错误。

4. **使用工具链**：
   - 在开发环境使用 `nodemon` 监听文件变化并自动重启。
   - 在生产环境使用 `pm2` 或 Docker 管理应用进程。


通过以上方法，你可以灵活管理 Express 应用在不同环境下的配置，提高开发效率和系统安全性。
