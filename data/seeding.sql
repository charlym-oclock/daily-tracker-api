BEGIN;

-- 1. Seed Years
INSERT INTO "year" ("year") VALUES (2023);

-- 2. Seed Weeks
INSERT INTO "week" ("id", "week_num", "year") VALUES 
(1, 31, 2023),
(2, 32, 2023),
(3, 33, 2023);

-- 3. Seed Days
INSERT INTO "day" ("date", "week_id") VALUES 
('31/07/2023', 1),
('01/08/2023', 1),
('02/08/2023', 1),
('03/08/2023', 1),
('04/08/2023', 1),
('05/08/2023', 1),
('06/08/2023', 1),
('07/08/2023', 2),
('08/08/2023', 2),
('09/08/2023', 2),
('10/08/2023', 2),
('11/08/2023', 2),
('12/08/2023', 2),
('13/08/2023', 2),
('14/08/2023', 3),
('15/08/2023', 3),
('16/08/2023', 3),
('17/08/2023', 3);

-- 4. Seed Users
INSERT INTO "user" ("id", "username", "email", "password") VALUES 
(1, 'Charly', 'charly@local.com', 'password123'),
(2, 'Pipouille', 'pipouille@local.com', 'password123');

-- 5. Seed Tasks
INSERT INTO "task" ("id", "title", "owner_id") VALUES 
-- Charly's tasks
(1, 'Empty the dishwasher', 1),
(2, 'Wake up at 7am', 1),
(3, 'Water the plants', 1),
(4, 'Read for 30 minutes', 1),
(5, 'Go for a morning walk', 1),
(6, 'Make the bed', 1),
(7, 'Prepare breakfast', 1),
(8, 'Respond to emails', 1),
(9, 'Attend morning meetings', 1),
(10, 'Work on the project', 1),
(11, 'Take a short break', 1),
(12, 'Prepare lunch', 1),
(13, 'Meditate for 15 minutes', 1),
(14, 'Call a friend or family', 1),
(15, 'Do 20 minutes of exercise', 1),
(16, 'Take out the trash', 1),
(17, 'Pick up groceries', 1),
(18, 'Cook dinner', 1),
(19, 'Watch a TV show', 1),
(20, 'Write in the journal', 1),
(21, 'Listen to music or podcast', 1),
(22, 'Plan for the next day', 1),
(23, 'Brush teeth and skincare routine', 1),
(24, 'Go to bed by 11pm', 1),
-- Pipouille's tasks
(25, 'Nap in the sunbeam', 2),
(26, 'Knock a vase off the table', 2),
(27, 'Watch birds from the window', 2),
(28, 'Play with a yarn ball', 2),
(29, 'Hide in a cardboard box', 2),
(30, 'Purr loudly while getting petted', 2),
(31, 'Try to catch the red dot (laser pointer)', 2),
(32, 'Eat some catnip', 2),
(33, 'Stretch and do some kitty yoga', 2),
(34, 'Demand treats', 2),
(35, 'Scratch the furniture', 2),
(36, 'Drink water from the tap', 2),
(37, 'Climb to the highest point in the room', 2),
(38, 'Chase own tail', 2),
(39, 'Stare at a wall for no apparent reason', 2),
(40, 'Bring a toy to the human', 2),
(41, 'Groom meticulously', 2),
(42, 'Inspect a new bag or box', 2),
(43, 'Listen intently to mysterious sounds', 2),
(44, 'Sleep in the laundry basket', 2),
(45, 'Sit on the computer keyboard', 2),
(46, 'Stalk a bug', 2),
(47, 'Give the human a disdainful look', 2),
(48, 'Dream of chasing mice', 2);

-- 6. Seed Day Models
INSERT INTO "day_model" ("id", "name", "owner_id") VALUES 
(1, 'Weekday', 1),
(2, 'Weekend', 1),
(3, 'Daily', 2),
(4, 'On vacation', 2);

