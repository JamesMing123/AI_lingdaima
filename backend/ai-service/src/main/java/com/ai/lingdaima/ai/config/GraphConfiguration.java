package com.ai.lingdaima.ai.config;

import io.github.langgraph4j.core.GraphBuilder;
import io.github.langgraph4j.core.GraphExecutor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GraphConfiguration {

    @Bean
    public GraphExecutor conversationGraphExecutor() {
        return GraphBuilder.create()
                .withNode("prompt", context -> context.get("prompt"))
                .build()
                .executor();
    }
}
