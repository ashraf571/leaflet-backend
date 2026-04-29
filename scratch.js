const { Client } = require('pg');

async function check() {
  const client = new Client({
    user: 'postgres',
    password: '@Postgres@12',
    host: 'localhost',
    port: 5432,
    database: 'leafletPrectice',
  });
  await client.connect();
  
  const res1 = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'geoData' AND table_name = 'pakistan_provinces';`);
  console.log('pakistan_provinces columns:', res1.rows);
  
  const res2 = await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'geoData' AND table_name = 'pakistan_boundry';`);
  console.log('pakistan_boundry columns:', res2.rows);
  
  await client.end();
}

check().catch(console.error);
