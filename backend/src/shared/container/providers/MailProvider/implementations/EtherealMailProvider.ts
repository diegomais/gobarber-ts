import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host, // use ethereal host
        port: account.smtp.port, // use ethereal port
        secure: account.smtp.secure, // use ethereal secure
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass, // generated ethereal password
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({
    from,
    subject,
    templateData,
    to,
  }: ISendMailDTO): Promise<void> {
    const info = await this.client.sendMail({
      from: {
        address: from?.email || 'team@gobarber.com',
        name: from?.name || 'GoBarber Team',
      },
      to: { address: to.email, name: to.name },
      html: await this.mailTemplateProvider.parse(templateData),
      subject,
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
