-- Seed farmer
INSERT INTO farmer (id, name, location) VALUES (1, 'Rajesh Kumar', 'Mandya, Karnataka');

-- Seed farms (match frontend mockFarms)
INSERT INTO farm (id, farmer_id, name, crop_type, area) VALUES (1, 1, 'Mysuru Fields', 'Sugarcane', 50);
INSERT INTO farm (id, farmer_id, name, crop_type, area) VALUES (2, 1, 'Hassan Valley', 'Ragi', 75);
INSERT INTO farm (id, farmer_id, name, crop_type, area) VALUES (3, 1, 'Tumkur Plains', 'Rice', 60);

-- Seed irrigations
INSERT INTO irrigation (farm_id, start_time, duration, status) VALUES (1, '2024-11-01 06:00', 60, 'Completed');
INSERT INTO irrigation (farm_id, start_time, duration, status) VALUES (2, '2024-11-02 07:00', 45, 'Completed');
INSERT INTO irrigation (farm_id, start_time, duration, status) VALUES (1, '2024-11-03 06:30', 60, 'Scheduled');

-- Seed crop prices
INSERT INTO crop_price (name, price, unit, updated_at) VALUES ('Sugarcane', 2850, 'per ton', now());
INSERT INTO crop_price (name, price, unit, updated_at) VALUES ('Ragi', 3200, 'per quintal', now());
INSERT INTO crop_price (name, price, unit, updated_at) VALUES ('Rice', 2100, 'per quintal', now());
