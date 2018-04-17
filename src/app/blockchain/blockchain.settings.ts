export const Settings = {
  difficultyLevel: 4,
  difficultyPattern: () => '0'.repeat(Settings.difficultyLevel),
  hashAlgorithm: 'sha256',
  maximumNonce: 500000,
  transactionsPerBlock: 4
};
