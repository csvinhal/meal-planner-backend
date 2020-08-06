import * as yup from "yup";

const recipeSchema = yup.object().shape({
  id: yup.string().trim(),
  recipeName: yup.string().trim().required(),
  description: yup.string().trim(),
  createdOn: yup.date().default(function () {
    return new Date();
  }),
  updatedOn: yup.date().default(function () {
    return new Date();
  }),
});

export { recipeSchema };
