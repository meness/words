export const formatDate = (value: Date | number, locale: Intl.LocalesArgument = 'fa-IR') =>
  Intl.DateTimeFormat(locale, {
    calendar: 'persian',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(value);
