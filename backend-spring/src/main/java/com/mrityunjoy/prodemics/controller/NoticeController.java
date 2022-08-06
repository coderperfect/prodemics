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
		return Arrays.asList(new Notice(1, "Mid term exam",
				"Mid term exam is going to start from 12th June 2022. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
				LocalDate.of(2022, 6, 1)),
				new Notice(2, "Summer vacation",
						"Summer vacation is going to start from 1st July 2022. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
						LocalDate.of(2022, 6, 12)));
	}
}
