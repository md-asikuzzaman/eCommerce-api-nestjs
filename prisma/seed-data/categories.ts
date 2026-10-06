export const categories = [
  {
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    description: 'Beauty and personal care products for everyday use.',
  },

  // Skincare
  {
    name: 'Skincare',
    slug: 'skincare',
    description:
      'Skincare products for cleansing, hydration, and skin protection.',
    parentSlug: 'beauty-personal-care',
  },
  {
    name: 'Face Care',
    slug: 'face-care',
    description: 'Face cleansers, moisturizers, serums, and treatments.',
    parentSlug: 'skincare',
  },
  {
    name: 'Sunscreen',
    slug: 'sunscreen',
    description:
      'Daily sun protection products including SPF creams and lotions.',
    parentSlug: 'skincare',
  },

  // Makeup
  {
    name: 'Makeup',
    slug: 'makeup',
    description: 'Makeup products for everyday and special occasions.',
    parentSlug: 'beauty-personal-care',
  },
  {
    name: 'Face Makeup',
    slug: 'face-makeup',
    description: 'Foundation, concealer, blush, powder, and face makeup.',
    parentSlug: 'makeup',
  },
  {
    name: 'Eye Makeup',
    slug: 'eye-makeup',
    description: 'Mascara, eyeliner, eyeshadow, and other eye makeup.',
    parentSlug: 'makeup',
  },
  {
    name: 'Lip Makeup',
    slug: 'lip-makeup',
    description: 'Lipsticks, lip glosses, lip balms, and lip liners.',
    parentSlug: 'makeup',
  },

  // Hair
  {
    name: 'Hair Care',
    slug: 'hair-care',
    description: 'Shampoos, conditioners, oils, masks, and hair treatments.',
    parentSlug: 'beauty-personal-care',
  },

  // Body
  {
    name: 'Body Care',
    slug: 'body-care',
    description:
      'Body lotions, body washes, scrubs, and personal care products.',
    parentSlug: 'beauty-personal-care',
  },

  // Fragrance
  {
    name: 'Fragrance',
    slug: 'fragrance',
    description: 'Perfumes, body mists, and fragrances for everyday wear.',
    parentSlug: 'beauty-personal-care',
  },

  // Tools
  {
    name: 'Beauty Tools',
    slug: 'beauty-tools',
    description: 'Beauty accessories and tools for skincare and makeup.',
    parentSlug: 'beauty-personal-care',
  },
];
