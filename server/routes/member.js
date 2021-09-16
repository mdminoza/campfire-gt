import express from 'express';
// TODO: For route protection
// import { verifyAuth } from '../middleware/auth.js';
import {
    fetchCampfireMember,
    addCampfireMember,
    removeCampfireMember,
    updateCampfireMemberStatus,
    updateCampfireMemberRole,
} from '../controllers/campfire.js';

const router = express.Router();

router.post('/member/get', fetchCampfireMember);
router.patch('/member/push', addCampfireMember);
router.patch('/member/pull', removeCampfireMember);
router.patch('/member/set/status', updateCampfireMemberStatus);
router.patch('/member/set/role', updateCampfireMemberRole);

export default router;
