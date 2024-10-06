'use server';

import { cookies } from 'next/headers';

export const getCookie = async (name: string) => {
  const cookie = cookies().get(name);
  return cookie?.value;
};

export const setCookie = async (name: string, value: string) => {
  cookies().set(name, value, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 1日
  });
};

export const deleteCookie = async (name: string) => {
  cookies().delete(name);
};
