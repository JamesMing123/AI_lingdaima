package com.ai.lingdaima.task.service;

import com.ai.lingdaima.task.dto.TaskSummary;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;

@Service
public class TaskService {

    public List<TaskSummary> listActiveTasks(String userId) {
        return List.of(
                new TaskSummary(1L, "LangChain4j 对话服务", "reviewing", OffsetDateTime.now()),
                new TaskSummary(2L, "Vue3 工作空间 UI", "done", OffsetDateTime.now().minusHours(4))
        );
    }
}
