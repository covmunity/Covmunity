#!/usr/bin/env php
<?php
// print_r($argc);
// print_r($argv);
if ($argc <= 1) {
	echo PHP_EOL . 'Usage: ' . $argv[0] . ' <key>' . PHP_EOL;
}
else {
	$key = $argv[1];
	echo PHP_EOL;
	echo 'Received key: ' . $key . PHP_EOL;
	echo 'Decoded key: ' . str_rot13(base64_decode($key)) . PHP_EOL;
	echo PHP_EOL;
}