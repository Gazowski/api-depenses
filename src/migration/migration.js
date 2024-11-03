// migration-script.js
const { createConnection } = require('typeorm');
const { format, parse } = require('date-fns');

// Configuration des connexions
const sourceConfig = {

  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'nuxt-sd',
  charset: 'utf8mb4'
};

const targetConfig = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'gael',
  password: 'postgres123',
  database: 'releves-bancaires'
};

// Mapping des catégories
const categoryMapping = {
  'loan': 10,
  'income': 11,
  'investment': 12,
  'groceries': 13,
  'reccurent': 14,
  'home': 15,
  'health': 16,
  'leisure': 17,
  'unknown': 18,
  'blacklist': 19
};

async function migrateTransactions() {
  try {
    // Connexion aux deux bases de données
    const sourceConnection = await createConnection({
      name: 'source',
      ...sourceConfig
    });

    const targetConnection = await createConnection({
      name: 'target',
      ...targetConfig
    });

    // Récupération des transactions depuis la source
    const sourceTransactions = await sourceConnection.query(
      'SELECT * FROM TRANSACTION ORDER BY createdAt'
    );

    console.log(`Found ${sourceTransactions.length} transactions to migrate`);

    // Traitement et insertion des transactions
    for (const transaction of sourceTransactions) {
      try {
        // Conversion de la date
        const parsedDate = parse(transaction.transactionDate, 'MM/dd/yyyy', new Date());
        const formattedDate = format(parsedDate, 'yyyy-MM-dd');

        // Conversion du montant en numeric(10,2)
        const formattedAmount = parseFloat(transaction.amount).toFixed(2);

        // Récupération de l'ID de catégorie correspondant
        const newCategoryId = categoryMapping[transaction.categorieId] || 18; // 18 = unknown par défaut


        // Insertion dans la nouvelle base
        await targetConnection.query(
          `INSERT INTO "transaction" (
            "transactionId",
            "transactionDate",
            "description",
            "amount",
            "categoryId",
            "createdAt",
            "updatedAt"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
           [
            transaction.id,
            formattedDate,
            transaction.description,
            formattedAmount,
            newCategoryId,
            transaction.createdAt,
            transaction.updatedAt
          ]
        );

        console.log(`Migrated transaction: ${transaction.id}`);
      } catch (error) {
        console.error(`Error migrating transaction ${transaction.id}:`, error);
      }
    }

    console.log('Migration completed successfully');

    // Fermeture des connexions
    await sourceConnection.close();
    await targetConnection.close();

  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Exécution de la migration
migrateTransactions().then(() => {
  console.log('Migration process finished');
}).catch(error => {
  console.error('Fatal error during migration:', error);
});