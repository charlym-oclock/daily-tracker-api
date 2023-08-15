BEGIN;

DROP TABLE IF EXISTS "day_task", "user_day", "day_model_task", "day_model", "task", "user", "day", "week", "year";
DROP DOMAIN IF EXISTS valid_email;

CREATE TABLE "year" (
  "year" INT PRIMARY KEY NOT NULL
);

CREATE TABLE "week" (
  "id" SERIAL PRIMARY KEY,
  "week_num" INT NOT NULL,
  "year" INT NOT NULL
);

CREATE TABLE "day" (
  "date" DATE PRIMARY KEY NOT NULL,
  "week_day" VARCHAR(16),
  "week_id" INT REFERENCES "week" ("id")
);

CREATE DOMAIN valid_email AS VARCHAR(254)
  CHECK (
    VALUE ~ '[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+'
  );

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(48) NOT NULL,
  "email" valid_email NOT NULL UNIQUE,
  "password" VARCHAR(64) NOT NULL,
  "profile_picture" VARCHAR(254),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "task" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(64) NOT NULL,
  "description" VARCHAR(254),
  "type" VARCHAR(64) NOT NULL DEFAULT 'one-time',
  "icon" VARCHAR(16),
  "owner_id" INT REFERENCES "user" ("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "day_model" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(64) NOT NULL UNIQUE,
  "owner_id" INT REFERENCES "user" ("id"),
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "day_model_task" (
  "day_model_id" INT NOT NULL REFERENCES "day_model" ("id"),
  "task_id" INT NOT NULL REFERENCES "task" ("id"),
  PRIMARY KEY ("day_model_id", "task_id")
);

CREATE TABLE "user_day" (
  "user_id" INT REFERENCES "user" ("id"),
  "date" DATE REFERENCES "day" ("date"),
  "percent_done" INT DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY ("user_id", "date")
);

CREATE TABLE "day_task" (
  "date" DATE REFERENCES "day" ("date"),
  "task_id" INT REFERENCES "task" ("id"),
  "hour" TIME,
  "is_done" BOOLEAN NOT NULL DEFAULT FALSE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMIT;
