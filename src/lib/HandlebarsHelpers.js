export default {
  bold(text) {
    return `<strong>${text}</strong>`;
  },
  notEq(a, b) {
    return a !== b;
  },
  eq(a, b) {
    return a === b;
  },
  ifEquals(arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  },
};
