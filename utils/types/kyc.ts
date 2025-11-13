export interface IKYC {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "NOT_SUBMITTED";
  nin?: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
