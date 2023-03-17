import prisma from "../../../libs/prismadb";
import serverAuth from "../../../libs/serverAuth";

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).end();
  }

  try {
    const { postId } = req.body;

    const { currentUser } = await serverAuth(req);

    if (!postId || typeof postId !== 'string') {
      throw new Error('Invalid ID');
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId
      }
    });

    if (!post) {
      throw new Error('Invalid ID');
    }

    let updatedDeleted = post.deleted;

    if (req.method === 'POST') {
      updatedDeleted = true;
    }

    if (req.method === 'DELETE') {
      updatedDeleted = false;
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId
      },
      data: {
        deleted: updatedDeleted
      }
    });

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}