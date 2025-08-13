import * as bcrypt from 'bcrypt';

export class PasswordUtils {
  private static readonly saltRounds: number = 10;

  static async hashPasswordSync(pass: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    return await bcrypt.hash(pass, salt);
  }

  static async comparePasswordSync(
    pass: string,
    hashed: string,
  ): Promise<boolean> {
    return await bcrypt.compare(pass, hashed);
  }
}
