'use server'

export async function getUser(userId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const response = await fetch(`${baseUrl}/api/user/${userId}`, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
    });

    if (response.ok) {
      const data = await response.json();
      return data.user;
    } else {
      const errorData = await response.json();
      console.error(errorData);
      return { error: true, message: errorData.message };
    }
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Erro interno ao buscar usuário' };
  }
}

export async function createUserService(serviceData: string, userId: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const response = await fetch(`${baseUrl}/api/user/create-service`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ serviceData, userId: userId })
    });

    if (response.ok) {
      const data = await response.json();
      return data.user;
    } else {
      const errorData = await response.json();
      return { error: true, message: errorData.message };
    }
  } catch (error) {
    console.error(error);
    return { error: true, message: 'Erro interno ao buscar usuário' };
  }
}