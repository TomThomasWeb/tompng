-- Run this in Supabase SQL Editor to add game art support
ALTER TABLE games ADD COLUMN IF NOT EXISTS image_url text DEFAULT '';
