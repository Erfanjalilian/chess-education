export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    role: 'master' | 'student';
    bio?: string;
    avatar?: string;
    createdAt: string;
  }
  
  export interface Course {
    id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    masterId: string;
    imageUrl?: string;
    createdAt: string;
  }
  
  export interface Purchase {
    id: string;
    userId: string;
    courseId: string;
    amountPaid: number;
    commissionAmount: number;
    masterEarnings: number;
    createdAt: string;
  }
  
  export interface Review {
    id: string;
    courseId: string;
    userId: string;
    rating: number;
    comment: string;
    createdAt: string;
  }
  
  export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    error?: string;
    data?: T;
    user?: T;
    token?: string;
  }