import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

import { categories } from './seed-data/categories';
import { products } from './seed-data/products';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

// ─────────────────────────────────────────────
// Seed Categories
// ─────────────────────────────────────────────

async function seedCategories() {
  console.log('📦 Seeding categories...');

  const categoryMap = new Map<string, string>();

  // Create root categories first
  const rootCategories = categories.filter((category) => !category.parentSlug);

  for (const category of rootCategories) {
    const result = await prisma.categories.upsert({
      where: {
        slug: category.slug,
      },

      update: {
        name: category.name,
        description: category.description,
        isActive: true,
      },

      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        isActive: true,
      },
    });

    categoryMap.set(category.slug, result.id);

    console.log(`  ✓ ${result.name}`);
  }

  // Create child categories
  const childCategories = categories.filter((category) => category.parentSlug);

  for (const category of childCategories) {
    const parentId = categoryMap.get(category.parentSlug!);

    if (!parentId) {
      throw new Error(`Parent category "${category.parentSlug}" not found`);
    }

    const result = await prisma.categories.upsert({
      where: {
        slug: category.slug,
      },

      update: {
        name: category.name,
        description: category.description,
        parentId,
        isActive: true,
      },

      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        parentId,
        isActive: true,
      },
    });

    categoryMap.set(category.slug, result.id);

    console.log(`  ✓ ${result.name} → parent: ${category.parentSlug}`);
  }

  console.log(`✅ ${categoryMap.size} categories seeded`);

  return categoryMap;
}

// ─────────────────────────────────────────────
// Seed Products
// ─────────────────────────────────────────────

async function seedProducts(categoryMap: Map<string, string>) {
  console.log('📦 Seeding products...');

  for (const product of products) {
    const categoryId = categoryMap.get(product.categorySlug);

    if (!categoryId) {
      throw new Error(
        `Category "${product.categorySlug}" not found for product "${product.name}"`,
      );
    }

    const result = await prisma.products.upsert({
      where: {
        slug: product.slug,
      },

      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId,
        sku: product.sku,
        compareAtPrice: product.compareAtPrice,
        quantity: product.quantity,
        isFeatured: product.isFeatured,
        isActive: true,
      },

      create: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        categoryId,
        sku: product.sku,
        compareAtPrice: product.compareAtPrice,
        quantity: product.quantity,
        isFeatured: product.isFeatured,
        isActive: true,
      },
    });

    console.log(`  ✓ ${result.name}`);
  }

  console.log(`✅ ${products.length} products seeded`);
}

// ─────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────

async function main() {
  console.log('');
  console.log('🌱 Starting database seed...');
  console.log('');

  try {
    await prisma.$transaction(async () => {
      const categoryMap = await seedCategories();

      await seedProducts(categoryMap);
    });

    console.log('');
    console.log('🎉 Database seed completed successfully!');
    console.log('');
  } catch (error) {
    console.error('');
    console.error('❌ Database seed failed!');
    console.error(error);
    console.error('');

    throw error;
  }
}

// ─────────────────────────────────────────────
// Execute
// ─────────────────────────────────────────────

main()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
