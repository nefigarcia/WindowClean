export interface FormData {
  windows?: '1-5' | '6-10' | '11-20';
  serviceType?: 'Interior' | 'Exterior' | 'Interior & Exterior';
  price?: number;
  acceptPrice?: boolean;
  scheduleDate?: Date;
  email?: string;
  phone: string;
}
