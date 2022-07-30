package com.mrityunjoy.prodemics.controller;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@RestController()
@Slf4j
@RequestMapping("/login")
public class LoginController {
	@GetMapping()
	public ResponseEntity<TokenResponse> login(HttpServletResponse response) {
		log.info("Sending JWT token");
		
		return ResponseEntity.ok(new TokenResponse(response.getHeader("jwt")));
	}
	
	@AllArgsConstructor
	@Getter
	private class TokenResponse {
		private String token;
	}
}
