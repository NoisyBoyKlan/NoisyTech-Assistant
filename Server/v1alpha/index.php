<?php
header("Access-Control-Allow-Origin: *");
$userLanguage = @$_GET['language'];
$userQuestion = @$_GET['question'];
include_once("speech.php");