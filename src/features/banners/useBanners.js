import { useAppDispatch, useAppSelector } from "../../utils/store";
import pig from "./.././img/banner/pig.webp";
import pig1 from "./.././img/banner/pig1.webp";
import mancala from "./.././img/banner/mancala.webp";
import mancala1 from "./.././img/banner/mancala1.webp";
import blast from "./.././img/banner/blast.webp";
import blast1 from "./.././img/banner/blast1.webp";
import salta from "./.././img/banner/salta.webp";
import salta1 from "./.././img/banner/salta1.webp";

import { useCallback } from "react";
import appEnv from "../../utils/appEnv";
import makeApiRequest from "../makeApiRequest";
import { setBannerGroups, updateCollectionLoadingState } from "./bannersSlice";

const useBanners = () => {
  const state = useAppSelector(state => state.banners);
  const dispatch = useAppDispatch();

  const getBannersGroups = useCallback((collectionName) => {
    const items = [
          {
            "id": 1,
            "collection_name": "Carousel",
            "name": "Rich piggies (netgame)",
            "order": 2,
            "link": "/launch_game?internalId=11630",
            "banners": [
              {
                "id": 11,
                "tags": ["mobile", "es", "en", "pt"],
                "url": pig
              },
              {
                "id": 12,
                "tags": ["desktop", "es", "en", "pt"],
                "url": pig1
              }
            ]
          },
          {
            "id": 2,
            "collection_name": "Carousel",
            "name": "Mancala",
            "order": 3,
            "link": "/casino?providerName=Mancala",
            "banners": [
              {
                "id": 19,
                "tags": ["mobile", "es", "en", "pt"],
                "url": mancala
              },
              {
                "id": 20,
                "tags": ["desktop", "es", "en", "pt"],
                "url": mancala1
              }
            ]
          },
          {
            "id": 3,
            "collection_name": "Carousel",
            "name": "Cosmo",
            "order": 4,
            "link": "/casino?providerName=Mancala",
            "banners": [
              {
                "id": 21,
                "tags": ["mobile", "es", "en", "pt"],
                "url": blast
              },
              {
                "id": 22,
                "tags": ["desktop", "es", "en", "pt"],
                "url": blast1
              }
            ]
          },
          {
            "id": 4,
            "collection_name": "Carousel",
            "name": "Lobby",
            "order": 5,
            "link": "/casino?providerName=Mancala",
            "banners": [
              {
                "id": 23,
                "tags": ["mobile", "es", "en", "pt"],
                "url": salta
              },
              {
                "id": 24,
                "tags": ["desktop", "es", "en", "pt"],
                "url": salta1
              }
            ]
          }
        ];
        dispatch(setBannerGroups({ collectionName, bannerGroups: items}));
  }, [dispatch]);

  return {
    ...state,
    getBannersGroups,
  };
};

export default useBanners;
