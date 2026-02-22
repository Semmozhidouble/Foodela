-- Insert test user for development/testing
-- Password is 'test123' (hashed using BCrypt)
INSERT INTO users (id, email, password, full_name, phone_number, created_at, updated_at)
VALUES (
    1,
    'test@foodela.com',
    '$2a$10$xXxXxXxXxXxXxXxXxXxXxuN7K9h3qKlO5E3gKGJh.vWvQ0LN8YK.K',
    'Test User',
    '+1234567890',
    NOW(),
    NOW()
)
ON CONFLICT (id) DO NOTHING;

-- Reset sequence if needed
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
