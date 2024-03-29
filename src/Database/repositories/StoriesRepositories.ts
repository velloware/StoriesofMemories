import Stories from '../db/sqlite.json';
import { LocalStorageRepository } from './LocalStorageRepository'

export interface IStoryPage {
  PageId: number;
  Text: string;
}

export interface IStory {
  id: number;
  Author: string;
  Title: string;
  URLImage: string;
  Description: string;
  Pages: IStoryPage[];
}

const stories: IStory[] = Stories.Stories;

export class StoriesRepositories {
  static getAllStories = async (): Promise<IStory[]> => {
    return stories;
  }

  static getStoryById = (id: number) => {
    return stories.filter((story: IStory) => {
      return story.id === id;
    })[0];
  }

  static UpdateStoryLastPageByStoryId = (StoryId: number, PageId: number) => {
    const Story = stories.filter((story: IStory, index: number) => {
      if (story.id === StoryId) {
        return index;
      }
    });

    // Update  StoryId --- LastPageId into localStorage
  }
}