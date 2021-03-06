<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ForgotPasswordMail extends Notification
{
    use Queueable;

    protected $token;
    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $link = url( "/reset-password/".$this->token );

        return (new MailMessage)
            ->subject(trans('notifications.forgot_password.subject', [
                'app_name' => env('APP_NAME')
            ]))
            ->greeting(trans('notifications.forgot_password.greeting'))
            ->line(trans('notifications.forgot_password.first_line', [
                'app_name' => env('APP_NAME')
            ]))
            ->action(trans('notifications.forgot_password.action'), $link)
            ->line(trans('notifications.forgot_password.last_line'))
            ->salutation(trans('notifications.new_user.salutation', [
                'app_name' => env('APP_NAME')
            ]));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
