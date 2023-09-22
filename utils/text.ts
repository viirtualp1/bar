const MAX_LENGTH = 103

export function truncate(str: string) {
  if (str.length < 20) {
    return str
  }

  return `${str.slice(0, MAX_LENGTH)}...`
}
