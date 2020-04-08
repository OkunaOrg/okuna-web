export enum OkPostCommentsState {
    // Loading comments on an infinite scrolling way, happens when not going to any specific comment or reply
    infiniteScrolling,
    // Loading comments on a load more basis, happens when going to an specific post comment or reply.
    loadMore,
    // Initial state
    Idle,
}