# AI 灵代码平台架构总览

本项目提供一个面向企业级研发团队的 AI 助手平台，结合自然语言编码、知识问答、代码生成与调试工作流。系统采用前后端分离与微服务架构，整合 LangChain4j、LangGraph4j 以及 OpenAI API。

## 技术选型

- **前端**：Vue 3、TypeScript、Vite、Pinia、Vue Router、Axios；基于 OpenAPI 规范通过 `openapi-typescript-codegen` 生成接口 SDK。
- **后端**：Spring Boot 3、Spring Cloud Alibaba、Dubbo、Nacos；数据访问层使用 MyBatis Flex，缓存体系由 Redis + Caffeine 组成，LangChain4j + LangGraph4j 负责大模型提示词编排。
- **网关与治理**：Higress 作为入口网关，结合 Spring Cloud Gateway 完成路由、鉴权与监控上报。

## 模块说明

```
AI_lingdaima/
├── frontend/                # Vue3 + TS 前端工程
│   ├── scripts/             # OpenAPI SDK 生成脚本
│   └── src/                 # 业务组件、路由、Pinia Store
├── backend/
│   ├── common/              # 通用配置、工具组件
│   ├── ai-service/          # AI 对话与提示词编排服务
│   ├── user-service/        # 用户、会话与权限模块
│   ├── task-service/        # 任务派发、进度跟踪
│   └── gateway/             # Higress 集成的统一网关
└── docs/
    └── architecture.md      # 架构与模块说明
```

## 数据流

1. 用户通过前端工作台以自然语言描述需求，前端将请求发送至网关。
2. Higress 网关负责鉴权、流控后转发至各后端微服务。
3. `ai-service` 调用 LangChain4j / LangGraph4j，实现提示词编排和 OpenAI 接口访问，支持流式响应。
4. `task-service` 负责任务拆解、状态跟踪；`user-service` 负责用户档案、角色权限与会话持久化。
5. Redis 存储对话上下文与会话信息，Caffeine 在热点数据层提供本地缓存。
6. 所有服务通过 Dubbo + Nacos 实现 RPC 调用及服务注册发现，并可由 Higress 统一出口暴露。

## 下一步规划

- 接入企业级身份认证（如 Keycloak）并完善安全策略。
- 实现 LangGraph4j 节点化可视化编排与版本管理。
- 扩展代码生成模版库，支持多语言与 CI/CD 集成。
