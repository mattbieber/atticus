import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function assertIsTypeNode(
  target: EventTarget | null,
): asserts target is Node {
  if (!target || !('nodeType' in target)) throw new Error('Expected node')
}

