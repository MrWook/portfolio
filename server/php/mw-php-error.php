<?php
/**
 * @version 1.0.1
 * @license MIT
 * @author MrWook
 */
/**
 * @param string  $log_function_name set the log function name which should be used when an error occurred
 * @param int     $error_memory set the internal error memory save for php overflows if the $log_object or the
 *     $log_info is to big it need to be increased (Default is 524288 bytes)
 * @param bool    $enable_reporting set if the custom handling should be activated need to be true to log the error's
 *     (Default is true)
 * @param bool    $error_show set if the PHP errors should be shown on the website (Default is false)
 * @param integer $error_lvl set the error level type (default is E_ALL)
 *
 * @return void
 */
function error_init($log_function_name, $error_memory = 524288, $enable_reporting = true, $error_show = false, $error_lvl = E_ALL){
	if($enable_reporting){
		$GLOBALS['ErrorHandler'] = new ErrorHandler($log_function_name, $error_show, $error_memory);
		error_reporting($error_lvl);
		//set runtime error handler
		set_error_handler('handle_runtime_error');
		////set fatal error handler
		register_shutdown_function('handle_fatal_error');
		//set exception handler
		set_exception_handler('handle_exception_error');
		// Prevent the PHP engine from displaying runtime errors on its own if $error_show is false
		ini_set('display_errors', $error_show);
		// Prevent the PHP engine from displaying fatal errors on its own if $error_show is false
		ini_set('display_startup_errors', $error_show);
	}else{
		ini_set('display_errors', $error_show);
		ini_set('display_startup_errors', $error_show);
		error_reporting($error_show);
	}
}

//  Pass errors up to the global ErrorHandler to be later inserted into
function handle_runtime_error($error_lvl, $error_msg, $error_file = NULL, $error_line = NULL, $error_context = NULL){
	$GLOBALS['ErrorHandler']->log_error($error_lvl, "Runtime Error: ".$error_msg, $error_file, $error_line, $error_context);
	if(!headers_sent()){
		header("HTTP/1.1 500");
	}

	//return true when the error should not be shown, return false when the error should be shown
	return !$GLOBALS['ErrorHandler']->error_show;
}

// Pass fatal errors up to the standard error callback.
function handle_fatal_error(){
	$GLOBALS["ErrorHandler"]->error_memory = NULL;
	$error                                 = error_get_last();
	// Unset Error Type and Message implies a proper shutdown.
	if(!isset($error['type']) && !isset($error['message'])){
		exit();
	}else{
		handle_runtime_error($error['type'], "Fatal Error: ".$error['message'], $error['file'], $error['line']);
	}
}

// Parse and pass exceptions up to the standard error callback.
function handle_exception_error($exception){
	//throw exception when error should be shown
	if($GLOBALS['ErrorHandler']->error_show){
		echo $exception->__toString();
	}
	handle_runtime_error($exception->getCode(), "Exception: ".$exception->getMessage(), $exception->getFile(), $exception->getLine(), $exception->getTrace());
}

class ErrorHandler{
	private $log_function_name = '';
	public  $error_show        = false;
	public  $error_memory      = '';

	function __construct($log_function_name, $error_show, $error_memory){
		$this->log_function_name = $log_function_name;
		$this->error_show        = $error_show;
		$this->error_memory      = str_repeat('*', $error_memory);
	}

	public function log_error($error_lvl, $error_msg, $error_file = NULL, $error_line = NULL, $error_context = NULL){
		Global $log_object;
		Global $log_info;
		//get error code as string
		$error_type_string = ErrorHandler::ErrorTypeString($error_lvl);
		if(isset($error_context) && !is_array($error_context) && strlen($error_context) > 0){
			$error_context = str_replace("#", "<br/>\r\n#", $error_context);
		}
		$dataset = [];
		//set error level
		$dataset['error_level'] = $error_type_string;
		//set error file where the error occurred
		if(isset($error_file) && strlen($error_file) > 0){
			$dataset['file'] = $error_file;
		}
		//set error line where the error occurred
		if(isset($error_line) && strlen($error_line) > 0){
			$dataset['line'] = $error_line;
		}//set error context
		else{
			if(isset($error_context) && strlen($error_context) > 0){
				$dataset['context'] = $error_context;
			}
		}
		//set error message
		$dataset['message'] = str_replace("\r\n", "<br/>\r\n", $error_msg);
		if($log_info != NULL){
			$dataset['info'] = $log_info;
		}
		if($log_object == NULL){
			$log_object = "";
		}
		if($this->log_function_name != ''){
			call_user_func($this->log_function_name, 'ERROR', $log_object, $dataset, '');
		}
	}

	public function ErrorTypeString($error_type){
		$return_value = "";
		switch($error_type){
			default:
				$return_value = "E_UNSPECIFIED_ERROR";
				break;
			case E_ERROR: // 1 //
				$return_value = 'E_ERROR';
				break;
			case E_WARNING: // 2 //
				$return_value = 'E_WARNING';
				break;
			case E_PARSE: // 4 //
				$return_value = 'E_PARSE';
				break;
			case E_NOTICE: // 8 //
				$return_value = 'E_NOTICE';
				break;
			case E_CORE_ERROR: // 16 //
				$return_value = 'E_CORE_ERROR';
				break;
			case E_CORE_WARNING: // 32 //
				$return_value = 'E_CORE_WARNING';
				break;
			case E_COMPILE_ERROR: // 64 //
				$return_value = 'E_COMPILE_ERROR';
				break;
			case E_CORE_WARNING: // 128 //
				$return_value = 'E_COMPILE_WARNING';
				break;
			case E_USER_ERROR: // 256 //
				$return_value = 'E_USER_ERROR';
				break;
			case E_USER_WARNING: // 512 //
				$return_value = 'E_USER_WARNING';
				break;
			case E_USER_NOTICE: // 1024 //
				$return_value = 'E_USER_NOTICE';
				break;
			case E_STRICT: // 2048 //
				$return_value = 'E_STRICT';
				break;
			case E_RECOVERABLE_ERROR: // 4096 //
				$return_value = 'E_RECOVERABLE_ERROR';
				break;
			case E_DEPRECATED: // 8192 //
				$return_value = 'E_DEPRECATED';
				break;
			case E_USER_DEPRECATED: // 16384 //
				$return_value = 'E_USER_DEPRECATED';
				break;
		}

		return $return_value;
	}
}