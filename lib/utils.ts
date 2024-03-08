import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Error handler
export const handleError = (error: unknown) => {
  if (error instanceof Error) {
    console.error(error.message);
    throw new Error(error.message);
  } else if (typeof error === 'string') {
    console.error(error);
    throw new Error(error);
  } else {
    console.error('An error occurred');
    throw new Error(`unknown error ${JSON.stringify(error)}`);
  }
};
