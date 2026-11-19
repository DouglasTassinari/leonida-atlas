// Leonida Radio. NO game audio is hosted, copied or streamed by this site.
// Players are official platform embeds only (loaded after a click). Stations with no official embed
// show their name, a short description and a link to the official source.
// `freq` is a DECORATIVE invented number for the dial. It is not a real frequency of anything.
// Sources checked on 2026-11-19:
//  - https://www.rockstargames.com/VI/music (Rockstar Games): station list + streaming links (lnk.to) for the Album and the Score.
//  - Apple Music embed of "Grand Theft Auto VI: The Album" (34 songs), linked from that page via gtavi-thealbum.lnk.to.
//  - Spotify embed of Justice, "Flower in a Hurricane [From GTAVI: Original Score]", linked from that page via justice.lnk.to.
//  - YouTube "Grand Theft Auto VI Trailer 2", channel Rockstar Games (oEmbed author: Rockstar Games).
//  - The 7 in-game stations are previewed only inside the rockstargames.com player: no official embed exists.
export const verified = '2026-11-19';
export const officialMusic = 'https://www.rockstargames.com/VI/music';
export const defaultStation = 'trailer2';

// type: 'apple' | 'spotify' | 'youtube' | null. id: path/ID used to build the embed URL on the client.
export const stations = [
  { id: 'trailer1', name: 'Trailer 1', genre: 'trailer', freq: 88.9, type: 'youtube', embed: 'QdBZY2fkU-0', h: 315,
    channel: 'Rockstar Games (YouTube)', url: 'https://www.youtube.com/watch?v=QdBZY2fkU-0', verified },
  { id: 'album', name: 'GTA VI: The Album', genre: 'album', freq: 92.6, type: 'apple', embed: 'us/album/grand-theft-auto-vi-the-album/6812476961', h: 450,
    channel: 'Rockstar Games (via gtavi-thealbum.lnk.to on rockstargames.com/VI/music)', url: 'https://gtavi-thealbum.lnk.to/gtavithealbum', verified },
  { id: 'score', name: 'Original Score by Justice', genre: 'score', freq: 94.4, type: 'spotify', embed: '1V8Qu6CwkBfYucnCWxynq8', h: 352,
    channel: 'Justice (via justice.lnk.to on rockstargames.com/VI/music)', url: 'https://justice.lnk.to/flowerinahurricane', verified },
  { id: 'trailer2', name: 'Trailer 2', genre: 'trailer', freq: 90.8, type: 'youtube', embed: 'VQRLujxTm3c', h: 315,
    channel: 'Rockstar Games (YouTube)', url: 'https://www.youtube.com/watch?v=VQRLujxTm3c', verified },
  { id: 'circoloco', name: 'Circoloco Records', hosts: 'DJ Seth, DJ Antonio', genre: 'house', freq: 95.3, type: null, channel: 'Rockstar Games', url: officialMusic, verified },
  { id: 'cocoteo', name: 'Cocoteo', hosts: 'El Martillo, La Gata', genre: 'latin', freq: 97.1, type: null, channel: 'Rockstar Games', url: officialMusic, verified },
  { id: 'backcountry', name: 'Back Country', hosts: 'MW, Delta Dawne', genre: 'country', freq: 99.2, type: null, channel: 'Rockstar Games', url: officialMusic, verified },
  { id: 'afrobank', name: 'Afro Bank FM', hosts: 'Burna, Palmsy', genre: 'afro', freq: 101.0, type: null, channel: 'Rockstar Games', url: officialMusic, verified },
  { id: 'chamber', name: 'The Chamber', hosts: 'DJ Kerry, DJ Tom', genre: 'metal', freq: 103.3, type: null, channel: 'Rockstar Games', url: officialMusic, verified },
  { id: 'flash', name: 'Flash FM', hosts: 'Robyn, Alex', genre: 'pop', freq: 105.1, type: null, channel: 'Rockstar Games', url: officialMusic, verified },
  { id: 'dirtysouth', name: 'Dirty South Classics', hosts: 'Trick, Trina', genre: 'rap', freq: 107.0, type: null, channel: 'Rockstar Games', url: officialMusic, verified },
];
export const dial = { min: 88, max: 108 };
