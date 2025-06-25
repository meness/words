export const route = {
  notFound: '/404',
  home: '/',
  word: (word: string) => `/w/${encodeURIComponent(word).toLowerCase()}`
};
