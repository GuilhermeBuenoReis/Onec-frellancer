export function isCookiePresent(cookieName: string) {
  return document.cookie
    .split('; ')
    .some(cookie => cookie.startsWith(`${cookieName}=`));
}
