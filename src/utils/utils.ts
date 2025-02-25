export function toPusherKey(key: string) {
  return key.replace(/:/g, "__");
}

export function chatHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort();
  return `${sortedIds[0]}--${sortedIds[1]}`;
}

// TODO: Make this, add a link, link to modal
// export const CTALink = ({ href, children }) => {
//   return (
//     <a href={href} target="_blank" rel="noopener noreferrer">
//       {children}
//     </a>
//   );
// };
