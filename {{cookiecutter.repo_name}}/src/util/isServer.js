export default function isServer(ctx) {
  return Boolean(typeof window === 'undefined' && ctx.res);
}
