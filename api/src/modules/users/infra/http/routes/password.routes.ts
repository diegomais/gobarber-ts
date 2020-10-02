import { Router } from 'express';
import ForgotPasswordController from '../controllers/forgotPasswordController';
import ResetPasswordController from '../controllers/resetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.store);
passwordRouter.post('/reset', resetPasswordController.store);

export default passwordRouter;
