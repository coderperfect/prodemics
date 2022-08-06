INSERT INTO `role` (`id`, `name`)
	VALUES(1, 'admin');
	
INSERT INTO `role` (`id`, `name`)
	VALUES(2, 'student');

INSERT INTO `end_user` (`username`, `email_id`, `name`, `password`, `role_id`)
	VALUES('admin', 'admin@email.com', 'Admin Guy', '$2a$10$GB.vRo32cMleKg9LsBjIpunXBdxmxNPm.on9CUCAmzMIWQtm03AqW', 1);
	
INSERT INTO `end_user` (`username`, `email_id`, `name`, `password`, `role_id`)
	VALUES('begula', 'begula@email.com', 'Beluga GG', '$2a$10$/o/R5tms5DPTCOPTsH2pAuinCHmLL2h6dccJxo/RO8iwJ/Ts.5cGy', 2);