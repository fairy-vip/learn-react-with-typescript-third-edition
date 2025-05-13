// 'use server';

import { createClient } from '@libsql/client';
import { postsSchema, postSchema } from './schema';

export async function getAllPosts() {
  console.log('--------------------------------');
  console.log(process.env.DB_URL);
  console.log(process.env.NODE_ENV)
  console.log('--------------------------------');

  const client = createClient({
    url: process.env.DB_URL ?? '',
  });
  const data = await client.execute(
    'SELECT id, title, description FROM posts',
  );
  client.close();
  return postsSchema.parse(data.rows);
}

export async function getFilteredPosts(criteria: string) {
  const client = createClient({
    url: process.env.DB_URL ?? '',
  });
  debugger;
  const data = await client.execute({
    sql: 'SELECT id, title, description FROM posts WHERE title LIKE ?',
    args: [`%${criteria}%`],
  });
  client.close();
  return postsSchema.parse(data.rows);
}

export async function getPost(id: number) {
  const client = createClient({
    url: process.env.DB_URL ?? '',
  });
  const data = await client.execute({
    sql: 'SELECT id, title, description FROM posts WHERE id = ?',
    args: [id],
  });
  client.close();
  if (data.rows.length === 0) {
    return undefined;
  }
  return postSchema.parse(data.rows[0]);
}
