DROP TABLE IF EXISTS user_profile CASCADE;
DROP TABLE IF EXISTS vlogs CASCADE;


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
    uploadTimestamp TIMESTAMP NOT NULL DEFAULT NOW(),
    image varchar(100)
);

GRANT ALL ON TABLE public.user_Profile to vlog_app;
GRANT ALL ON TABLE public.vlogs to vlog_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO vlog_app;