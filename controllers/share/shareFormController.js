import { createShare, getFolderByFolderId } from "../../lib/queries.js";

import { body, validationResult, matchedData } from "express-validator";

export async function shareFormGet(req, res, next) {
  const folderId = Number(req.params.folderId);
  const folder = await getFolderByFolderId(folderId, req.user.id);
  try {
    res.render("shareForm", {
      folder: folder,
    });
  } catch (err) {
    next(err);
  }
}

const validateDuration = [
  body("durationMinutes").custom(async (value) => {
    if (value < 1 || value > 10080) {
      throw new Error("Duration should be minimum 1 minute and maximum 1 week");
    }
  }),
];

export const shareFormPost = [
  validateDuration,
  async (req, res, next) => {
    const folderId = Number(req.params.folderId);
    const folder = await getFolderByFolderId(folderId, req.user.id);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("shareForm", {
        errors: errors.array(),
        folder: folder,
      });
    }

    const { durationMinutes } = matchedData(req);
    const durationSeconds = Number(durationMinutes) * 60;
    const code = crypto.randomUUID();

    try {
      await createShare({
        code: code,
        folderId: folderId,
        durationSeconds: durationSeconds,
      });
      res.redirect(`/shareFolder/${code}`);
    } catch (err) {
      next(err);
    }
  },
];
