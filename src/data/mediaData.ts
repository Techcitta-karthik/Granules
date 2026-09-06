import mediaDataJson from './mediaData.json';

export interface MediaArticle {
  id?: string;
  year?: string;
  category: 'NEWS' | 'PRESS RELEASE';
  date?: string;
  title: string;
  image?: string;
  body: string;
  pdf?: string;
  url?: string;
}

export interface MediaDataSet {
  pressYears: string[];
  newsYears: string[];
  pressReleases: Record<string, MediaArticle[]>;
  news: Record<string, MediaArticle[]>;
  allPressReleases: MediaArticle[];
  allNews: MediaArticle[];
}

export const MEDIA_DATA: MediaDataSet = mediaDataJson as MediaDataSet;
