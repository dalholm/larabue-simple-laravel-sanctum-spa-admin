<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewUserNotification extends Notification
{
    use Queueable;

    protected $password;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($password)
    {
        $this->password = $password;
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
        return (new MailMessage)
            ->subject(trans('notifications.new_user.subject', [
                'app_name' => env('APP_NAME')
            ]))
            ->greeting(trans('notifications.new_user.greeting', [
                'name' => $notifiable->name
            ]))
            ->line(trans('notifications.new_user.first_line', [
                'app_name' => env('APP_NAME')
            ]))
            ->line(trans('notifications.new_user.username', [
                'email' => $notifiable->email
            ]))
            ->line(trans('notifications.new_user.password', [
                'password' => $this->password
            ]))
            ->action(trans('notifications.new_user.action', [
                'app_name' => env('APP_NAME')
            ]), url('/'))
            ->line(trans('notifications.new_user.last_line'))
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
