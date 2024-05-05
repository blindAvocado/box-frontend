export default defineEventHandler(async (event) => {
  const showId = getRouterParam(event, 'id')

  try {
    const resp = await $fetch(`http://localhost:3001/show/${showId}`);
    return resp
  } catch (error: any) {
    throw createError({
      statusCode: 404,
      statusMessage: error,
    });
  }
})