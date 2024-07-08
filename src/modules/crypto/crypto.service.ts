import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  async createHash(text: string, rounds = 10) {
    return await bcrypt.hash(text, rounds);
  }

  async compareHashes(text: string, hash: string) {
    return await bcrypt.compare(text, hash);
  }
}
