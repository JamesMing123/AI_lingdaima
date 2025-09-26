package com.ai.lingdaima.ai.dto;

import java.util.List;

public record ConversationResponse(String sessionId, List<String> messages) {
}
