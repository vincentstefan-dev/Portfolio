// app/coolstuff/thesis-paper-dataset/utils/arrayText.ts

export function arrayToText(value: string[]) {
  return value.join(", ");
}

export function textToArray(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}