import useBanners from "../useBanners";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../../localisation/useLanguage";
import appEnv from "../../../utils/appEnv";

const useBannerCollection = (collectionName, keyword) => {
  const { collections, currentlyLoadingCollectionNames, getBannersGroups } = useBanners();
  const [justMounted, setJustMounted] = useState(true);
  const { languagePack } = useLanguage();
  const langShort = languagePack.langShort;
  const currentDomain = appEnv.currentDomain || '';

  useEffect(() => {
    if (justMounted) {
      setJustMounted(false);
      if (!currentlyLoadingCollectionNames.includes(collectionName) && !collections.find(c => c.name === collectionName)) {
        getBannersGroups(collectionName);
      }
    }
  }, [collectionName, collections, currentlyLoadingCollectionNames, getBannersGroups, justMounted]);

  const slides = useMemo(() => {
    const collection = collections.find(c => c.name === collectionName);
    if (!collection?.banners?.length) return [];

    return collection.banners.map(group => {
        const bannersWithLang = group.banners?.filter(banner =>
          banner.tags?.some(tag => tag.toLowerCase() === langShort.toLowerCase())
        ) || [];

        if (bannersWithLang.length === 0) return null;

        let desktopBanner, mobileBanner;
        const keywordLower = keyword?.toLowerCase();

        const findBanner = (device) =>
          bannersWithLang.find(banner =>
            banner.tags?.some(tag => tag.toLowerCase() === device) &&
            (!keywordLower || banner.tags?.some(tag => tag.toLowerCase() === keywordLower))
          );

        if (keywordLower) {
          desktopBanner = findBanner("desktop") || bannersWithLang.find(b => b.tags?.some(tag => tag.toLowerCase() === "desktop"));
          mobileBanner = findBanner("mobile") || bannersWithLang.find(b => b.tags?.some(tag => tag.toLowerCase() === "mobile"));
        } else {
          desktopBanner = bannersWithLang.find(b => b.tags?.some(tag => tag.toLowerCase() === "desktop")) || bannersWithLang[0];
          mobileBanner = bannersWithLang.find(b => b.tags?.some(tag => tag.toLowerCase() === "mobile")) || bannersWithLang[0];
        }

        if (!desktopBanner) desktopBanner = mobileBanner || bannersWithLang[0];
        if (!mobileBanner) mobileBanner = desktopBanner || bannersWithLang[0];

        return {
          link: group.link || undefined,
          desktopPicUrl: desktopBanner.url,
          mobilePicUrl: mobileBanner.url,
        };
      })
      .filter(slide => slide !== null);
  }, [collections, collectionName, keyword, currentDomain, langShort]);

  return slides;
};

export default useBannerCollection;
