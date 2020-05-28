// This doesn't work without an arrow function? Why?
export default () => {
    return Boolean(typeof window === 'undefined');
};
