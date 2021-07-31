export default interface IStorageProvider {
  deleteFile(file: string): Promise<void>;
  saveFile(file: string): Promise<string>;
}
