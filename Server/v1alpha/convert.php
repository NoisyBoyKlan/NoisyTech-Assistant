<?php
$question_types = [
	[
		"default_welcome" => [
			"default_welcome",
		],
		"hi" => [
			"oi",
			"olá",
		],
		"whatis" => [
			"o que é a",
			"o que é o",
			"o que é",
			"o que a",
			"o que o",
			"o q é a",
			"o q é o",
			"o q é",
			"o q a",
			"o q o",
			"qual é a",
			"qual é o",
			"qual é",
			"qual a",
			"qual o",
		],
		"howmany" => [
			"quantos",
			"quanto",
			"qtos",
			"qto",
			"qt",
			"quantas",
			"quanta",
			"qtas",
			"qta",
		],
		"whois" => [
			"quem é a",
			"quem é o",
			"quem é",
			"qm é a",
			"qm é o",
			"qm é",
		],
	],
	[
		"howareyou1" => [
			"tudo bem",
			"tudo em cima",
		],
		"howareyou2" => [
			"como vai",
			"como está",
		],
		"yearsoldareyou" => [
			"anos você tem",
			"anos vc tem",
			"anos",
			"a sua idade",
			"sua idade",
			"meses você tem",
			"meses vc tem",
			"meses",
			"dias você tem",
			"dias vc tem",
			"dias",
		],
		"you" => [
			"iris",
			"íris",
			"você",
			"tu",
			"vc",
		],
		"yourname" => [
			"o seu nome",
			"seu nome",
		],
	],
];
echo json_encode($question_types);