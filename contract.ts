import { initContract } from '@ts-rest/core';
import { z as zod } from 'zod';

const c = initContract();

const PostSchema = zod.object({
  id: zod.number(),
  name: zod.string(),
  description: zod.string()
});

const Message = zod.object({
    message: zod.string()
  });

export const contract = c.router({
  add: {
    method: 'POST',
    path: '/posts',
    responses: {
      201: PostSchema,
    },
    body: zod.object({
      name: zod.string(),
      description: zod.string()
    }),
    summary: 'Create a post',
  },
  findAll: {
    method: 'GET',
    path: `/posts`,
    responses: {
      200: PostSchema.array(),
    },
    summary: 'Get all posts',
  },
  findById: {
    method: 'GET',
    path: `/posts/:id`,
    responses: {
      200: PostSchema.nullable(),
    },
    summary: 'Get one post by id',
  },

  update: {
    method: 'PUT',
    path: `/posts/:id`,
    body: zod.object({
        name: zod.string(),
        description: zod.string()
    }),
    responses: {
      200: PostSchema.nullable(),
    },
    summary: 'Update post by id',
  },

  delete: {
    method: 'DELETE',
    path: `/posts/:id`,
    body:zod.object({}),
    responses: {
      200: Message.nullable()
    },
    summary: 'Delete post by id',
  }
});