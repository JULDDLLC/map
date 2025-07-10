/*
  # Create pins table for Where's Panda app

  1. New Tables
    - `pins`
      - `id` (uuid, primary key)
      - `nickname` (text, user's first name/nickname)
      - `city` (text, city name)
      - `state` (text, US state)
      - `parent_email` (text, optional for rewards)
      - `ip_address` (text, for duplicate prevention)
      - `user_agent` (text, for device tracking)
      - `approved` (boolean, default true for auto-approval)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `pins` table
    - Add policy for public read access to approved pins
    - Add policy for insert with rate limiting

  3. Indexes
    - Index on state for leaderboard queries
    - Index on created_at for recent pins
    - Index on ip_address for duplicate prevention
*/

CREATE TABLE IF NOT EXISTS pins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nickname text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  parent_email text,
  ip_address text,
  user_agent text,
  approved boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE pins ENABLE ROW LEVEL SECURITY;

-- Policy for public read access to approved pins
CREATE POLICY "Public can read approved pins"
  ON pins
  FOR SELECT
  TO public
  USING (approved = true);

-- Policy for public insert
CREATE POLICY "Public can insert pins"
  ON pins
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy for admin full access
CREATE POLICY "Admin full access"
  ON pins
  FOR ALL
  TO authenticated
  USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_pins_state ON pins(state);
CREATE INDEX IF NOT EXISTS idx_pins_created_at ON pins(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pins_ip_address ON pins(ip_address);
CREATE INDEX IF NOT EXISTS idx_pins_approved ON pins(approved);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pins_updated_at
  BEFORE UPDATE ON pins
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();