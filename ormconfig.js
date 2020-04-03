module.exports = [
  {
    name: 'development',
    type: 'postgres',
    database: 'scorecompanion',
    synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  },
  {
    name: 'production',
    type: 'postgres',
    synchronize: true,
    logging: false,
    url: process.env.DATABASE_URL,
  },
];
