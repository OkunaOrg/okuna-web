export interface LinkPreview {
    title?: string;
    description?: string;
    imageUrl?: string;
    // B64 Data
    imageData?: string;
    imageContentType?: string;
    siteName?: string;
    domainUrl?: string;
    faviconUrl?: string;
    // B64 Data
    faviconData?: string;
    faviconContentType?: string;
}

export interface GetLinkPreviewParams{
    url: string;
}
