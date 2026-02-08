-- Add latitude and longitude columns to restaurants table
-- Run this FIRST before running restaurants_insert.sql

ALTER TABLE restaurants 
ADD COLUMN IF NOT EXISTS latitude DOUBLE PRECISION,
ADD COLUMN IF NOT EXISTS longitude DOUBLE PRECISION;

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'restaurants' 
ORDER BY ordinal_position;
