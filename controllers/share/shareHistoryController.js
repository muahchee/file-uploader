import { getAllShares, getFolderByFolderId } from "../../lib/queries.js";

export async function shareHistoryGet(req, res, next) {
  const allSharesArr = await getAllShares(req.user.id);

  let shares = [];

  for (const share of allSharesArr) {
    const folder = await getFolderByFolderId(share.folderId);

    const durationMilliseconds = Number(share.durationSeconds) * 1000;
    const createdDate = new Date(share.createdAt);
    const expiryDate = new Date(createdDate.getTime() + durationMilliseconds);

    shares.push({
      foldername: folder.name,
      code: share.code,
      createdAt: createdDate,
      expiresAt: expiryDate,
    });
  }

  try {
    res.render("shareHistory", {
      shares: shares,
    });
  } catch (err) {
    next(err);
  }
}
