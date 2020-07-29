import { IPost } from '~/models/posts/post/IPost';
import UrlMatcher from '~/lib/matchers/UrlMatcher';

function isSafeURL(url: string): boolean {
    try {
        const parsedURL = new URL(url);
        const forbiddenURLs = ['localhost', '127.0.0.1', '0.0.0.0'];
        return !forbiddenURLs.includes(parsedURL.hostname);
    } catch {
        // Normally this catch block should never be reached by the app
        return false;
    }
}

export default function getFirstLinkInPost(post: IPost): string | null {
    let link: string | null = null;

    if (!post.text || !post.text.length) {
        // Post likely doesn't have text, ignore it
        return link;
    }

    if (post.mediaThumbnail) {
        // Post has media, don't display the link preview
        return;
    }

    const URLs = post.text.match(UrlMatcher);
    if (URLs && URLs.length && isSafeURL(URLs[0])) {
        link = URLs[0];
    }

    return link;
}
