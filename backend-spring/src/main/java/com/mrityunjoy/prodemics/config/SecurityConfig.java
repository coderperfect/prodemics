package com.mrityunjoy.prodemics.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.mrityunjoy.prodemics.filter.JwtTokenGeneratorFilter;
import com.mrityunjoy.prodemics.filter.JwtTokenValidationFilter;

@Configuration
public class SecurityConfig {
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
		.and().cors().configurationSource(corsConfigurationSource())
		.and().csrf().disable()
		.authorizeRequests(authZ -> authZ
				.mvcMatchers("/login").authenticated()
				.mvcMatchers("/notice").authenticated()
				.anyRequest().authenticated()
		).addFilterBefore(new JwtTokenValidationFilter(), BasicAuthenticationFilter.class)
		.addFilterAfter(new JwtTokenGeneratorFilter(), BasicAuthenticationFilter.class)
		.httpBasic();

		return http.build();
	}

	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration corsConfig = new CorsConfiguration();
		corsConfig.setAllowedOrigins(Collections.singletonList("*"));
		corsConfig.setAllowedMethods(Collections.singletonList("*"));
		corsConfig.setAllowedHeaders(Collections.singletonList("*"));
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", corsConfig);
		return source;
	}
}
