export type EnvProps = {
  key:
    | 'APP'
    | 'PORT'
    | 'HOST'
    | 'ENVIRONMENT'
    | 'JWT_SECRET'
    | 'DATABASE_URL'
    | 'MAIL_HOST'
    | 'MAIL_PORT'
    | 'MAIL_SECURE'
    | 'MAIL_AUTH_USER'
    | 'MAIL_AUTH_PASS'
    | 'MAIL_FROM'
    | 'MAIL_FROM_DEVS'
    | 'FRONT_URL';
  defaultValue?: any;
};
