import * as Yup from 'yup';

export const CreateCampfireSchema = Yup.object().shape({
  topic: Yup.string()
    .required(`Topic is required`)
    .max(24, 'Maximum Topic Title!'),
  description: Yup.string().required(`Description is required`),
  scheduleToStart: Yup.string().required(`Schedule to start is required`),
  openTo: Yup.string(),
  invited: Yup.array().default([]),
});
