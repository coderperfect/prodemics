package com.mrityunjoy.prodemics.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.mrityunjoy.prodemics.filter.JWTTokenGeneratorFilter;

@Configuration
public class SecurityConfig {
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.authorizeRequests(authZ -> authZ
				.mvcMatchers("/login").authenticated()
				.anyRequest().authenticated()
		).addFilterAfter(new JWTTokenGeneratorFilter(), BasicAuthenticationFilter.class)
		.httpBasic();

		return http.build();
	}
}
