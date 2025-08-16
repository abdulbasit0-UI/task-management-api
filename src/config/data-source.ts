import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'task_management_dev',
  synchronize: false, // Set to false for migrations
  logging: false,
  entities: ['src/**/*.entity{.js,.ts}'],
  migrations: ['src/migrations/*.ts'],
  migrationsTableName: 'migrations', // Optional: custom migration table name
});