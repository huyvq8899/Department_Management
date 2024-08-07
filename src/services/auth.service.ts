export interface AccessTokenResponse {
    tokenType: string;
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
  }
  
import { LoginRequest } from '@/models/LoginRequest';
import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL; 

export const login = async (loginRequest: LoginRequest): Promise<AccessTokenResponse> => {
  const response = await axios.post<AccessTokenResponse>(`${API_URL}/api/Users/login`, loginRequest);
  return response.data;
};
