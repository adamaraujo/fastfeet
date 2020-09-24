export default function generateLetter(name) {
  const names = name.split(' ');

  const letters =
    names.length > 1
      ? names[0].charAt(0) + names[1].charAt(0)
      : names[0].charAt(0) + names[0].charAt(1);

  return letters.toUpperCase();
}
