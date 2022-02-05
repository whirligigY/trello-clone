import { createClient } from "@supabase/supabase-js";
import { RealtimeClient } from "@supabase/realtime-js";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

//TODO: setup realitme listener
/**
 *
 **/

console.log(`client loaded`);

export { supabase };
