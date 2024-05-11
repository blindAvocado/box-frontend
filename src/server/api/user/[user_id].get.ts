export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, 'user_id')

  try {
    const resp = await $fetch(`http://localhost:3001/user/${userId}`);
    return resp
  } catch (error: any) {
    throw createError({
      statusCode: 404,
      statusMessage: error,
    });
  }
})