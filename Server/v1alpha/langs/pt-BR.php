<?php
$format_string = [
	"/\s+/" => " ", //TROCA ESPAÇOS (E SIMILARES) DUPLICADOS PARA ESPAÇO ÚNICO.
];
$explode_question = [
	" , ",
	 ", ",
	" ," ,
	","  ,
	" ? ",
	 "? ",
	" ?" ,
	 "?" ,
	" ! ",
	 "! ",
	" !" ,
	 "!" ,
	" . ",
	 ". ",
	" ." ,
	 "." ,
	" e ",
];
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
$answers = [
	"default_welcome" => [
		"Olá, seja bem vindo, sou Iris e estou aqui para te ajudar",
	],
	"dont_understand" => [
		"Desculpe, eu não entendi",
		"Eu não entendi, desculpe",
		"Desculpe, eu não consegui entender o que você disse",
		"Sinto muito, eu não entendi",
		"Eu não entendi, sinto muito",
		"Sinto muito, eu não consegui entender o que você disse",
	],
	"hi" => [
		"Olá",
		"Oi",
	],
	"howareyou1" => [
		"Tudo",
		"Sim",
		"Estou bem",
	],
	"howareyou2" => [
		"Bem",
		"Estou bem",
	],
	"whois" => [
		"you" => [
			"Eu sou Iris, sua assistente pessoal",
			"Eu sou Iris",
			"Meu nome é Iris",
			"Meu nome é Iris e estou aqui para te ajudar",
			"Eu sou Iris, sua assistente pessoal.\nSe você precisar de ajuda, eu posso te ajudar",
		],
	],
	"whatis" => [
		"yourname" => [
			"Eu sou Iris",
			"Meu nome é Iris",
		],
		"yearsoldareyou" => [
			"Não te interessa.",
		],
	],
	"howmany" => [
		"yearsoldareyou" => [
			"Não te interessa.",
		],
	],
];