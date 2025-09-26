package com.ai.lingdaima.ai.dto;

import java.util.List;

public record ConversationRequest(String sessionId, String prompt, List<String> context) {
}
