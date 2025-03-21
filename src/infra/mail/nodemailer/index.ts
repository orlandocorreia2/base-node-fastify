import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'ocnascimento2@gmail.com',
    pass: '',
  },
});

transport
  .sendMail({
    from: 'ocnascimento2@gmail.com',
    to: 'orlandocorreia2@hotmail.com',
    subject: 'Enviando email com Nodemailer',
    html: '<h1>Olá sistema de leiloes da caixa economica federal.</h1>',
    text: 'Texto alternativo',
  })
  .then(response => {
    console.log('Email enviado com sucesso!', response);
  })
  .catch(error => console.log('Erro ao enviar o email', error));
