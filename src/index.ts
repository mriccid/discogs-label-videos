import axios from "axios";
import * as R from "ramda";

const VIDEO_REQUEST_SIZE = 5;

// @todo add handling for rate limit :O

const [, , labelId] = process.argv;

const discogs = axios.create({ baseURL: "https://api.discogs.com" });

async function getLabelReleases(labelId: string) {
  const response = await discogs.get(`/labels/${labelId}/releases`);
  return response.data.releases;
}

async function getReleaseVideoList(releaseId: string) {
  const response = await discogs.get(`/releases/${releaseId}`);
  return response.data.videos || [];
}

const toIdList = () => R.pipe(R.map(R.prop("id")), R.take(VIDEO_REQUEST_SIZE));
const awaitAll = () => promises => Promise.all(promises);
const flatten = () => R.flatten;
const unique = () => R.uniq;
const mapToReleaseVideoList = () => R.map(getReleaseVideoList);
const mapToTitleAndUrl = () => R.map(R.pick(["title", "uri"]));
const log = () => value => console.info(value);

getLabelReleases(labelId)
  .then(toIdList())
  .then(mapToReleaseVideoList())
  .then(awaitAll())
  .then(flatten())
  .then(unique())
  .then(mapToTitleAndUrl())
  .then(log())
  .catch(console.error);
