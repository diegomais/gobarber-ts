# Password recovery

** RF **

[ ] User must be able to recover password informing their e-mail.
[ ] User must receive an email with password recovery instructions.
[ ] User must be able to reset their password.

** RNF **

[ ] Use Mailtrap to test email service in development environment.
[ ] Use Amazon SES email service for production environment.
[ ] Sending of emails must happen in background (background job).

** RN **

[ ] Link sent by email to reset password, must expire in 2h.
[ ] User needs to confirm the new password when resetting their password.

# Profile update

** RF **

[ ] User must be able to update their name, email and password.

** RN **

[ ] User cannot change their email to an email already used.
[ ] User needs to inform the old password to update their password.
[ ] User needs to confirm the new password to update their password.

# Provider panel

** RF **

[ ] Provider must be able to list their schedules for a specific day.
[ ] Provider must receive a notification whenever there is a new appointment.
[ ] Provider must be able to view unread notifications.

** RNF **

[ ] Provider's schedules for the day must be stored in cache.
[ ] Provider's notifications must be stored in MongoDB.
[ ] Service provider notifications must be sent in real time using Socket.io.

** RN **

[ ] Notification must have a read or unread status so that the provider can control.

# Service scheduling

** RF **

[ ] User must be able to list all registered service providers.
[ ] User must be able to list the days of a month with at least one available time from a provider.
[ ] User must be able to list available times on a specific day for a provider.
[ ] User must be able to make a new appointment with a provider.

** RNF **

[ ] List of providers must be cached.

** RN **

[ ] Appointments must be available between 8 am and 6 pm (First at 8 am, last at 5 pm).
[ ] User cannot schedule an appointment that has already passed.
[ ] User cannot schedule services with himself.
[ ] Each appointment must last exactly 1 hour.
[ ] User cannot schedule at an already busy time.
