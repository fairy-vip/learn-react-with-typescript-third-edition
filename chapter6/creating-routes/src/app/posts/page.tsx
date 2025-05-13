import { posts } from '@/data/posts';
import { red } from 'next/dist/lib/picocolors';

export default function Posts() {
  return (
    <main>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <span style={{ color: 'red' }}>{post.title}</span>
            <p style={{ borderStyle: 'solid', borderWidth: 1, borderColor: 'red', padding: 5 }}>
              {post.description}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
