package com.mrityunjoy.prodemics.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
	@PostMapping("/login")
	public String login(String username, String password) {
		return "haa";
	}
}
