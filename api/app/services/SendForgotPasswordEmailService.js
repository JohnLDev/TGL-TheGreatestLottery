
const Mail = use('Mail')
const Env = use('Env')
class SendForgotPasswordEmailService {
  async execute ({ email, token, id, name }) {
    const sendEmail = Env.get('MAIL')

    await Mail.send('emails.forgot_password', { name, token, url: `http://127.0.0.1:3000/forgot/${token}` }, (message) => {
      message.to(email).from(sendEmail).subject('Reset Password on Lottery')
    })
  }
}

module.exports = new SendForgotPasswordEmailService()
