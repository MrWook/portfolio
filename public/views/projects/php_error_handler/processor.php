<?php
	//init error handler
	include('mw-php-error.php');
	error_init('logging');
	function logging($type, $log_object, $dataset){
		//write into log file
		$myfile = fopen("log.txt", "a");
		$text = json_encode([
				"date" => date("Y-m-d H:i:s"),
				"log_object" => $log_object,
				"dataset" => $dataset
			]).PHP_EOL;
		fwrite($myfile, $text);
		fclose($myfile);
		//response with a clean text
		$response = [
			'type' => 'warning',
			'text' => 'An error occured'
		];
		echo json_encode($response);
	}
	//tests
	if ($_POST['type'] == 'timeout') {
		while(true){
			$a = 1;
		}
	}elseif ($_POST['type'] == 'overflow') {
		$b = 'aaaaaaaaaaa';
		while(true){
			$b .= $b.$b.$b.$b.$b.$b;
		}
	}elseif ($_POST['type'] == 'error') {
		include('server_error.php');
	}elseif ($_POST['type'] == 'exception') {
		$error = 'Always throw this error';
		throw new Exception($error);
	}elseif ($_POST['type'] == 'error_with_parameter'){
		$log_object = [];
		$log_object['foo'] = 'bar';
		$log_info['information'] = 'This is awsome';
		include('server_error.php');
	}