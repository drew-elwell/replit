import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_bennco';
const EMAILJS_TEMPLATE_ID = 'template_contact';
const EMAILJS_PUBLIC_KEY = 'your_public_key_here';

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

export interface EmailData {
  to_email: string;
  from_name: string;
  from_email: string;
  phone: string;
  subject: string;
  preferred_datetime: string;
  main_focus: string;
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: data.to_email,
      from_name: data.from_name,
      from_email: data.from_email,
      phone: data.phone,
      subject: data.subject,
      preferred_datetime: data.preferred_datetime,
      main_focus: data.main_focus,
      reply_to: data.from_email
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response.status, response.text);
    return response.status === 200;
  } catch (error) {
    console.error('Email sending failed:', error);
    return false;
  }
};