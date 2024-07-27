export function extractYouTubeVideoId(url: string): string | null {
  const matched =
    /^https?:\/\/(www\.)?youtube\.com\/watch\?(.*&)?v=(?<videoId>[^&]+)/.exec(
      url
    ) ??
    /^https?:\/\/youtu\.be\/(?<videoId>[^?]+)/.exec(url) ??
    /^https?:\/\/(www\.)?youtube\.com\/embed\/(?<videoId>[^?]+)/.exec(url);

  if (matched?.groups?.videoId) {
    return matched.groups.videoId;
  } else {
    return null;
  }
}

// export function extractYouTubeVideoId(url: string): string | null {
//   const matched =
//     /^https?:\/\/(www\.)?youtube\.com\/watch\?(.*&)?v=([^&]+)/.exec(url) ??
//     /^https?:\/\/youtu\.be\/([^?]+)/.exec(url) ??
//     /^https?:\/\/(www\.)?youtube\.com\/embed\/([^?]+)/.exec(url);

//   if (matched && matched[3]) {
//     return matched[3];
//   } else {
//     return null;
//   }
// }
