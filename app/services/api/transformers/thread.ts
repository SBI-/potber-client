import { FirstPost, FirstPostXml, LastPost, LastPostXml } from '../types/post';
import { Thread, ThreadPage, ThreadPageXml, ThreadXml } from '../types/thread';
import { transformPost } from './post';

export function transformThread(threadXml: ThreadXml) {
  const thread = {
    id: threadXml.id,
    title: threadXml.children[0].textContent,
    subtitle: threadXml.children[1].textContent,
    repliesCount: parseInt(threadXml.children[2].attributes.value),
    hitsCount: parseInt(threadXml.children[3].attributes.value),
    pagesCount: parseInt(threadXml.children[4].attributes.value),
    isClosed: false,
    isSticky: false,
    isImportant: false,
    isAnnouncement: false,
    isGlobal: false,
    boardId: threadXml.children[6].attributes.value,
    page: transformThreadPage(threadXml.children[8] as any as ThreadPageXml),
  } as Thread;
  return thread;
}

export function transformThreadPage(threadPageXml: ThreadPageXml) {
  if (!threadPageXml) return undefined;
  const posts = [];
  for (const postXml of threadPageXml.childNodes) {
    posts.push(transformPost(postXml));
  }
  return {
    pageNumber: parseInt(threadPageXml.attributes.page.value),
    offset: parseInt(threadPageXml.attributes.offset.value),
    postCount: parseInt(threadPageXml.attributes.count.value),
    posts,
  } as ThreadPage;
}

export function transformFirstPost(firstPostXml: FirstPostXml) {
  return {} as FirstPost;
}

export function transformLastPost(lastPostXml: LastPostXml) {
  return {} as LastPost;
}
