export function getBannerKeyForWhiteboardForUsers(
  whiteboardId: string,
): string {
  return `whiteboard:${whiteboardId}:users`;
}

export function getBannerKeyForWhiteboardForElements(
  whiteboardId: string,
): string {
  return `whiteboard:${whiteboardId}:elements`;
}
