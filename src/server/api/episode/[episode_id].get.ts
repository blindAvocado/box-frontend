export default defineEventHandler(async (event) => {
  const showId = getRouterParam(event, 'show_id')
  const episodeId = getRouterParam(event, 'episode_id')

  try {
    const resp = await $fetch(`http://localhost:8000/api/episode/${episodeId}`);
    return resp
  } catch (error: any) {
    throw createError({
      statusCode: 404,
      statusMessage: error,
    });
  }
})