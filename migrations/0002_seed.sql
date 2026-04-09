-- Seed data for Khurram Proteins
-- NOTE: Replace the admin password hash with a real bcrypt hash before deploying.
-- The hash below is for the password "changeme" (bcrypt, 10 rounds).
-- Generate a new hash with: node -e "console.log(require('bcryptjs').hashSync('yourpassword', 10))"

INSERT OR IGNORE INTO admin_users (email, password_hash) VALUES
  ('admin@khurramproteins.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy');

-- Initial site settings
INSERT OR IGNORE INTO site_settings (key, value) VALUES
  ('hero_title', 'High-quality eggs at wholesale prices'),
  ('hero_subtitle', 'Supplying restaurants, cafes, bakeries and independent supermarkets across Pakistan with reliable delivery since 1983.'),
  ('hero_cta_text', 'Discover more'),
  ('phone', '+92 300 0000000'),
  ('email', 'info@khurramproteins.com'),
  ('address', 'Lahore, Pakistan'),
  ('whatsapp_link', 'https://wa.me/923000000000'),
  ('facebook_url', ''),
  ('instagram_url', ''),
  ('youtube_url', ''),
  ('footer_text', 'Premium poultry farming and wholesale egg supply serving businesses across Pakistan since 1983.'),
  ('meta_title', 'Khurram Proteins — Premium Poultry & Wholesale Eggs'),
  ('meta_description', 'Premium poultry farming and wholesale egg supply serving restaurants, cafes and bakeries across Pakistan since 1983.');

-- Initial about content
INSERT OR IGNORE INTO about_content (id, founder_name, founder_title, short_bio, full_story, mission_statement) VALUES (
  1,
  'Dr. Malik Khurram Shahzad Khokhar',
  'Founder & CEO',
  'Leading the poultry farming industry with decades of experience. Committed to providing premium quality products at fair wholesale prices.',
  '## Our Story

Founded in 1983, Khurram Proteins has grown from a small family farm into one of the most trusted names in wholesale egg supply across Pakistan. Under the leadership of Dr. Malik Khurram Shahzad Khokhar, the business has always held firm to a simple principle: deliver the best quality poultry products at fair wholesale prices, and stand by every single order.

## Four Decades of Trust

For over forty years, we have supplied restaurants, cafes, bakeries and independent supermarkets across the Lahore region and beyond. Our reputation has been built on consistency, reliability, and a deep commitment to the health and welfare of our flocks.

## Looking Forward

Today we continue to invest in modern farming practices while holding on to the values that built this business — honesty, hard work, and a long-term view of every relationship we build.',
  'To provide the highest quality poultry products at competitive wholesale prices while maintaining the trust of our partners through reliability, consistency and care.'
);

-- Initial services
INSERT OR IGNORE INTO services (title, description, icon_name, display_order) VALUES
  ('Wholesale Supply', 'Bulk egg orders for restaurants, cafes, bakeries and independent supermarkets at competitive wholesale rates.', 'egg', 1),
  ('Reliable Delivery', 'Consistent on-time delivery across the Lahore region and surrounding areas, tailored to your schedule.', 'truck', 2),
  ('Quality Assured', 'Every batch monitored and tested against agricultural quality standards before it leaves our farm.', 'shield-check', 3);
