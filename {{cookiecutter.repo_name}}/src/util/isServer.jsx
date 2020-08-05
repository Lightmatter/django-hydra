const isServer = () => {
    return Boolean(typeof window === 'undefined');
};
export default isServer;
