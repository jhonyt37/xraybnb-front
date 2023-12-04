export interface DetailInterviewModel {
  appointment: {
    candidateId: number,
    candidateName: string,
    date: string,
    description: string,
    id: number,
    interviewId: number,
    interviewName: string,
    officeId: number,
    officeName: string,
    processId: number,
    processName: string,
    title: string
  },
  conclusions: string,
  date: string,
  id: number,
  notes: string
}
