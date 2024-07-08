type ITrustedMetadata = {
  username: string;
};

export class AccessTokenPayload {
  constructor(
    private readonly sub: string,
    private readonly metadata?: ITrustedMetadata,
  ) {}
}
