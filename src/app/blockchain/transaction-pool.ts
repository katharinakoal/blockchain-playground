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

  public getTransactions(quantity: number): T[] {
    return this.hasTransactions(quantity) ? this.queue.splice(0, quantity) : null;
  }

  public hasTransactions(quantity: number = 1): boolean {
    return Array.isArray(this.queue) && this.queue.length >= quantity;
  }
}
