# 使用官方的 Node.js 运行时作为构建阶段的基础镜像
FROM node:24-alpine as builder

# 设置工作目录
WORKDIR /xyj

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 构建生产环境
RUN npm run build

# 使用 Nginx 作为生产服务器
FROM nginx:stable-perl

# 将构建好的静态文件复制到 Nginx 默认的静态文件目录
COPY --from=builder /xyj/manage /usr/share/nginx/html/manage
# 复制自定义 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 8082

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
