export function userIdPatternValidation(text: string): boolean {
  const regex = /^[a-zA-Z0-9]+$/;
  return !regex.test(text);
}
export function userNamePatternValidation(text: string): boolean {
  const regex = /^[a-zA-Z ]+$/;
  return !regex.test(text);
}
