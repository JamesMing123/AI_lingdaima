package com.ai.lingdaima.task.dto;

import java.time.OffsetDateTime;

public record TaskSummary(Long id, String title, String status, OffsetDateTime updatedAt) {
}
