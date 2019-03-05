export function packageData(data, itemsPerPage){
  return {
      codex: data["@id"].split("codex=")[1], // only works if codex is last paramater
      label: data["label"],
      data: data.resources.constructor === Array ? data.resources : [data.resources],
      next: data.next,
      prev: data.prev,
      total: data.within.total,
      first: data.within.first,
      last: data.within.last,
      index: data.startIndex,
      page: Math.ceil(data.startIndex / itemsPerPage) + 1,
      totalPages: Math.ceil(data.within.total / itemsPerPage),
      }
}
