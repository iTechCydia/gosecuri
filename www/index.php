<?php

require_once __DIR__ . '/vendor/autoload.php';

$route = new \MiniFast\Route();
$route->fromFile(
    __DIR__ . '/routes.json',
    __DIR__ . '/templates'
);
