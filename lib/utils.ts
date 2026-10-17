export { cn } from "cn"

// Deterministic short hash — same input hamesha same output dega
export const shortHash = (input: string): string => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // 32-bit integer me convert
  }
  return Math.abs(hash).toString(36); // base36 → short alphanumeric string
};