
import { initContract, ResponseValidationError } from '@ts-rest/core';
import * as bodyParser from 'body-parser';
import { createExpressEndpoints, initServer } from '@ts-rest/express';
import {contract} from './contract';
import { PrismaClient } from '@prisma/client'
const express =require('express')
const cors = require('cors')

const prisma = new PrismaClient()

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const s = initServer();

const router = s.router(contract, {
  findAll: async () => {
    const posts = await prisma.post.findMany();

    return {
      status: 200,
      body: posts,
    };
  },
  findById: async ({params:{id}}) => {
    // const getId = id;
    const post = await prisma.post.findFirst({where:{id:Number.parseInt(id)}});

    return {
      status: 200,
      body: post,
    };
  },
  add: async ({ body }) => {
    const post = await prisma.post.create({
      data: body,
    });

    return {
      status: 201,
      body: post,
    };
  },
  update: async ({params:{id}, body }) => {
    const updatedPost = await prisma.post.update( { where: {
        id: Number.parseInt(id),
      },
      data: body,
    });

    return {
      status: 200,
      body: updatedPost,
    };
  },
  delete: async ({params:{id}, body}) => {
    // const getId = id;
    const post = await prisma.post.delete({where:{id:Number.parseInt(id)}});
    const message = {"message":"Deleted"}
    return {
      status: 200,
      body:message
    };
  },
});

createExpressEndpoints(contract, router, app);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});