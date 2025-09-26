package com.ai.lingdaima.ai.service;

import com.ai.lingdaima.ai.dto.ConversationRequest;
import com.ai.lingdaima.ai.dto.ConversationResponse;
import dev.langchain4j.service.UserMessage;
import io.github.langgraph4j.core.GraphExecutor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

import java.time.Duration;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConversationWorkflow {

    private final GraphExecutor graphExecutor;

    public Flux<String> invoke(ConversationRequest request) {
        return Flux.fromStream(() -> graphExecutor.executeStream(buildMessages(request)))
                .delayElements(Duration.ofMillis(100));
    }

    public ConversationResponse syncInvoke(ConversationRequest request) {
        List<String> outputs = graphExecutor.execute(buildMessages(request));
        return new ConversationResponse(request.sessionId(), outputs);
    }

    private List<UserMessage> buildMessages(ConversationRequest request) {
        List<String> context = request.context() == null ? List.of() : request.context();
        Flux<UserMessage> base = Flux.fromIterable(context)
                .map(UserMessage::from);
        if (request.prompt() != null && !request.prompt().isBlank()) {
            base = base.concatWithValues(UserMessage.from(request.prompt()));
        }
        return base
                .collectList()
                .blockOptional()
                .orElse(List.of());
    }
}
