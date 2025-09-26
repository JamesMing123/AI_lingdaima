package com.ai.lingdaima.task.controller;

import com.ai.lingdaima.task.dto.TaskSummary;
import com.ai.lingdaima.task.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @GetMapping
    public List<TaskSummary> list(Principal principal) {
        return taskService.listActiveTasks(principal.getName());
    }
}
