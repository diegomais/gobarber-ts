interface IMailConfig {
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
  driver: 'ethereal' | 'ses';
}

export default {
  defaults: {
    from: {
      email: 'team@gobarber.com',
      name: 'GoBarber Team',
    },
  },
  driver: process.env.MAIL_DRIVER || 'ethereal',
} as IMailConfig;
