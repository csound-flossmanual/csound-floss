// Route constants for English and French versions
// Single source of truth for route paths and default redirects

export const ROUTE_CONSTANTS = {
  en: {
    homeRoute: "/",
    introductionRoute: "/introduction",
    defaultContentRoute: "/introduction/preface",
    languagePrefix: "",
  },
  fr: {
    homeRoute: "/fr",
    introductionRoute: "/fr/introduction",
    defaultContentRoute: "/fr/premiers-pas/gs-01",
    languagePrefix: "/fr",
  },
};

/**
 * Get route constants for a specific language
 * @param {string} language - 'en' or 'fr'
 * @returns {object} Route constants for the specified language
 */
export const getRouteConstants = (language = "en") => {
  return ROUTE_CONSTANTS[language] || ROUTE_CONSTANTS.en;
};

/**
 * Determine if a route is French based on the path
 * @param {string} currentRoute - Current route path
 * @returns {boolean} True if French route
 */
export const isFrenchRoute = (currentRoute) => {
  return currentRoute.startsWith("/fr");
};

/**
 * Get the appropriate default content route based on current route
 * @param {string} currentRoute - Current route path
 * @returns {string} Default content route for the language
 */
export const getDefaultContentRoute = (currentRoute) => {
  const language = isFrenchRoute(currentRoute) ? "fr" : "en";
  const constants = getRouteConstants(language);

  if (language === "fr") {
    return currentRoute === constants.homeRoute
      ? constants.defaultContentRoute
      : currentRoute;
  } else {
    return currentRoute === constants.homeRoute ||
      currentRoute === constants.introductionRoute
      ? constants.defaultContentRoute
      : currentRoute;
  }
};

/**
 * Get the home route for a specific language
 * @param {string} language - 'en' or 'fr'
 * @returns {string} Home route for the language
 */
export const getHomeRoute = (language = "en") => {
  return getRouteConstants(language).homeRoute;
};

/**
 * Get the introduction route for a specific language
 * @param {string} language - 'en' or 'fr'
 * @returns {string} Introduction route for the language
 */
export const getIntroductionRoute = (language = "en") => {
  return getRouteConstants(language).introductionRoute;
};

/**
 * Check if the current route is a home route (either English or French)
 * @param {string} currentRoute - Current route path
 * @returns {boolean} True if it's a home route
 */
export const isHomeRoute = (currentRoute) => {
  return (
    currentRoute === ROUTE_CONSTANTS.en.homeRoute ||
    currentRoute === ROUTE_CONSTANTS.fr.homeRoute
  );
};
