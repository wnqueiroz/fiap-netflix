--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1 (Debian 13.1-1.pgdg100+1)
-- Dumped by pg_dump version 13.1 (Debian 13.1-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.genres (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.genres OWNER TO postgres;

--
-- Name: keywords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.keywords (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.keywords OWNER TO postgres;

--
-- Name: media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "idMediaType" uuid NOT NULL
);


ALTER TABLE public.media OWNER TO postgres;

--
-- Name: media_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media_categories (
    "idCategory" uuid NOT NULL,
    "idMedia" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.media_categories OWNER TO postgres;

--
-- Name: media_genres; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media_genres (
    "idGenre" uuid NOT NULL,
    "idMedia" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.media_genres OWNER TO postgres;

--
-- Name: media_keywords; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media_keywords (
    "idKeyword" uuid NOT NULL,
    "idMedia" uuid NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.media_keywords OWNER TO postgres;

--
-- Name: media_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media_types (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.media_types OWNER TO postgres;

--
-- Name: media_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media_users (
    "idUser" uuid NOT NULL,
    "idMedia" uuid NOT NULL,
    "isLiked" boolean DEFAULT false NOT NULL,
    "isWatchLater" boolean DEFAULT false NOT NULL,
    "isWatched" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.media_users OWNER TO postgres;

--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, "createdAt", "updatedAt") FROM stdin;
beede9a5-f5d8-45d3-9f00-59af7e303279	Policial	2021-01-13 00:02:32.607068	2021-01-13 00:02:32.607068
b7d6227d-8de7-49c7-bf6b-8687264815ed	Familia	2021-01-13 00:02:32.607068	2021-01-13 00:02:32.607068
9e58c078-8f80-41c9-9b74-8873e6e1c4bf	Guerra	2021-01-13 00:02:32.607068	2021-01-13 00:02:32.607068
d5eb190a-d980-49ab-ba3a-8707c91ea10e	Histórico	2021-01-13 00:02:32.607068	2021-01-13 00:02:32.607068
69128e3a-b799-44d1-b693-09cac17366ad	Em Alta	2021-01-13 00:02:32.607068	2021-01-13 00:02:32.607068
ebea144a-2d56-44dd-9b59-87b50f09052e	Aventura	2021-01-13 00:02:32.607068	2021-01-13 00:02:32.607068
d44bda44-6d76-41a2-9416-0ff2f991ee86	Emocionante	2021-01-13 00:02:32.607068	2021-01-13 00:02:32.607068
fc99d199-ea8e-4962-9dd1-4fc6826c2241	Suspense	2021-01-12 23:04:14.623252	2021-01-12 23:04:14.623252
a6684ede-d696-4e4a-8c2a-99999b14067c	Animação	2021-01-12 23:04:14.623252	2021-01-12 23:04:14.623252
\.


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.genres (id, name, "createdAt", "updatedAt") FROM stdin;
cfb0f1d7-c5df-4afe-a21b-2539a7cd06cf	Ação	2021-01-12 23:06:37.205212	2021-01-12 23:06:37.205212
f49f8fb8-3800-4316-8afb-59150cbb9826	Aventura	2021-01-12 23:06:37.205212	2021-01-12 23:06:37.205212
3a16e7f5-3e8f-483c-9173-ceed135080d1	Animação	2021-01-12 23:06:37.205212	2021-01-12 23:06:37.205212
f7c82594-eece-47bf-8bc2-e70429573732	Comédia	2021-01-12 23:06:37.205212	2021-01-12 23:06:37.205212
8b25639b-38fb-4275-b260-1bba22326e86	Documentário	2021-01-12 23:06:37.205212	2021-01-12 23:06:37.205212
25c8f4cf-871a-4aa9-8adb-d5e6ce337d1d	Drama	2021-01-12 23:06:37.205212	2021-01-12 23:06:37.205212
fe5d472a-8efc-4593-a343-9d93acb42fa6	Terror	2021-01-12 23:06:37.205212	2021-01-12 23:06:37.205212
a5c69244-804e-4e6a-8dce-de3ffc9d07fa	Musical	2021-01-12 23:06:37.205212	2021-01-12 23:06:37.205212
38f67686-4dbd-451a-b05b-e35417477bc5	Suspense	2021-01-12 23:06:37.205212	2021-01-12 23:06:37.205212
10c7e368-65d6-4bb1-a7eb-73d2530bc44b	Romance	2021-01-12 23:06:37.205212	2021-01-12 23:06:37.205212
\.


--
-- Data for Name: keywords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.keywords (id, name, "createdAt", "updatedAt") FROM stdin;
0662230b-d9b9-47cc-878f-04b1fb178890	carnaval	2021-01-12 23:54:06.672631	2021-01-12 23:54:06.672631
927d1d89-bbe5-4481-b012-5b7d80085cd4	rick	2021-01-12 23:54:06.672631	2021-01-12 23:54:06.672631
da4cc689-23ae-45b0-91ea-6f76fbc7f141	ciência	2021-01-12 23:54:06.672631	2021-01-12 23:54:06.672631
d07cd8cc-29a2-433e-82b8-753cae705718	espaço	2021-01-12 23:54:06.672631	2021-01-12 23:54:06.672631
ba9f465c-58f4-4235-85b5-271f4fb660cd	sem sentido	2021-01-12 23:54:06.672631	2021-01-12 23:54:06.672631
c8665ea8-c9b2-4150-9142-ce65e98b613f	nave	2021-01-12 23:54:06.672631	2021-01-12 23:54:06.672631
cc05d81f-d436-46f8-b995-03693afa9321	medo	2021-01-12 23:54:06.672631	2021-01-12 23:54:06.672631
ab5129b1-29bd-48f6-b089-ffa47b491e72	hospicio	2021-01-12 23:54:06.672631	2021-01-12 23:54:06.672631
3cf65eef-332b-4720-941b-b69e3b537c0b	DiCaprio	2021-01-12 23:54:06.672631	2021-01-12 23:54:06.672631
3f6fb55a-a0cb-4229-b9fb-f48deef49d86	ilha	2021-01-12 23:54:06.672631	2021-01-12 23:54:06.672631
ecc6b203-3ff1-430d-94cf-309c3b8e22cd	investigaçao	2021-01-12 23:54:06.672631	2021-01-12 23:54:06.672631
a3a92a0b-9680-4615-98db-8037345e690f	plot twist	2021-01-12 23:54:06.672631	2021-01-12 23:54:06.672631
4666c03e-b47e-4d83-8556-612a414f569d	misterio	2021-01-12 23:54:06.672631	2021-01-12 23:54:06.672631
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media (id, title, description, "createdAt", "updatedAt", "idMediaType") FROM stdin;
beb3c270-d0c2-422c-bca4-0a9c827961f5	Ilha do Medo	Ele está no hospital psiquiátrico para resolver um mistério. Não para questionar a própria noção da realidade.	2021-01-12 22:37:12.054155	2021-01-12 22:37:12.054155	f1822e41-dd28-4810-ace7-eb98983c4cbb
db028373-c442-47b9-b887-4283f9b81cb3	Rick and Morty	O brilhante cientista beberrão Rick sequestra Morty, seu neto aborrescente, para viver loucuras em outros mundos e dimensões alternativas.	2021-01-12 22:37:12.054155	2021-01-12 22:37:12.054155	9073e36c-13c5-448a-94f0-f9fdb5557d0c
\.


--
-- Data for Name: media_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media_categories ("idCategory", "idMedia", "createdAt", "updatedAt") FROM stdin;
fc99d199-ea8e-4962-9dd1-4fc6826c2241	beb3c270-d0c2-422c-bca4-0a9c827961f5	2021-01-12 23:07:05.2612	2021-01-12 23:07:05.2612
a6684ede-d696-4e4a-8c2a-99999b14067c	db028373-c442-47b9-b887-4283f9b81cb3	2021-01-12 23:07:05.2612	2021-01-12 23:07:05.2612
69128e3a-b799-44d1-b693-09cac17366ad	db028373-c442-47b9-b887-4283f9b81cb3	2021-01-13 00:09:01.795689	2021-01-13 00:09:01.795689
ebea144a-2d56-44dd-9b59-87b50f09052e	db028373-c442-47b9-b887-4283f9b81cb3	2021-01-13 00:09:01.795689	2021-01-13 00:09:01.795689
d44bda44-6d76-41a2-9416-0ff2f991ee86	db028373-c442-47b9-b887-4283f9b81cb3	2021-01-13 00:09:01.795689	2021-01-13 00:09:01.795689
beede9a5-f5d8-45d3-9f00-59af7e303279	beb3c270-d0c2-422c-bca4-0a9c827961f5	2021-01-13 00:09:01.795689	2021-01-13 00:09:01.795689
b7d6227d-8de7-49c7-bf6b-8687264815ed	beb3c270-d0c2-422c-bca4-0a9c827961f5	2021-01-13 00:09:01.795689	2021-01-13 00:09:01.795689
9e58c078-8f80-41c9-9b74-8873e6e1c4bf	beb3c270-d0c2-422c-bca4-0a9c827961f5	2021-01-13 00:09:01.795689	2021-01-13 00:09:01.795689
d5eb190a-d980-49ab-ba3a-8707c91ea10e	beb3c270-d0c2-422c-bca4-0a9c827961f5	2021-01-13 00:09:01.795689	2021-01-13 00:09:01.795689
69128e3a-b799-44d1-b693-09cac17366ad	beb3c270-d0c2-422c-bca4-0a9c827961f5	2021-01-13 00:09:01.795689	2021-01-13 00:09:01.795689
\.


--
-- Data for Name: media_genres; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media_genres ("idGenre", "idMedia", "createdAt", "updatedAt") FROM stdin;
3a16e7f5-3e8f-483c-9173-ceed135080d1	db028373-c442-47b9-b887-4283f9b81cb3	2021-01-13 02:36:11.125492	2021-01-13 02:36:11.125492
f7c82594-eece-47bf-8bc2-e70429573732	db028373-c442-47b9-b887-4283f9b81cb3	2021-01-13 02:36:11.125492	2021-01-13 02:36:11.125492
f49f8fb8-3800-4316-8afb-59150cbb9826	db028373-c442-47b9-b887-4283f9b81cb3	2021-01-13 02:36:11.125492	2021-01-13 02:36:11.125492
38f67686-4dbd-451a-b05b-e35417477bc5	beb3c270-d0c2-422c-bca4-0a9c827961f5	2021-01-13 02:36:11.125492	2021-01-13 02:36:11.125492
\.


--
-- Data for Name: media_keywords; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media_keywords ("idKeyword", "idMedia", "createdAt", "updatedAt") FROM stdin;
927d1d89-bbe5-4481-b012-5b7d80085cd4	db028373-c442-47b9-b887-4283f9b81cb3	2021-01-13 00:01:32.945779	2021-01-13 00:01:32.945779
da4cc689-23ae-45b0-91ea-6f76fbc7f141	db028373-c442-47b9-b887-4283f9b81cb3	2021-01-13 00:01:32.945779	2021-01-13 00:01:32.945779
d07cd8cc-29a2-433e-82b8-753cae705718	db028373-c442-47b9-b887-4283f9b81cb3	2021-01-13 00:01:32.945779	2021-01-13 00:01:32.945779
ba9f465c-58f4-4235-85b5-271f4fb660cd	db028373-c442-47b9-b887-4283f9b81cb3	2021-01-13 00:01:32.945779	2021-01-13 00:01:32.945779
c8665ea8-c9b2-4150-9142-ce65e98b613f	db028373-c442-47b9-b887-4283f9b81cb3	2021-01-13 00:01:32.945779	2021-01-13 00:01:32.945779
ab5129b1-29bd-48f6-b089-ffa47b491e72	db028373-c442-47b9-b887-4283f9b81cb3	2021-01-13 00:01:32.945779	2021-01-13 00:01:32.945779
4666c03e-b47e-4d83-8556-612a414f569d	db028373-c442-47b9-b887-4283f9b81cb3	2021-01-13 00:01:32.945779	2021-01-13 00:01:32.945779
cc05d81f-d436-46f8-b995-03693afa9321	beb3c270-d0c2-422c-bca4-0a9c827961f5	2021-01-13 00:01:32.945779	2021-01-13 00:01:32.945779
ab5129b1-29bd-48f6-b089-ffa47b491e72	beb3c270-d0c2-422c-bca4-0a9c827961f5	2021-01-13 00:01:32.945779	2021-01-13 00:01:32.945779
3cf65eef-332b-4720-941b-b69e3b537c0b	beb3c270-d0c2-422c-bca4-0a9c827961f5	2021-01-13 00:01:32.945779	2021-01-13 00:01:32.945779
3f6fb55a-a0cb-4229-b9fb-f48deef49d86	beb3c270-d0c2-422c-bca4-0a9c827961f5	2021-01-13 00:01:32.945779	2021-01-13 00:01:32.945779
ecc6b203-3ff1-430d-94cf-309c3b8e22cd	beb3c270-d0c2-422c-bca4-0a9c827961f5	2021-01-13 00:01:32.945779	2021-01-13 00:01:32.945779
a3a92a0b-9680-4615-98db-8037345e690f	beb3c270-d0c2-422c-bca4-0a9c827961f5	2021-01-13 00:01:32.945779	2021-01-13 00:01:32.945779
4666c03e-b47e-4d83-8556-612a414f569d	beb3c270-d0c2-422c-bca4-0a9c827961f5	2021-01-13 00:01:32.945779	2021-01-13 00:01:32.945779
\.


--
-- Data for Name: media_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media_types (id, name, "createdAt", "updatedAt") FROM stdin;
9073e36c-13c5-448a-94f0-f9fdb5557d0c	Séries	2021-01-12 22:35:58.999409	2021-01-12 22:35:58.999409
f1822e41-dd28-4810-ace7-eb98983c4cbb	Filmes	2021-01-12 22:35:58.999409	2021-01-12 22:35:58.999409
\.


--
-- Data for Name: media_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media_users ("idUser", "idMedia", "isLiked", "isWatchLater", "isWatched", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Name: media_users PK_1ecc5a6e03e7cb21737f6dc586f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_users
    ADD CONSTRAINT "PK_1ecc5a6e03e7cb21737f6dc586f" PRIMARY KEY ("idUser", "idMedia");


--
-- Name: categories PK_24dbc6126a28ff948da33e97d3b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY (id);


--
-- Name: media_types PK_2a2b8680adfec99273db3f81e1e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_types
    ADD CONSTRAINT "PK_2a2b8680adfec99273db3f81e1e" PRIMARY KEY (id);


--
-- Name: keywords PK_4aa660a7a585ed828da68f3c28e; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.keywords
    ADD CONSTRAINT "PK_4aa660a7a585ed828da68f3c28e" PRIMARY KEY (id);


--
-- Name: genres PK_80ecd718f0f00dde5d77a9be842; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT "PK_80ecd718f0f00dde5d77a9be842" PRIMARY KEY (id);


--
-- Name: media_categories PK_80efbcbc9818d4ae0e7e32d6343; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_categories
    ADD CONSTRAINT "PK_80efbcbc9818d4ae0e7e32d6343" PRIMARY KEY ("idCategory", "idMedia");


--
-- Name: media_genres PK_cb18b7e8941fe253eaf46e61deb; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_genres
    ADD CONSTRAINT "PK_cb18b7e8941fe253eaf46e61deb" PRIMARY KEY ("idGenre", "idMedia");


--
-- Name: media_keywords PK_e851c74fcf16da6267383914a7d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_keywords
    ADD CONSTRAINT "PK_e851c74fcf16da6267383914a7d" PRIMARY KEY ("idKeyword", "idMedia");


--
-- Name: media PK_f4e0fcac36e050de337b670d8bd; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT "PK_f4e0fcac36e050de337b670d8bd" PRIMARY KEY (id);


--
-- Name: media_genres FK_239544d511f0a73a29518cc2641; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_genres
    ADD CONSTRAINT "FK_239544d511f0a73a29518cc2641" FOREIGN KEY ("idGenre") REFERENCES public.genres(id);


--
-- Name: media_keywords FK_2b07abbdb27feac468acf22a432; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_keywords
    ADD CONSTRAINT "FK_2b07abbdb27feac468acf22a432" FOREIGN KEY ("idKeyword") REFERENCES public.keywords(id);


--
-- Name: media FK_6856631d5ac0928520d8026d0c4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT "FK_6856631d5ac0928520d8026d0c4" FOREIGN KEY ("idMediaType") REFERENCES public.media_types(id);


--
-- Name: media_categories FK_a3b64be033486383ee4dd2b45a7; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_categories
    ADD CONSTRAINT "FK_a3b64be033486383ee4dd2b45a7" FOREIGN KEY ("idMedia") REFERENCES public.media(id);


--
-- Name: media_users FK_b1897aef2fb80800d6955661f9c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_users
    ADD CONSTRAINT "FK_b1897aef2fb80800d6955661f9c" FOREIGN KEY ("idMedia") REFERENCES public.media(id);


--
-- Name: media_categories FK_cc35d3ba62b5c3c836446d526ae; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_categories
    ADD CONSTRAINT "FK_cc35d3ba62b5c3c836446d526ae" FOREIGN KEY ("idCategory") REFERENCES public.categories(id);


--
-- Name: media_keywords FK_ec9a8c4203e7309588f3c99b801; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_keywords
    ADD CONSTRAINT "FK_ec9a8c4203e7309588f3c99b801" FOREIGN KEY ("idMedia") REFERENCES public.media(id);


--
-- Name: media_genres FK_fc35e80cb16105c1d4eae6dbd4c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_genres
    ADD CONSTRAINT "FK_fc35e80cb16105c1d4eae6dbd4c" FOREIGN KEY ("idMedia") REFERENCES public.media(id);


--
-- PostgreSQL database dump complete
--

