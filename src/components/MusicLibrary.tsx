
// Библиотека музыкальных треков для игры
export const MusicLibrary = {
  // Веселые треки
  fun: [
    {
      name: "Веселая мелодия",
      url: "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg"
    },
    {
      name: "Танцевальный ритм",
      url: "https://actions.google.com/sounds/v1/cartoon/slide_whistle_to_drum.ogg"
    },
    {
      name: "Позитивная нота",
      url: "https://actions.google.com/sounds/v1/cartoon/pop.ogg"
    }
  ],
  
  // Звуковые эффекты
  effects: {
    success: "https://actions.google.com/sounds/v1/cartoon/pop.ogg",
    fail: "https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg",
    levelUp: "https://actions.google.com/sounds/v1/cartoon/slide_whistle_to_drum.ogg"
  },
  
  // Получить случайный трек из указанной категории
  getRandomTrack: function(category: keyof typeof this) {
    if (category === 'effects' || typeof this[category] !== 'object') {
      return this.fun[0].url;
    }
    
    const tracks = this[category] as Array<{name: string, url: string}>;
    const randomIndex = Math.floor(Math.random() * tracks.length);
    return tracks[randomIndex].url;
  }
};
