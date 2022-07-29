package com.mrityunjoy.prodemics.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@RestController()
@Slf4j
@RequestMapping("/login")
public class LoginController {
	@GetMapping()
	public String login(HttpServletResponse response) {
		log.info("Sending JWT token");
		return response.getHeader("jwt");
	}
}
