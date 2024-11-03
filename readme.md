# Project Title

This is a brief description of your project.

## Prerequisites

Make sure you have Docker installed on your machine. If not, you can download it from [Docker's official website](https://www.docker.com/products/docker-desktop).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

1. Clone the repository:

```
- git clone api-depenses
- Navigate to the project directory:
    api-depenses
- Build the Docker image (bien rajouter le point !!!):
    docker build -t api-depenses .
- Run the Docker container:
    docker run -p 3003:3003 -d api-depenses
```

## DÉMARRER L'APPLICATION
    - lancer docker-desktop (raccourcie sur le bureau)
    - s'assurer que le container 'api-depenses' roule
    - faire la commande `docker compose up --build` dans le terminal
    - faire la commande `npm run dev`
    - Sous le projet Nuxt ,  faire `npm run dev`
    - (voir si on peut supprimer le service nuxt-app, je pense qu'il fait redondance)

## MIGRATION DB
ancienne db MYSQL

TABLE TRANSACTION
- id, varchar
- transactionDate, varchar (DD/MM/YYYY)
- year, int
- month, int
- description, varchar
- amount, double
- categorieId, varchar (slug de la categorie, clé étrangère)
- createdAt, datetime
- updateAt, datetime

varchar utf8mb4_unicode_ci

TABLE CATEGORIE
- id, varchar (slug de la categorie, clé )
- name, varchar
- keywords, varchar (1000)
- color, varchar
- groupe, varchar


nouvelle DB (POSTGRESQL)

TABLE TRANSACTION
- id, serial4 (s'incrémente a chaque nouvelle transaction)
- transactionId, varchar 
- transactionDate , date (YYYY-MM-DD)
- description, varchar
- amount, numeric(10,2)
- createAt, timestamp
- updatedAt, timestamp
- categoryId, int4 (id de la category, clé étrangère)

TABLE CATEGORIE
- id, serial4 (s'incrémente a chaque nouvelle transaction(commence à 10), clé)
- name, varchar (slug de la categorie)
- title, varchar
- color, varchar
- groupe, varchar
- keywords, text







