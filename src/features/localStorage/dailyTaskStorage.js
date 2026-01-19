import Config from "../../utils/config";

const REWARDS_SEEN_IDS = `${Config.localStoragePrefix}REWARDS_SEEN_IDS`;

class DailyTaskStorage {
  static getSeenDailyRewardsIds() {
    const s = localStorage.getItem(REWARDS_SEEN_IDS);
    if (s !== null) return JSON.parse(s);
    return null;
  }

  static setSeenDailyRewardsIds(ids) {
    localStorage.setItem(REWARDS_SEEN_IDS, JSON.stringify(ids));
  }
}

export default DailyTaskStorage;
