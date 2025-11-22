import { apiFetch } from "@/lib/api";
import { StandardResponse } from "@/utils/types/api";
import { API_ROUTES } from "../index";

export interface Subscription {
  id?: string;
  planType: "free" | "premium" | "advanced";
  subscriptionStatus: string;
  nextBillingDate: string | null;
  billingCycle?: "monthly" | "yearly";
  amount?: number;
  currency?: string;
  meta?: any;
}

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: string;
  planType?: string;
  billingCycle?: string;
  createdAt: string;
  paidAt?: string | null;
  providerRef?: string | null;
  payments?: Payment[];
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  provider: string;
  createdAt: string;
}

export interface CreateSubscriptionPayload {
  businessId: string;
  planType: "free" | "premium" | "advanced";
  billingCycle: "monthly" | "yearly";
  email: string;
  authorizationCode?: string;
}

export interface SubscriptionAuthorizationResponse {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
  message: string;
}

export const SubscriptionService = {
  async getSubscription(
    businessId: string
  ): Promise<StandardResponse<Subscription>> {
    const url = API_ROUTES.getSubscription(businessId);
    return apiFetch<StandardResponse<Subscription>>(url, {
      method: "GET",
    });
  },

  async createSubscription(
    payload: CreateSubscriptionPayload
  ): Promise<
    StandardResponse<Subscription | SubscriptionAuthorizationResponse>
  > {
    const url = API_ROUTES.createSubscription();
    return apiFetch<StandardResponse<Subscription | SubscriptionAuthorizationResponse>>(
      url,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  },

  async cancelSubscription(
    businessId: string
  ): Promise<StandardResponse<{ message: string }>> {
    const url = API_ROUTES.cancelSubscription(businessId);
    return apiFetch<StandardResponse<{ message: string }>>(url, {
      method: "POST",
    });
  },

  async getInvoices(
    businessId: string,
    options?: { page?: number; limit?: number }
  ): Promise<
    StandardResponse<{
      data: Invoice[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>
  > {
    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const url = `${API_ROUTES.getSubscription(businessId)}/invoices?page=${page}&limit=${limit}`;
    return apiFetch<
      StandardResponse<{
        data: Invoice[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          totalPages: number;
        };
      }>
    >(url, {
      method: "GET",
    });
  },
};

