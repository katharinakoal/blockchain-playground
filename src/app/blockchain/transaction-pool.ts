export class TransactionPool<T> {
  private readonly queue: Array<T>;

  constructor(transactions?: T[]) {
    this.queue = new Array<T>();
    if (transactions) {
      this.addTransactions(...transactions);
    }
  }

  public addTransactions(...transactions: T[]): void {
    this.queue.push(...transactions);
  }

  public getTransaction(): T {
    return this.hasTransactions ? this.queue.shift() : null;
  }

  public hasTransactions(): boolean {
    return Array.isArray(this.queue) && !!this.queue.length;
  }
}
