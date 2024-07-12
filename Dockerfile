# 使用官方 Node.js 14 镜像作为基础镜像
FROM node:14

# 设置工作目录
WORKDIR /usr/src/app

# 将 package.json 和 package-lock.json 文件复制到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 将项目源代码复制到工作目录
COPY . .

# 暴露端口，与你的应用监听的端口保持一致
EXPOSE 3000

# 定义 Docker 容器启动时运行的命令
CMD [ "node", "app.js" ]
