import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://lphgeqzuyoxsckjjbxyi.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwaGdlcXp1eW94c2NrampieHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyOTUxMzEsImV4cCI6MjA2NDg3MTEzMX0.OdsihjJ6e66AH7-4vHZ3rkGxYqKtjtluSj5y7udBAkQ";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
