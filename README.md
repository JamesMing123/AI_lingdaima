# AI灵代码平台

AI灵代码平台是一个基于大模型的智能代码辅助平台，用户可以通过自然语言与系统交互来完成代码生成、调试以及技术问答等任务。本项目采用前后端分离架构，集成多种云原生与 AI 技术，以提供高效、可靠的智能开发体验。

## 功能特性
- **自然语言编码助手**：利用大语言模型实现代码生成、解释与补全，支持多轮对话与上下文理解。
- **智能调试**：结合运行时日志与模型能力，协助定位错误、生成修复建议。
- **知识问答**：基于业务知识库与 LangChain4j / LangGraph4j 的提示词编排，实现复杂问题解答。
- **任务与用户管理**：提供用户注册登录、角色权限管理以及任务流转功能。
- **对话持久化与流式渲染**：支持会话记录存储、实时流式输出，优化交互体验。
- **接口监控与告警**：通过可观测性组件对接口调用进行监控，保障服务稳定性。

## 技术架构

### 前端
- **框架**：Vue 3 + TypeScript。
- **数据请求**：基于 Axios 封装，结合 OpenAPI 规范自动生成接口 SDK。
- **质量保障**：集成 ESLint 与单元测试框架，确保代码风格与质量。

### 后端
- **基础框架**：Spring Boot 3。
- **微服务治理**：采用 Spring Cloud Alibaba 生态，借助 Dubbo + Nacos 实现服务注册、发现与远程调用。
- **数据与缓存**：MyBatis Flex 持久层框架，MySQL 作为主数据存储，Redis 与 Caffeine 提供缓存与会话管理。
- **AI 能力编排**：集成 LangChain4j 与 LangGraph4j，实现复杂提示链路与对话流程管理。
- **网关层**：通过 Higress 网关提供统一入口、鉴权与流控能力。

## 模块划分
项目已拆分为前端与多个 Spring Boot 微服务模块，目录结构如下：

```
frontend/          # Vue3 + TypeScript 工作台，集成 OpenAPI SDK 生成
backend/
  common/          # Redis、日志等通用配置
  ai-service/      # LangChain4j + LangGraph4j 对话与代码生成服务
  user-service/    # 用户、权限与会话管理
  task-service/    # 任务编排与进度跟踪
  gateway/         # Spring Cloud Gateway + Higress 统一入口
docs/              # 架构文档
```

## 快速开始
1. 克隆项目代码仓库：
   ```bash
   git clone https://github.com/your-org/AI_lingdaima.git
   ```
2. 安装前端依赖并启动开发服务器：
   ```bash
    cd frontend
   pnpm install
   pnpm run generate:sdk   # 基于 OpenAPI 文档生成 Axios SDK
   pnpm dev
   ```
3. 启动后端各服务（示例使用 Docker Compose）：
   ```bash
    docker compose up -d
   ```
4. 配置 `.env` 或配置中心，填入 OpenAI API 密钥、Nacos 地址、数据库连接等参数。`frontend/.env.example` 提供了基础变量示例，后端各模块可通过 `application.yml` 配置 Nacos、Dubbo、Redis、Higress 等服务。

## 开发指南
- 前端遵循组合式 API 与组件化设计，优先使用 TypeScript 类型定义。
- 后端服务使用统一的代码规范与日志格式，建议结合 Checkstyle 与 Spotless 进行格式化。
- 编写提示词模板时，使用 LangChain4j / LangGraph4j 的节点化描述，便于复用与调试。

## 贡献
欢迎通过 Issue 或 Pull Request 提交功能需求、Bug 修复与优化建议。提交前请确保通过必要的测试与代码检查。

## 许可证
根据项目实际需要选择合适的开源许可证（例如 Apache-2.0 或 MIT）。
