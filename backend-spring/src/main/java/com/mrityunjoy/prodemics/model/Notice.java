package com.mrityunjoy.prodemics.model;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Notice {
	private int id;
	private String title;
	private String description;
	private LocalDate createdAt;
}
