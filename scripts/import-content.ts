import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface PostRow {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  categoryName: string;
  tags: string;
  metaTitle: string;
  metaDesc: string;
}

interface PageRow {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  displayOrder: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  metaTitle: string;
  metaDesc: string;
}

interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  description: string;
}

interface MediaRow {
  id: string;
  url: string;
  title: string;
  caption: string;
  mimeType: string;
  metadata: string;
}

function parseCSVLine(line: string): string[] {
  return line.split('|||');
}

async function importCategories() {
  console.log('📂 Importing categories...');

  const filePath = path.join(__dirname, '../wordpress-export/categories.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.trim().split('\n');

  const categoryMap: Map<string, string> = new Map();

  for (const line of lines) {
    const [id, name, slug, description] = parseCSVLine(line);

    const category = await prisma.category.upsert({
      where: { slug },
      update: {
        name,
        description: description || null,
      },
      create: {
        slug,
        name,
        description: description || null,
      },
    });

    categoryMap.set(name, category.id);
  }

  console.log(`✅ Imported ${categoryMap.size} categories`);
  return categoryMap;
}

async function importTags(allTagsSet: Set<string>) {
  console.log('🏷️  Importing tags...');

  const tagMap: Map<string, string> = new Map();

  for (const tagName of allTagsSet) {
    if (!tagName) continue;

    const slug = tagName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const tag = await prisma.tag.upsert({
      where: { slug },
      update: { name: tagName },
      create: {
        slug,
        name: tagName,
      },
    });

    tagMap.set(tagName, tag.id);
  }

  console.log(`✅ Imported ${tagMap.size} tags`);
  return tagMap;
}

async function importPosts(categoryMap: Map<string, string>, tagMap: Map<string, string>) {
  console.log('📝 Importing posts...');

  const filePath = path.join(__dirname, '../wordpress-export/posts.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.trim().split('\n');

  let imported = 0;
  let skipped = 0;

  for (const line of lines) {
    const [
      id,
      title,
      slug,
      content,
      excerpt,
      status,
      createdAt,
      updatedAt,
      categoryName,
      tagsString,
      metaTitle,
      metaDesc,
    ] = parseCSVLine(line);

    // Skip if essential fields are missing
    if (!title || !slug) {
      skipped++;
      continue;
    }

    const categoryId = categoryName ? categoryMap.get(categoryName) : null;

    // Create or update post
    const post = await prisma.post.upsert({
      where: { slug },
      update: {
        title,
        content: content || '',
        excerpt: excerpt || null,
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        status: status === 'publish' ? 'published' : 'draft',
        categoryId: categoryId || null,
        publishedAt: status === 'publish' ? new Date(createdAt) : null,
        updatedAt: new Date(updatedAt),
      },
      create: {
        slug,
        title,
        content: content || '',
        excerpt: excerpt || null,
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        status: status === 'publish' ? 'published' : 'draft',
        categoryId: categoryId || null,
        publishedAt: status === 'publish' ? new Date(createdAt) : null,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
      },
    });

    // Handle tags
    if (tagsString) {
      const tags = tagsString.split('|').filter(t => t.trim());

      for (const tagName of tags) {
        const tagId = tagMap.get(tagName);
        if (tagId) {
          await prisma.postTag.upsert({
            where: {
              postId_tagId: {
                postId: post.id,
                tagId,
              },
            },
            update: {},
            create: {
              postId: post.id,
              tagId,
            },
          });
        }
      }
    }

    imported++;

    if (imported % 100 === 0) {
      console.log(`  Imported ${imported} posts...`);
    }
  }

  console.log(`✅ Imported ${imported} posts (${skipped} skipped)`);
}

async function importPages() {
  console.log('📄 Importing pages...');

  const filePath = path.join(__dirname, '../wordpress-export/pages.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.trim().split('\n');

  let imported = 0;
  let skipped = 0;

  for (const line of lines) {
    const [
      id,
      title,
      slug,
      content,
      excerpt,
      displayOrder,
      status,
      createdAt,
      updatedAt,
      metaTitle,
      metaDesc,
    ] = parseCSVLine(line);

    // Skip if essential fields are missing
    if (!title || !slug) {
      skipped++;
      continue;
    }

    await prisma.page.upsert({
      where: { slug },
      update: {
        title,
        content: content || '',
        excerpt: excerpt || null,
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        displayOrder: parseInt(displayOrder) || 0,
        status: status === 'publish' ? 'published' : 'draft',
        updatedAt: new Date(updatedAt),
      },
      create: {
        slug,
        title,
        content: content || '',
        excerpt: excerpt || null,
        metaTitle: metaTitle || null,
        metaDesc: metaDesc || null,
        displayOrder: parseInt(displayOrder) || 0,
        status: status === 'publish' ? 'published' : 'draft',
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
      },
    });

    imported++;
  }

  console.log(`✅ Imported ${imported} pages (${skipped} skipped)`);
}

async function importMedia() {
  console.log('🖼️  Importing media references...');

  const filePath = path.join(__dirname, '../wordpress-export/media.csv');
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const lines = fileContent.trim().split('\n');

  let imported = 0;
  let skipped = 0;

  for (const line of lines) {
    const [id, url, title, caption, mimeType, metadata] = parseCSVLine(line);

    // Skip if essential fields are missing
    if (!url) {
      skipped++;
      continue;
    }

    await prisma.media.upsert({
      where: { url },
      update: {
        title: title || null,
        altText: caption || null,
        mimeType: mimeType || null,
      },
      create: {
        url,
        title: title || null,
        altText: caption || null,
        mimeType: mimeType || null,
      },
    });

    imported++;
  }

  console.log(`✅ Imported ${imported} media references (${skipped} skipped)`);
}

async function main() {
  console.log('🚀 Starting WordPress to PostgreSQL migration...\n');

  try {
    // First pass: collect all tags from posts
    console.log('🔍 Analyzing posts for tags...');
    const postsFilePath = path.join(__dirname, '../wordpress-export/posts.csv');
    const postsContent = fs.readFileSync(postsFilePath, 'utf-8');
    const postLines = postsContent.trim().split('\n');

    const allTags = new Set<string>();
    for (const line of postLines) {
      const parts = parseCSVLine(line);
      const tagsString = parts[9]; // tags column
      if (tagsString) {
        const tags = tagsString.split('|').filter(t => t.trim());
        tags.forEach(tag => allTags.add(tag));
      }
    }
    console.log(`Found ${allTags.size} unique tags\n`);

    // Import in order: categories, tags, posts, pages, media
    const categoryMap = await importCategories();
    const tagMap = await importTags(allTags);
    await importPosts(categoryMap, tagMap);
    await importPages();
    await importMedia();

    console.log('\n✅ Migration completed successfully!');

    // Print summary
    const counts = await Promise.all([
      prisma.post.count(),
      prisma.page.count(),
      prisma.category.count(),
      prisma.tag.count(),
      prisma.media.count(),
    ]);

    console.log('\n📊 Database Summary:');
    console.log(`  - Posts: ${counts[0]}`);
    console.log(`  - Pages: ${counts[1]}`);
    console.log(`  - Categories: ${counts[2]}`);
    console.log(`  - Tags: ${counts[3]}`);
    console.log(`  - Media: ${counts[4]}`);

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
