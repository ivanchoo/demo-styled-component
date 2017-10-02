export const PUBLIC_BASE = process.env.PUBLIC_BASE || "/";
export const toBaseURI = path => `${PUBLIC_BASE}${path}`;

export const toProductList = () => toBaseURI("");
export const toProductDetail = id => toBaseURI(`product/${id}`);
export const toCart = () => toBaseURI("cart");
