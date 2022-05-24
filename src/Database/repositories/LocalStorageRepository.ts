import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IStorageStory {
  StoryId: number,
  LastPageId: number
}

export class LocalStorageRepository {
  static OpenStoryById = async (StoryId: number): Promise<IStorageStory> => {
    try {
      const StoryPage = await AsyncStorage.getItem('@IStorageStory');
      if (!StoryPage) {
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

      const page = storyPage.filter((storageStory: IStorageStory) => {
        return storageStory.StoryId === StoryId
      })[0]

      if (!page) {
        this.ChangePageStoryId({
          LastPageId: 1,
          StoryId
        });
        return {
          LastPageId: 1,
          StoryId
        };
      }

      return page;

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
      
      console.log("StoryPage -> ", StoryPage); 

      if (!StoryPage) {
        this.OpenStoryById(StoryId);
        return false;
      }

      const storyPage: IStorageStory[] = JSON.parse(StoryPage);
      let EXISTS_IN_LOCALSOTORAGE = true;

      storyPage.forEach(async (storageStory: IStorageStory, index: number) => {
        if (storageStory.StoryId === StoryId) {
          storyPage[index] = {
            StoryId,
            LastPageId
          }
          EXISTS_IN_LOCALSOTORAGE = false;
          await AsyncStorage.setItem('@IStorageStory', JSON.stringify(storyPage))
        }
      });

      if (EXISTS_IN_LOCALSOTORAGE) {
        storyPage.push({StoryId, LastPageId});
        await AsyncStorage.setItem('@IStorageStory', JSON.stringify(storyPage));
      }

      return true;

    } catch (e) {
      // AppError(e) ->
      return false;
    }
  }
}