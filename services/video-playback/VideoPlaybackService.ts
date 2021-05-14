import { injectable } from 'inversify';

import debounce from 'lodash.debounce';

@injectable()
export class VideoPlaybackService {
    players = [];
    currentPlayerIndex = 0;

    active = false;

    debouncedScrollHandler = debounce(this.onScrollHandler, 200).bind(this);
    debouncedFocusHandler = debounce(this.onFocusHandler, 200).bind(this);
    debouncedBlurHandler = debounce(this.onBlurHandler, 200).bind(this);

    private isVideoVisible(idx?: number): boolean {
        if (typeof idx !== 'number') {
            idx = this.currentPlayerIndex;
        }

        const { top, height } = this.players[idx]?.$el?.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        return top > 0 && top + height < viewportHeight;
    }

    addPlayer(player) {
        if (this.players.length == 0) {
            window.addEventListener('scroll', this.debouncedScrollHandler);
            window.addEventListener('focus', this.debouncedFocusHandler);
            window.addEventListener('blur', this.debouncedBlurHandler);
        }

        this.players.push(player);
    }

    removePlayer(player) {
        const targetIndex = this.players.indexOf(player);

        if (targetIndex === -1) {
            return;
        }

        this.players.splice(targetIndex, 1);

        if (this.players.length === 0) {
            window.removeEventListener('scroll', this.debouncedScrollHandler);
            window.removeEventListener('focus', this.debouncedFocusHandler);
            window.removeEventListener('blur', this.debouncedBlurHandler);
        }
    }

    private switchPlayers(delta: number) {
        this.players[this.currentPlayerIndex].player?.pause();
        this.currentPlayerIndex += delta;

        if (this.isVideoVisible()) {
            this.players[this.currentPlayerIndex].player?.play();
            this.active = true;
        }
    }

    onScrollHandler() {
        const { height, top, bottom } = this.players[this.currentPlayerIndex]?.$el?.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const player = this.players[this.currentPlayerIndex].player;

        if (this.isVideoVisible()) {
            if (player?.paused()) {
                player.play();
                this.active = true;
            }
        } else {
            if (!player?.paused()) {
                player.pause();
                this.active = false;
            }
        }

        if (height + top < height / 2 && this.currentPlayerIndex !== this.players.length - 1) {
            this.switchPlayers(1);
            return;
        }

        if (viewportHeight - bottom + height / 2 < 0 && this.currentPlayerIndex !== 0) {
            this.switchPlayers(-1);
        }
    }

    onBlurHandler() {
        if (this.active) {
            this.players[this.currentPlayerIndex].player?.pause();
        }
    }

    onFocusHandler() {
        if (this.active) {
            this.players[this.currentPlayerIndex].player?.play();
        }
    }

    stopWithPostUuid(uuid: string) {
        for (let i = 0; i < this.players.length; i++) {
            const ref = this.players[i];

            if (!ref || !ref.$el) {
                continue;
            }

            if (ref.$el.id !== `video-${uuid}`) {
                continue;
            }

            if (!this.isVideoVisible(i) || !ref.player) {
                continue;
            }

            ref.player.pause();
            this.active = false;
            return;
        }
    }

    startWithPostUuid(uuid: string) {
        for (let i = 0; i < this.players.length; i++) {
            const ref = this.players[i];

            if (!ref || !ref.$el) {
                continue;
            }

            if (ref.$el.id !== `video-${uuid}`) {
                continue;
            }

            if (!this.isVideoVisible(i) || !ref.player) {
                continue;
            }

            ref.player.play();
            this.active = true;
            return;
        }
    }
}
