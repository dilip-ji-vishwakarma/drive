// scheduler.ts

import { ref, onValue } from 'firebase/database';
import nodemailer from 'nodemailer';
import { database } from '../firebaseConfig';

// Function to check and send notifications
const checkAndNotify = async () => {
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0]; // Format as YYYY-MM-DD
  const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // Format as HH:MM

  const eventsRef = ref(database, 'ashma');
  onValue(eventsRef, async (snapshot) => {
    const events = snapshot.val();

    for (const key in events) {
      const event = events[key];
      
      const eventDate = new Date(event.start).toISOString().split('T')[0];
      const eventTime = event.notification_time;

      if (currentDate === eventDate && currentTime === eventTime) {
        await sendNotification(event);
      }
    }
  });
};

// Function to send notifications
const sendNotification = async (event: { notification_email: string; notification_message: string; notification_platform: string; whatsapp_number: string }) => {
  if (event.notification_platform === 'Email' && event.notification_email) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dilipvishwakarma7878@gmail.com',
        pass: 'RohitDilipDeepak@31707878',
      },
    });

    const mailOptions = {
      from: 'dilipvishwakarma7878@gmail.com',
      to: event.notification_email,
      subject: 'Event Reminder',
      text: event.notification_message,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email notification sent successfully');
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  } else if (event.notification_platform === 'Whatsapp' && event.whatsapp_number) {
    // Implement WhatsApp notification sending logic here
    console.log(`WhatsApp notification to ${event.whatsapp_number}: ${event.notification_message}`);
  }
};

export { checkAndNotify };
