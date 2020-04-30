//This doesn't work without an arrow function? Why?
export default ctx => {
    return Boolean(typeof window === 'undefined' && ctx.res);
};
