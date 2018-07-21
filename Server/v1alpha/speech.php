<?php
$langs = [
	"pt-BR",
];
if(array_search($userLanguage, $langs)>-1){
	include("./langs/".$userLanguage.".php");
} else {
	die();
}
function multiexplode($delimiters,$string) {
	//THX https://stackoverflow.com/questions/4955433/php-multiple-delimiters-in-explode
	$ready = str_replace($delimiters, $delimiters[0], $string);
	$launch = explode($delimiters[0], $ready);
	return $launch;
}

$question = strtolower(urldecode($userQuestion));
foreach ($format_string as $key => $value){
	$question = trim(preg_replace($key, $value, $question));
}
$question = multiexplode($explode_question, $question);
foreach($question as $key => $value){
	if(trim($value)==""){
		unset($question[$key]);
	} else {
		$question[$key] = trim($value);
	}
}
$questionTypes = [];
foreach($question as $questionKey => $questionOfQuestion){
	$questionTypes[$questionKey] = [];
	foreach($question_types as $key => $value){
		foreach($value as $type => $possible_questions){
			foreach($possible_questions as $possible_question){
				if($possible_question!=""){
					if(strpos($questionOfQuestion, $possible_question)!==false){
						if(array_search($type, $questionTypes[$questionKey])===false){
							array_push($questionTypes[$questionKey], $type);
							break 2;
						}
					}
				}
			}
		}
	}
}
function getAnswers($array, $types, $index = 0) {
	if(is_array(@$array[@$types[@$index]])){
		return getAnswers($array[$types[$index]], $types, $index+1);
	} else {
		return $array;
	}
}
$respostaCount = 0;
$respondeu = false;
function responder($array, $tentativas = 0){
	global $question, $respostaCount, $respondeu;
	$respostaproc = $array[array_rand($array)];
	if(is_array($respostaproc)){
		responder($array, $tentativas+1);
	} else {
		if(count($question)>0){
			if($respondeu){
				echo strtolower($respostaproc);
			} else {
				echo $respostaproc;
			}
			$respondeu = true;
			$respostaCount++;
			if($respostaCount!=count($question)){
				echo ", ";
			}
		} else {
			echo $respostaproc;
		}
	}
}
foreach($questionTypes as $value){
	$getAnswer = getAnswers($answers, $value);
	foreach($getAnswer as $value){
		if(is_array($value)){
			responder($answers["dont_understand"]);
		} else {
			responder($getAnswer);
		}
		break;
	}
}
