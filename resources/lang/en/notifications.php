<?php

return [
    'new_user' => [
        'subject' => 'Welcome to :app_name',
        'greeting' => 'Welcome :name,',
        'first_line' => 'A new account has been created for you on :app_name.',
        'username' => 'Username: :email',
        'password' => 'Password: :password',
        'action' => 'Login to :app_name',
        'last_line' => 'Thank you!',
        'salutation' => 'Best regards, :app_name',
    ],
    'forgot_password' => [
        'subject' => 'Reset your password on :app_name',
        'greeting' => 'Reset your password',
        'first_line' => 'Someone has requested to reset your password. If this was you, click on the link below to reset it. This link will expire in 24 hours, and is only usable once.',
        'action' => 'Reset password',
        'last_line' => 'If you don’t want to reset your password, just ignore this message and nothing will change.',
        'salutation' => 'Best regards, :app_name',
    ],
];
