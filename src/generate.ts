export class Generator implements Iterable<number> {
  private counter = 7000000;

  constructor(public count: number = 1000000) {}

  public [Symbol.iterator]() {
    return {
      next: () => {
        // if (this.counter > this.counter + ) {
        //   throw new Error('The maximum counter value has been reached');
        // }

        return {
          done: this.counter === this.count,
          value: this.counter++,
        };
      },
    };
  }
}
