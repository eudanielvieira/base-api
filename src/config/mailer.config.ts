import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';
import { MailDto } from 'src/shared/mail.dto';

export default class MailerConfig {
  private static configSMTP(smtpData: MailDto) {
    const { smtpServer, defaultMail, mailPassword } = smtpData;
    return `smtps://${defaultMail}:${mailPassword}@${smtpServer}`;
  }

  static getMailerConfig(configService: ConfigService): MailerOptions {
    const smtpData = {
      smtpServer: configService.get<string>('SMTP_SERVER'),
      defaultMail: configService.get<string>('DEFAULT_MAIL'),
      mailPassword: configService.get<string>('MAIL_PASSWORD'),
    };

    return {
      transport: this.configSMTP(smtpData),
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          extName: '.hbs',
          layoutsDir: process.cwd() + '/templates/',
        },
      },
    };
  }
}

export const mailerConfig = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<MailerOptions> =>
    MailerConfig.getMailerConfig(configService),
  inject: [ConfigService],
};
