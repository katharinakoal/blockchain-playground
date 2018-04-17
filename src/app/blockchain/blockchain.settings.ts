export const Settings = {
  difficultyLevel: 4,
  difficultyPattern: () => '0'.repeat(Settings.difficultyLevel),
  hashAlgorithm: 'sha256',
  maximumNonce: 500000,
  rootBlockHash: '0'.repeat(64),
  transactionsPerBlock: 4
};
