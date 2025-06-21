export default function validateDOB(dobString, minAge = 18, maxAge = 100) {
  // Check valid date format (YYYY-MM-DD or ISO)
  const dob = new Date(dobString);
  if (isNaN(dob.getTime())) {
    return { valid: false, reason: "Invalid date format" };
  }

  const today = new Date();
  const age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();

  // Adjust age if birthday hasn't occurred yet this year
  const realAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;

  if (realAge < minAge) {
    return { valid: false, reason: `Age must be at least ${minAge}` };
  }
  if (realAge > maxAge) {
    return { valid: false, reason: `Age cannot be more than ${maxAge}` };
  }

  return { valid: true, age: realAge };
}
