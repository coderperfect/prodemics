package com.mrityunjoy.prodemics.controller;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mrityunjoy.prodemics.model.Notice;

import lombok.extern.slf4j.Slf4j;

@RestController()
@Slf4j
@RequestMapping("/notice")
public class NoticeController {
	@GetMapping("/list")
	public List<Notice> getNoticeList() {
		log.info("Sending response");
		return Arrays.asList(
				new Notice("Mid term exam", "Mid term exam is going to start from 12th June 2022",
						LocalDate.of(2022, 6, 1)),
				new Notice("Summer vacation", "Summer vacation is going to start from 1st July 2022",
						LocalDate.of(2022, 6, 12)));
	}
}
