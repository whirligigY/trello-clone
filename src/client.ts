import { createClient } from '@supabase/supabase-js';

const envURL: string = process.env.REACT_APP_SUPABASE_URL
  ? process.env.REACT_APP_SUPABASE_URL
  : '';
const envKey: string = process.env.REACT_APP_SUPABASE_ANON_KEY
  ? process.env.REACT_APP_SUPABASE_ANON_KEY
  : '';

const supabase = createClient(envURL, envKey);

export { supabase };
