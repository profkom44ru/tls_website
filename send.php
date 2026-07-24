<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const MAIL_TO = 'info@sniper-search.ru, ceo@teamlabsoftware.ru';
const MAIL_FROM = 'noreply@teamlabsoftware.ru';
const MAX_FILE_BYTES = 20 * 1024 * 1024;
const ALLOWED_EXTENSIONS = ['pdf', 'docx', 'png'];
const ALLOWED_MIME_TYPES = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/octet-stream',
    'image/png',
];

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Метод не поддерживается'], JSON_UNESCAPED_UNICODE);
    exit;
}

$name = trim((string) ($_POST['name'] ?? ''));
$company = trim((string) ($_POST['company'] ?? ''));
$phone = trim((string) ($_POST['phone'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$privacy = isset($_POST['privacy']);

if ($name === '' || $phone === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Заполните обязательные поля'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!$privacy) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Нужно согласие на обработку данных'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Некорректный email'], JSON_UNESCAPED_UNICODE);
    exit;
}

if (mb_strlen($name) > 200 || mb_strlen($company) > 200 || mb_strlen($phone) > 40 || mb_strlen($message) > 5000) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Слишком длинные данные'], JSON_UNESCAPED_UNICODE);
    exit;
}

$attachment = null;
if (isset($_FILES['file']) && is_array($_FILES['file']) && ($_FILES['file']['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_NO_FILE) {
    $fileError = (int) ($_FILES['file']['error'] ?? UPLOAD_ERR_NO_FILE);
    if ($fileError !== UPLOAD_ERR_OK) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Ошибка загрузки файла'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $tmpName = (string) $_FILES['file']['tmp_name'];
    $origName = (string) ($_FILES['file']['name'] ?? 'file');
    $size = (int) ($_FILES['file']['size'] ?? 0);
    $mime = (string) ($_FILES['file']['type'] ?? '');

    if ($size <= 0 || $size > MAX_FILE_BYTES) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Файл больше 20 МБ или пустой'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $extension = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
    if (!in_array($extension, ALLOWED_EXTENSIONS, true)) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Допустимы только PDF, DOCX, PNG'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if ($mime !== '' && !in_array($mime, ALLOWED_MIME_TYPES, true)) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Недопустимый тип файла'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!is_uploaded_file($tmpName)) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Некорректный файл'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $content = file_get_contents($tmpName);
    if ($content === false) {
        http_response_code(500);
        echo json_encode(['ok' => false, 'error' => 'Не удалось прочитать файл'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $safeName = preg_replace('/[^A-Za-z0-9._-]+/u', '_', $origName) ?: ('file.' . $extension);
    $attachment = [
        'name' => $safeName,
        'content' => $content,
        'mime' => $mime !== '' ? $mime : 'application/octet-stream',
    ];
}

$safeName = htmlspecialchars($name, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeCompany = htmlspecialchars($company !== '' ? $company : '—', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safePhone = htmlspecialchars($phone, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeEmail = htmlspecialchars($email, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$safeMessage = nl2br(htmlspecialchars($message, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));

$subject = '=?UTF-8?B?' . base64_encode('Заявка с сайта Team Lab: ' . $name) . '?=';
$bodyText = "Имя: {$name}\nКомпания: " . ($company !== '' ? $company : '—') . "\nТелефон: {$phone}\nEmail: {$email}\n\nСообщение:\n{$message}\n";

$boundary = 'bnd_' . bin2hex(random_bytes(12));
$headers = [];
$headers[] = 'From: Team Lab <' . MAIL_FROM . '>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: multipart/mixed; boundary="' . $boundary . '"';

$body = "--{$boundary}\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n";
$body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
$body .= "<html><body>";
$body .= "<h2>Новая заявка с teamlabsoftware.ru</h2>";
$body .= "<p><strong>Имя:</strong> {$safeName}</p>";
$body .= "<p><strong>Компания:</strong> {$safeCompany}</p>";
$body .= "<p><strong>Телефон:</strong> {$safePhone}</p>";
$body .= "<p><strong>Email:</strong> {$safeEmail}</p>";
$body .= "<p><strong>Сообщение:</strong><br>{$safeMessage}</p>";
$body .= "<hr><pre>" . htmlspecialchars($bodyText, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . "</pre>";
$body .= "</body></html>\r\n";

if ($attachment !== null) {
    $body .= "--{$boundary}\r\n";
    $body .= 'Content-Type: ' . $attachment['mime'] . '; name="' . $attachment['name'] . "\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= 'Content-Disposition: attachment; filename="' . $attachment['name'] . "\"\r\n\r\n";
    $body .= chunk_split(base64_encode($attachment['content'])) . "\r\n";
}

$body .= "--{$boundary}--\r\n";

$sent = @mail(MAIL_TO, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Не удалось отправить. Напишите на info@sniper-search.ru'], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode(['ok' => true, 'message' => 'Заявка отправлена. Свяжемся с вами скоро.'], JSON_UNESCAPED_UNICODE);
