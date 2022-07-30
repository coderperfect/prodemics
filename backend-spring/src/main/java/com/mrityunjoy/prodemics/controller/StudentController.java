package com.mrityunjoy.prodemics.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController()
@Slf4j
@RequestMapping("/student")
public class StudentController {
	@GetMapping("/notice-list")
	public List<String> getNoticeList() {
		log.info("Sending response");
		return Arrays.asList("Mid term exam", "Summer Vacation");
	}
}
