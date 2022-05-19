import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IStorageStory {
  StoryId: number,
  LastPageId: number
}

export class LocalStorageRepository {
  static OpenStoryById = async (StoryId: number): Promise<IStorageStory> => {
    try {
      const StoryPage = await AsyncStorage.getItem('@IStorageStory');
      if(!StoryPage) {
        const StorageStory: IStorageStory[] = [{
          LastPageId: 1,
          StoryId
        }];

        await AsyncStorage.setItem('@IStorageStory', JSON.stringify(StorageStory))
        return {
          LastPageId: 1,
          StoryId
        };
      } 

      const storyPage: IStorageStory[] = JSON.parse(StoryPage);

      return storyPage.filter((storageStory: IStorageStory) => {
        return storageStory.StoryId === StoryId
      })[0]

    } catch (e) {
      // AppError(e) ->
      return {
        LastPageId: 1,
        StoryId
      };
    }
  }

  static ChangePageStoryId = async ({ LastPageId, StoryId }: IStorageStory): Promise<Boolean> => {
    try {
      const StoryPage = await AsyncStorage.getItem('@IStorageStory');
      
      if(!StoryPage) {
       this.OpenStoryById(StoryId);
       return false;
      } 

      const storyPage: IStorageStory[] = JSON.parse(StoryPage);

      storyPage.forEach(async (storageStory: IStorageStory, index: number) => {
        if(storageStory.StoryId === StoryId) {
          storyPage[index] = {
            StoryId,
            LastPageId
          }

          await AsyncStorage.setItem('@IStorageStory', JSON.stringify(storyPage))
        }
      })

      return true;

    } catch (e) {
      // AppError(e) ->
      return false;
    }
  }
}