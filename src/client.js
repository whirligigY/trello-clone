import { createClient } from "@supabase/supabase-js";

//TODO
/**
 * move to .env file
 *
 * not working.... can't pull from .env at the moment
 **/

// const supabase = createClient(
//   process.env.REACT_APP_SUPABASE_URL,
//   process.env.REACT_APP_SUPABASE_PUBLIC_KEY
// );

// export { supabase };

const REACT_APP_SUPABASE_URL = "https://fyddxppvkwjfodizkufq.supabase.co";
const REACT_APP_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzU3MjM2MiwiZXhwIjoxOTU5MTQ4MzYyfQ.iUtbYryTUVh97Si6frEULo3Q6tC939oPasbAhJ4h2VQ";

const supabase = createClient(
  REACT_APP_SUPABASE_URL,
  REACT_APP_SUPABASE_ANON_KEY
);

export { supabase };