-- 7. Seed Day Model Tasks for Charly's models
INSERT INTO "day_model_task" ("day_model_id", "task_id") VALUES 
-- Add tasks for model 1 for Charly
(1, 3),
(1, 8),
(1, 13),
(1, 17),
(1, 21),
(1, 24),
-- Add tasks for model 2 for Charly
(2, 5),
(2, 7),
(2, 9),
(2, 11),
(2, 14),
(2, 16),
(2, 22),
(2, 23);


-- 7. Seed Day Model Tasks for Pipouille's models
INSERT INTO "day_model_task" ("day_model_id", "task_id") VALUES 
-- Add tasks for model 1 for Pipouille
(3, 4),
(3, 6),
(3, 10),
(3, 18),
(3, 20),
-- Add tasks for model 2 for Pipouille
(4, 2),
(4, 5),
(4, 7),
(4, 9),
(4, 12),
(4, 13),
(4, 15),
(4, 17),
(4, 19),
(4, 21),
(4, 23),
(4, 24);

-- 8. Charly's user_day entries
INSERT INTO "user_day" ("user_id", "date") VALUES 
(1, '01/08/2023'),
(1, '02/08/2023'),
(1, '03/08/2023'),
(1, '04/08/2023'),
(1, '05/08/2023'),
(1, '06/08/2023'),
(1, '07/08/2023'),
(1, '08/08/2023'),
(1, '09/08/2023'),
(1, '10/08/2023'),
(1, '11/08/2023'),
(1, '12/08/2023'),
(1, '13/08/2023'),
(1, '14/08/2023'),
(1, '15/08/2023'),
(1, '16/08/2023'),
(1, '17/08/2023'),
--8.  Pipouille's user_day entries
(2, '01/08/2023'),
(2, '02/08/2023'),
(2, '03/08/2023'),
(2, '04/08/2023'),
(2, '05/08/2023'),
(2, '06/08/2023'),
(2, '07/08/2023'),
(2, '08/08/2023'),
(2, '09/08/2023'),
(2, '10/08/2023'),
(2, '11/08/2023'),
(2, '12/08/2023'),
(2, '13/08/2023'),
(2, '14/08/2023'),
(2, '15/08/2023'),
(2, '16/08/2023'),
(2, '17/08/2023');

-- 9. Seed Day Tasks for Charly
INSERT INTO "day_task" ("date", "task_id", "is_done") VALUES 
-- Day 1
('01/08/2023', 1, TRUE),
('01/08/2023', 2, TRUE),
('01/08/2023', 3, FALSE),
('01/08/2023', 4, TRUE),
-- Day 2
('02/08/2023', 5, FALSE),
('02/08/2023', 6, FALSE),
('02/08/2023', 7, TRUE),
-- Day 3
('03/08/2023', 8, TRUE),
('03/08/2023', 9, TRUE),
-- Day 4
('04/08/2023', 10, TRUE),
('04/08/2023', 11, FALSE),
('04/08/2023', 12, TRUE),
('04/08/2023', 13, TRUE),
-- Day 5
('05/08/2023', 14, TRUE),
('05/08/2023', 15, TRUE),
('05/08/2023', 16, TRUE),
-- Seeding for Pipouille
-- Day 1
('01/08/2023', 25, TRUE),
('01/08/2023', 26, FALSE),
('01/08/2023', 27, TRUE),
-- Day 2
('02/08/2023', 28, TRUE),
('02/08/2023', 29, FALSE),
('02/08/2023', 30, TRUE),
-- Day 3
('03/08/2023', 31, TRUE),
('03/08/2023', 32, TRUE),
('03/08/2023', 33, FALSE),
-- Day 4
('04/08/2023', 34, TRUE),
('04/08/2023', 35, FALSE),
('04/08/2023', 36, TRUE),
-- Day 5
('05/08/2023', 37, TRUE),
('05/08/2023', 38, TRUE);

COMMIT;