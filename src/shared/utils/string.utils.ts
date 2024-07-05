export class StringExtension {
  static special(str: string) {
    return str.replace(/[^a-zA-Z0-9 ]/g, '')
  }

  static capitalize(text: string) {
    text = text.toLowerCase()
    return text
      .split(' ')
      .map((value: string) => value.charAt(0).toUpperCase() + value.slice(1))
  }
}
