import Stories from './db/sqlite.json';

export class StoriesRepositories {

  static getAllStories = () => {
    return Stories.Stories;
  }

  static getStoryById = (id: number) => {
    return Stories.Stories.filter((story: any) => story.id === id || story.id === String(id));
  }
}