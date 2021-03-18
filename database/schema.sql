DROP TABLE IF EXISTS user_profile CASCADE;
DROP TABLE IF EXISTS vlogs CASCADE;
DROP TABLE IF EXISTS session CASCADE;


CREATE TABLE user_profile (
    user_id SERIAL PRIMARY KEY,
    username varchar(10) NOT NULL,
    password varchar(70) NOT NULL
);

CREATE TABLE vlogs (
    vlog_id SERIAL PRIMARY KEY,
    title varchar(50),
    description varchar(1000),
    link varchar(100),
    uploadTimestamp TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
	"sess" json NOT NULL,
	"expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

GRANT ALL ON TABLE public.user_Profile to vlog_app;
GRANT ALL ON TABLE public.vlogs to vlog_app;
GRANT ALL ON TABLE public.session to vlog_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO vlog_app;

INSERT into user_profile(username, password) VALUES('nadun', '$2a$10$kOW6.ySlaD3rXfV/FbWEPemyH328qPfOEM5zfg3AEP2pRBsHa50we');