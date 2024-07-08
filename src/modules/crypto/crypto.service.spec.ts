import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let cryptoService: CryptoService;

  beforeEach(() => {
    cryptoService = new CryptoService();
  });

  describe('createHash', () => {
    it('should hash the text', async () => {
      const text = 'password';
      const hash = await cryptoService.createHash(text);
      expect(hash).toBeDefined();
      expect(hash.length).toBeGreaterThan(0);
    });

    it('should hash the text with custom rounds', async () => {
      const text = 'password';
      const rounds = 12;
      const hash = await cryptoService.createHash(text, rounds);
      expect(hash).toBeDefined();
      expect(hash.length).toBeGreaterThan(0);
    });
  });

  describe('compareHashes', () => {
    it('should compare correctly hashed text', async () => {
      const text = 'password';
      const hash = await cryptoService.createHash(text);
      const result = await cryptoService.compareHashes(text, hash);
      expect(result).toBe(true);
    });

    it('should fail to compare incorrect hashed text', async () => {
      const text = 'password';
      const hash = await cryptoService.createHash(text);
      const result = await cryptoService.compareHashes('wrongPassword', hash);
      expect(result).toBe(false);
    });
  });
});
