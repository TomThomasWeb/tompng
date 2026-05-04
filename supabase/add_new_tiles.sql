-- Visitor counter
CREATE TABLE IF NOT EXISTS visit_counts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  count integer NOT NULL DEFAULT 0
);
ALTER TABLE visit_counts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read visits" ON visit_counts FOR SELECT USING (true);
CREATE POLICY "Auth write visits" ON visit_counts FOR ALL USING (auth.role() = 'authenticated');
INSERT INTO visit_counts (count) VALUES (0);

-- Quote content (add to site_settings or separate table)
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS quote_text text DEFAULT 'The best time to plant a tree was 20 years ago. The second best time is now.';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS quote_author text DEFAULT 'Chinese proverb';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS whatsapp_url text DEFAULT '';
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS facebook_url text DEFAULT '';
