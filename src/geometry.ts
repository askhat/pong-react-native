export class Segment {
  0: number;
  1: number;
  constructor(...[a, b]: [number, number]) {
    this[0] = a;
    this[1] = b;
  }
  contain(s: Segment) {
    return this[0] <= s[0] && s[1] <= this[1];
  }
}

export class Point extends Segment {
  constructor(value: number) {
    super(value, value);
  }
}
