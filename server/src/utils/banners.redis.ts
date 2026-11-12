export function getBannerKeyForWhiteboardForUsers(whiteboardId: string): string {
    return `whiteboard:${whiteboardId}:users`;
}