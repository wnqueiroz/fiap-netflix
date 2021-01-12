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
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    salt character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, salt, "createdAt", "updatedAt") FROM stdin;
5c3f4735-5bbb-4369-804f-e44795a19552	Preview User	preview@fiap.com.br	$2b$10$b647X6BkmY2jRen8ST3giujCrmQXP4j3dTVEw45/6AOvdoIq7pdaO	$2b$10$b647X6BkmY2jRen8ST3giu	2021-01-12 15:34:08.379375	2021-01-12 15:34:08.379375
9d8751da-69ec-4108-9479-10d1b9a75a85	Fulano	fulano@fiap.com.br	$2b$10$c.lHamVDOYwDkM.0Fnp.Iu4SjMbLN8J3w6GTyX1/2jsr5Ioslzp7K	$2b$10$c.lHamVDOYwDkM.0Fnp.Iu	2021-01-12 16:25:48.679732	2021-01-12 16:25:48.679732
280ce2cc-92ee-450a-b715-193989ef57da	Ciclano	ciclano@fiap.com.br	$2b$10$emnYlSGPT7mDzkWOpP8xDuOp5GbyKqascU8XyhH3A3A.fKPFcOEFy	$2b$10$emnYlSGPT7mDzkWOpP8xDu	2021-01-12 16:26:00.858684	2021-01-12 16:26:00.858684
\.


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- PostgreSQL database dump complete
--

