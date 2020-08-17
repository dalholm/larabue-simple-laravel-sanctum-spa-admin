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
        return ( new MailMessage )
            ->subject( 'Återställ lösenord' )
            ->greeting('Hej')
            ->line( "Vi har skickat det här e-postmeddelandet eftersom vi fick en begäran om återställning av lösenord för ditt konto." )
            ->action( 'Återställ lösenord', $link )
            ->line( "Den här länken för återställning av lösenord upphör att gälla om ".config('auth.passwords.users.expire')." minuter" )
            ->line( "Om du inte begärde återställning av lösenord krävs ingen ytterligare åtgärd." );
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
