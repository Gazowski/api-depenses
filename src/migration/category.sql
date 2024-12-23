-- public.category definition

-- Drop table

-- DROP TABLE public.category;

CREATE TABLE public.category (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	title varchar NOT NULL,
	color varchar NOT NULL,
	groupe varchar NOT NULL,
	keywords text NOT NULL,
	CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY (id),
	CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE (name)
);