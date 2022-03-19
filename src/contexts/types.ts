/* eslint-disable @typescript-eslint/no-explicit-any */
export type Provider =
  | 'azure'
  | 'bitbucket'
  | 'facebook'
  | 'github'
  | 'gitlab'
  | 'google'
  | 'twitter'
  | 'apple'
  | 'discord'
  | 'twitch'
  | 'spotify'
  | 'slack';

export type AuthChangeEvent =
  | 'PASSWORD_RECOVERY'
  | 'SIGNED_IN'
  | 'SIGNED_OUT'
  | 'TOKEN_REFRESHED'
  | 'USER_UPDATED'
  | 'USER_DELETED';

export interface ApiError {
  message: string;
  status: number;
}

export interface Session {
  provider_token?: string | null;
  access_token: string;
  expires_in?: number;
  expires_at?: number;
  refresh_token?: string;
  token_type: string;
  user: User | null;
}

export interface UserIdentity {
  id: string;
  user_id: string;
  identity_data: {
    [key: string]: any;
  };
  provider: string;
  created_at: string;
  last_sign_in_at: string;
  updated_at?: string;
}

export interface User {
  id: string;
  app_metadata: {
    provider?: string;
    [key: string]: any;
  };
  user_metadata: {
    [key: string]: any;
  };
  aud: string;
  confirmation_sent_at?: string;
  recovery_sent_at?: string;
  invited_at?: string;
  action_link?: string;
  email?: string;
  phone?: string;
  created_at: string;
  confirmed_at?: string;
  email_confirmed_at?: string;
  phone_confirmed_at?: string;
  last_sign_in_at?: string;
  role?: string;
  updated_at?: string;
  identities?: UserIdentity[];
}

export interface UserAttributes {
  email?: string;
  password?: string;
  email_change_token?: string;
  data?: object;
}

export interface AdminUserAttributes extends UserAttributes {
  user_metadata?: object;
  app_metadata?: object;
  email_confirm?: boolean;
  phone_confirm?: boolean;
}

export interface Subscription {
  id: string;
  callback: (event: AuthChangeEvent, session: Session | null) => void;
  unsubscribe: () => void;
}

export interface CookieOptions {
  name?: string;
  lifetime?: number;
  domain?: string;
  path?: string;
  sameSite?: string;
}

export interface UserCredentials {
  email?: string;
  phone?: string;
  password?: string;
  refreshToken?: string;
  provider?: Provider;
}

export interface VerifyOTPParams {
  phone: string;
  token: string;
}
