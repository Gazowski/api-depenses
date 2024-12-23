-- public."transaction" definition

-- Drop table

-- DROP TABLE public."transaction";

CREATE TABLE public."transaction" (
	id serial4 NOT NULL,
	"transactionId" varchar NOT NULL,
	"transactionDate" date NOT NULL,
	description varchar NOT NULL,
	amount numeric(10, 2) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"categoryId" int4 NULL,
	CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY (id),
	CONSTRAINT "UQ_bdcf2c929b61c0935576652d9b0" UNIQUE ("transactionId"),
	CONSTRAINT "FK_d3951864751c5812e70d033978d" FOREIGN KEY ("categoryId") REFERENCES public.category(id)
);