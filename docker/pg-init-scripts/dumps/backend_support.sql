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
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "idUser" character varying NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    "isOpen" boolean NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tickets (id, "idUser", title, description, "isOpen", "createdAt", "updatedAt") FROM stdin;
ca4850c1-cf56-4b25-9eec-f2cf3ba2e8d7	5c3f4735-5bbb-4369-804f-e44795a19552	Não consigo pagar a minha fatura	Acabou meu dinheiro 😅💸	t	2021-01-12 16:44:42.677216	2021-01-12 16:44:42.677216
54a549d1-ebf2-4369-8b12-3e073bf4df52	5c3f4735-5bbb-4369-804f-e44795a19552	Não consigo ver nada	Sei lá o que tá acontecendo, depois que eu fiquei cego, não consigo assistir	t	2021-01-13 22:54:22.007887	2021-01-13 22:54:22.007887
\.


--
-- Name: tickets PK_343bc942ae261cf7a1377f48fd0; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

