import { isScreenLG, isScreenMD } from '@/utils/layoutUtils';

function resizeHandler(commit) {
  commit('setIsDesktop', isScreenLG());
  commit('setIsMobile', isScreenMD());
}

export const state = () => ({
  state: {
    isMobile: false,
    isDesktop: isScreenMD(),
  },
});

export const getters = {
  isDesktop: (state) => state.isDesktop,
};

export const mutations = {
  setIsMobile(state, isMobile) {
    state.isMobile = isMobile;
  },

  setIsDesktop(state, isDesktop) {
    state.isDesktop = isDesktop;
  },
};

export const actions = {
  initLayoutModule({ commit }) {
    resizeHandler(commit);

    if (process.client) {
      window.addEventListener('resize', () => {
        resizeHandler(commit);
      });
    }
  },
};
