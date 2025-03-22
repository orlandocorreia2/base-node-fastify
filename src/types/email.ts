export type CreateUserMailProps = {
  name: string;
  email: string;
  link: string;
};

export type SendMailProps = {
  from?: string;
  to: string;
  subject: string;
  html: any;
  text: string;
};
