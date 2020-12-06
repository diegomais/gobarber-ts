# Password recovery

** RF **

- [x] User must be able to recover password informing their e-mail.
- [x] User must receive an email with password recovery instructions.
- [x] User must be able to reset their password.

** RNF **

- [x] Use Ethereal to test email service in development environment.
- [x] Use Amazon SES email service for production environment.
- [ ] Sending of emails must happen in background (background job).

** RN **

- [x] Link sent by email to reset password, must expire in 2h.
- [x] User needs to confirm the new password when resetting their password.

# Profile update

** RF **

- [x] User must be able to update their name, email and password.

** RN **

- [x] User cannot change their email to an email already used.
- [x] User needs to inform the old password to update their password.
- [x] User needs to confirm the new password to update their password.

# Provider panel

** RF **

- [x] Provider must be able to list their schedules for a specific day.
- [x] Provider must receive a notification whenever there is a new appointment.
- [ ] Provider must be able to view unread notifications.

** RNF **

- [x] Provider's schedules for the day must be stored in cache.
- [x] Provider's notifications must be stored in MongoDB.
- [ ] Service provider notifications must be sent in real time using Socket.io.

** RN **

- [ ] Notification must have a read or unread status so that the provider can control.

# Service scheduling

** RF **

- [x] User must be able to list all registered service providers.
- [x] User must be able to list the days of a month with at least one available time from a provider.
- [x] User must be able to list available times on a specific day for a provider.
- [x] User must be able to make a new appointment with a provider.

** RNF **

- [ ] List of providers must be cached.

** RN **

- [x] Appointments must be available between 8 am and 6 pm (First at 8 am, last at 5 pm).
- [x] User cannot schedule an appointment that has already passed.
- [x] User cannot schedule services with himself.
- [x] Each appointment must last exactly 1 hour.
- [x] User cannot schedule at an already busy time.
