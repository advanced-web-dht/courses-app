export type GradeType = Array<{ csId: number; studentId: string; point: number }>;

export const findStudent = (grades: GradeType, studentId: string): number => {
  const targetGrade = grades.find((grade) => grade.studentId === studentId);
  if (targetGrade) {
    return targetGrade.csId;
  }
  return 0;
};
