-- Run this in Supabase SQL Editor to add game art support
ALTER TABLE games ADD COLUMN IF NOT EXISTS image_url text DEFAULT '';

-- Profile image for bio
ALTER TABLE bio_content ADD COLUMN IF NOT EXISTS profile_image text DEFAULT '';

-- Platform tag for games
ALTER TABLE games ADD COLUMN IF NOT EXISTS platform text DEFAULT '';
