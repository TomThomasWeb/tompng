-- Mood / status tile
CREATE TABLE IF NOT EXISTS mood_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  emoji text NOT NULL DEFAULT '🎯',
  status text NOT NULL DEFAULT 'Building things',
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE mood_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read mood" ON mood_content FOR SELECT USING (true);
CREATE POLICY "Auth write mood" ON mood_content FOR ALL USING (auth.role() = 'authenticated');

-- Reading list tile
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'want',
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE books ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read books" ON books FOR SELECT USING (true);
CREATE POLICY "Auth write books" ON books FOR ALL USING (auth.role() = 'authenticated');

-- Seed a default mood row
INSERT INTO mood_content (emoji, status) VALUES ('🎯', 'Building things') ON CONFLICT DO NOTHING;
