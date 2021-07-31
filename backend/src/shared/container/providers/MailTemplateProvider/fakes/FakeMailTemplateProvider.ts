import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ variables }: IParseMailTemplateDTO): Promise<string> {
    return `Mail variables: ${JSON.stringify(variables)}`;
  }
}
