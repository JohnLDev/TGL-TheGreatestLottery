
const Mail = use('Mail')
const Env = use('Env')

class SendConfirmationEmailService {
  async execute ({ email, token, id, name }) {
    const link = Env.get('APP_URL')
    const sendEmail = Env.get('MAIL')

    await Mail.send('emails.confirmation_email', { name, token, url: `${link}/confirm/${id}` }, (message) => {
      message.to(email).from(sendEmail).subject('Welcome to Lottery')
    })
  }
}

module.exports = new SendConfirmationEmailService()
