export interface IVideoPlaybackService {
    addPlayer(player): void;
    removePlayer(player): void;

    onScrollHandler(): void;
    onBlurHandler(): void;
    onFocusHandler(): void;
}
