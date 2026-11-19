// Leonida Radio. NO game audio is hosted, copied or streamed by this site.
// Every station plays through the official YouTube embed (youtube-nocookie.com), inside the site, and loads only after
// the visitor's first tap/click on the site (browsers block sound before that).
// kind 'official' = published by Rockstar Games / Atlantic Records (checked on YouTube, 2026-11-19).
// kind 'inspired' = a public YouTube playlist with the same style as the in-game station. It is NOT the game's audio;
//                   the real preview of the in-game station lives only in Rockstar's own player (link on each station).
// `freq` is a DECORATIVE invented number for the dial. It is not a real frequency of anything.
// In-game stations / hosts: https://www.rockstargames.com/VI/music (Rockstar Games).
export const verified = '2026-11-19';
export const officialMusic = 'https://www.rockstargames.com/VI/music';
export const defaultStation = 'album';

// yt: { t: 'playlist' | 'video', id }
const pl = (id) => ({ t: 'playlist', id });
const vid = (id) => ({ t: 'video', id });
export const stations = [
  { id: 'album', name: 'GTA VI: The Album', genre: 'album', kind: 'official', freq: 88.9, yt: pl('PLdg0nPcr3qrw'), channel: 'Atlantic Records (YouTube)', url: 'https://www.youtube.com/playlist?list=PLdg0nPcr3qrw' },
  { id: 'trailer2', name: 'Trailer 2', genre: 'trailer', kind: 'official', freq: 90.8, yt: vid('VQRLujxTm3c'), channel: 'Rockstar Games (YouTube)', url: 'https://www.youtube.com/watch?v=VQRLujxTm3c' },
  { id: 'trailer1', name: 'Trailer 1', genre: 'trailer', kind: 'official', freq: 92.6, yt: vid('QdBZY2fkU-0'), channel: 'Rockstar Games (YouTube)', url: 'https://www.youtube.com/watch?v=QdBZY2fkU-0' },
  { id: 'circoloco', name: 'Circoloco Records', hosts: 'DJ Seth, DJ Antonio', genre: 'house', kind: 'inspired', freq: 95.3, yt: pl('PLb9jpoBt74scIbQCiirSdZagqg4EklwM3'), channel: 'DC10 Ibiza Official (YouTube)', url: officialMusic },
  { id: 'cocoteo', name: 'Cocoteo', hosts: 'El Martillo, La Gata', genre: 'latin', kind: 'inspired', freq: 97.1, yt: pl('PLGVR8BPfsGhE'), channel: 'Caliente Latino (YouTube)', url: officialMusic },
  { id: 'backcountry', name: 'Back Country', hosts: 'MW, Delta Dawne', genre: 'country', kind: 'inspired', freq: 99.2, yt: pl('PLLDVfSPfze0tOzlLGWe_WUd4VXeO7ATEZ'), channel: 'Taste of Country (YouTube)', url: officialMusic },
  { id: 'afrobank', name: 'Afro Bank FM', hosts: 'Burna, Palmsy', genre: 'afro', kind: 'inspired', freq: 101.0, yt: pl('PLg48S-qywklvuabkR4siHkrUCJmWVhql7'), channel: '21Charts (YouTube)', url: officialMusic },
  { id: 'chamber', name: 'The Chamber', hosts: 'DJ Kerry, DJ Tom', genre: 'metal', kind: 'inspired', freq: 103.3, yt: pl('PLmXxqSJJq-yUwqtbp8MHBoTDoDULMoViq'), channel: 'RHINO (YouTube)', url: officialMusic },
  { id: 'flash', name: 'Flash FM', hosts: 'Robyn, Alex', genre: 'pop', kind: 'inspired', freq: 105.1, yt: pl('PLDIoUOhQQPlUDNpjEYTTE9tb-QvUHUSMt'), channel: 'Chillax (YouTube)', url: officialMusic },
  { id: 'dirtysouth', name: 'Dirty South Classics', hosts: 'Trick, Trina', genre: 'rap', kind: 'inspired', freq: 107.0, yt: pl('PLOxAAu2dBxO9EXqWXNcy2gk6AYUa-CCb1'), channel: 'Jimmie Neal (YouTube)', url: officialMusic },
];
export const dial = { min: 88, max: 108 };
