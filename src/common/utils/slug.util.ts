import slugify from 'slugify';

export const generateSlug = (data: string) => {
  const slug = slugify(data, {
    lower: true,
    strict: true,
    // trim: true,
  });

  return slug;
};
