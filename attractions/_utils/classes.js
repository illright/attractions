const consecutiveSpace = / {2,}/;

export function stripClassWhitespace(classString) {
  return classString.replace(consecutiveSpace, ' ').trimRight();
}

export default function classes(...args) {
  return args.filter(cls => !!cls).join(' ');
}
