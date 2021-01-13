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
-- Name: media_source; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media_source (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "idMedia" uuid NOT NULL,
    source character varying NOT NULL,
    title character varying,
    description character varying,
    duration integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL,
    "idMediaSourceGroup" uuid,
    "order" integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.media_source OWNER TO postgres;

--
-- Name: media_source_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media_source_groups (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.media_source_groups OWNER TO postgres;

--
-- Name: media_source_users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media_source_users (
    "idUser" uuid NOT NULL,
    "idMediaSource" uuid NOT NULL,
    "isWatched" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.media_source_users OWNER TO postgres;

--
-- Data for Name: media_source; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media_source (id, "idMedia", source, title, description, duration, "createdAt", "updatedAt", "idMediaSourceGroup", "order") FROM stdin;
16fdc996-fa23-41a5-89aa-114d0ec90e61	db028373-c442-47b9-b887-4283f9b81cb3	https://youtu.be/NpEaa2P7qZI	Piloto	Rick leva Morty em uma viagem a outra dimensão para procurar sementes especiais. Jerry e Beth discutem a influência de Rick sobre o filho deles.	1320	2021-01-12 22:46:40.793487	2021-01-12 22:46:40.793487	2b3d2064-c511-411b-a331-14d8c2e1ac31	0
142ee077-d7a7-476f-a997-868b78f2f674	beb3c270-d0c2-422c-bca4-0a9c827961f5	https://youtu.be/NpEaa2P7qZI	\N	\N	8280	2021-01-12 22:48:54.213269	2021-01-12 22:48:54.213269	\N	0
63cc9aee-cba3-4f20-b912-28ff7f362352	db028373-c442-47b9-b887-4283f9b81cb3	https://youtu.be/NpEaa2P7qZI	A Revolta dos Meeseeks	Morty não aguenta mais as loucuras de Rick e decide fazer uma aventura mais segura. Jerry chama criaturas estranhas para ajudá-lo no golfe.	1320	2021-01-12 22:46:40.793487	2021-01-12 22:46:40.793487	2b3d2064-c511-411b-a331-14d8c2e1ac31	4
680f0f4b-8648-41e9-982d-add7e20dc2c9	db028373-c442-47b9-b887-4283f9b81cb3	https://youtu.be/NpEaa2P7qZI	Cãortador de grama	Rick cria um aparelho para deixar Snuffles mais inteligente, mas a experiência não dá certo. Rick e Morty invadem os sonhos de outra pessoa.	1320	2021-01-12 22:46:40.793487	2021-01-12 22:46:40.793487	2b3d2064-c511-411b-a331-14d8c2e1ac31	1
99d060b7-6c8c-4478-b125-ac9487333999	db028373-c442-47b9-b887-4283f9b81cb3	https://youtu.be/NpEaa2P7qZI	Realidade Virtual	Alienígenas enviam Rick, Morty e Jerry para uma realidade alternativa. Rick tenta tirá-los de lá enquanto Jerry cria um slogan para maçãs.	1320	2021-01-12 22:46:40.793487	2021-01-12 22:46:40.793487	2b3d2064-c511-411b-a331-14d8c2e1ac31	3
f555eca9-7fb5-45f2-a33c-c8b2b3036625	db028373-c442-47b9-b887-4283f9b81cb3	https://youtu.be/NpEaa2P7qZI	Parque das Bactérias	Morty se vê em um parque temático de doenças infecciosas dentro de um homem. Os pais de Jerry apresentam alguém especial.	1320	2021-01-12 22:46:40.793487	2021-01-12 22:46:40.793487	2b3d2064-c511-411b-a331-14d8c2e1ac31	2
4f59f009-ecb1-4de9-be94-77bb851e1341	db028373-c442-47b9-b887-4283f9b81cb3	https://youtu.be/NpEaa2P7qZI	Fratura temporal	Rick consegue descongelar o tempo, mas agora ele, Morty e Summer vão precisar enfrentar uma dimensão paralela que foi desencadeada sem querer.	1320	2021-01-13 01:25:02.208871	2021-01-13 01:25:02.208871	6110e371-fb15-4f14-bca2-1541d874f535	0
35852206-7960-4631-913b-6441f290d864	db028373-c442-47b9-b887-4283f9b81cb3	https://youtu.be/NpEaa2P7qZI	Expresso da meia-noite	Depois que Rick vende uma arma a um assassino alienígena para bancar sua tarde de jogos eletrônicos, Morty é obrigado a impedir que o tal ET cometa um crime.	1320	2021-01-13 01:25:02.208871	2021-01-13 01:25:02.208871	6110e371-fb15-4f14-bca2-1541d874f535	1
\.


--
-- Data for Name: media_source_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media_source_groups (id, name, "createdAt", "updatedAt") FROM stdin;
2b3d2064-c511-411b-a331-14d8c2e1ac31	Temporada 1	2021-01-12 22:43:51.543679	2021-01-12 22:43:51.543679
6110e371-fb15-4f14-bca2-1541d874f535	Temporada 2	2021-01-12 22:43:51.543679	2021-01-12 22:43:51.543679
93b8d8f5-fbbf-4ffb-8e43-d42948878b3f	Temporada 3	2021-01-12 22:43:51.543679	2021-01-12 22:43:51.543679
5088a8ea-0850-433e-acf7-571c9123a8be	Temporada 4	2021-01-12 22:43:51.543679	2021-01-12 22:43:51.543679
7869780f-42b3-4ba6-8f25-fdce851e534a	Temporada 5	2021-01-12 22:43:51.543679	2021-01-12 22:43:51.543679
8df4b0b9-b602-4e2a-86f5-511e14419f6f	Temporada 6	2021-01-12 22:43:51.543679	2021-01-12 22:43:51.543679
66f4f89b-cb01-4da2-af44-fe7e0ec1303a	Temporada 7	2021-01-12 22:43:51.543679	2021-01-12 22:43:51.543679
63625e6f-9672-4931-9ecf-7b15affc5ed4	Temporada 8	2021-01-12 22:43:51.543679	2021-01-12 22:43:51.543679
1f831066-3730-4183-b124-312ac7d1e926	Temporada 9	2021-01-12 22:43:51.543679	2021-01-12 22:43:51.543679
99d18076-227f-413d-b225-4b1b778bfbaa	Temporada 10	2021-01-12 22:43:51.543679	2021-01-12 22:43:51.543679
\.


--
-- Data for Name: media_source_users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media_source_users ("idUser", "idMediaSource", "isWatched", "createdAt", "updatedAt") FROM stdin;
5c3f4735-5bbb-4369-804f-e44795a19552	16fdc996-fa23-41a5-89aa-114d0ec90e61	t	2021-01-12 23:14:17.864009	2021-01-12 23:14:17.954122
5c3f4735-5bbb-4369-804f-e44795a19552	63cc9aee-cba3-4f20-b912-28ff7f362352	t	2021-01-13 01:00:37.762032	2021-01-13 01:00:37.814959
5c3f4735-5bbb-4369-804f-e44795a19552	142ee077-d7a7-476f-a997-868b78f2f674	t	2021-01-13 01:15:44.716303	2021-01-13 01:15:44.762974
\.


--
-- Name: media_source_users PK_1ef6ec6cbf081d5ff98180d6412; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_source_users
    ADD CONSTRAINT "PK_1ef6ec6cbf081d5ff98180d6412" PRIMARY KEY ("idUser", "idMediaSource");


--
-- Name: media_source PK_799022f398a02fcb55d9af94685; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_source
    ADD CONSTRAINT "PK_799022f398a02fcb55d9af94685" PRIMARY KEY (id);


--
-- Name: media_source_groups PK_7e3eaee056766af118e9d39a039; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_source_groups
    ADD CONSTRAINT "PK_7e3eaee056766af118e9d39a039" PRIMARY KEY (id);


--
-- Name: media_source_users FK_304803c9130b8dfe8e5503bfa31; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_source_users
    ADD CONSTRAINT "FK_304803c9130b8dfe8e5503bfa31" FOREIGN KEY ("idMediaSource") REFERENCES public.media_source(id);


--
-- Name: media_source FK_67808a0d86d22b1e62216a92927; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media_source
    ADD CONSTRAINT "FK_67808a0d86d22b1e62216a92927" FOREIGN KEY ("idMediaSourceGroup") REFERENCES public.media_source_groups(id);


--
-- PostgreSQL database dump complete
--

