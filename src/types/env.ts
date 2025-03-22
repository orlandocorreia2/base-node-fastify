export type EnvProps = {
  key:
    | 'APP'
    | 'PORT'
    | 'HOST'
    | 'ENVIRONMENT'
    | 'JWT_SECRET'
    | 'TOKEN_EXPIRES_IN'
    | 'DATABASE_URL'
    | 'MAIL_SERVICE'
    | 'MAIL_AUTH_USER'
    | 'MAIL_AUTH_PASS'
    | 'MAIL_FROM'
    | 'MAIL_FROM_DEVS'
    | 'FRONT_URL';
  defaultValue?: any;
};
