package com.ai.lingdaima.ai.controller;

import com.ai.lingdaima.ai.dto.ConversationRequest;
import com.ai.lingdaima.ai.dto.ConversationResponse;
import com.ai.lingdaima.ai.service.ConversationWorkflow;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/conversation")
@RequiredArgsConstructor
public class AiConversationController {

    private final ConversationWorkflow workflow;

    @PostMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> stream(@RequestBody ConversationRequest request) {
        return workflow.invoke(request);
    }

    @PostMapping("/completion")
    public ConversationResponse completion(@RequestBody ConversationRequest request) {
        return workflow.syncInvoke(request);
    }
}
