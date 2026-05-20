
export function calculateE1RM(weight: number, reps: number) {
  return weight * (1 + reps / 30);
}

export function calculateReps(target: number, weight: number) {
  return 30 * ((target / weight) - 1);
}

export function calculateWeight(target: number, reps: number) {
  return target / (1 + reps / 30);
}
