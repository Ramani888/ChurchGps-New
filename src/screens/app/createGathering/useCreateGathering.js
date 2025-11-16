import * as Yup from 'yup';
import { strings } from '../../../language/strings';

export const CreateGatheringSchema = () => {
  return Yup.object().shape({
    description: Yup.string().trim().required('Description is required'),
    groupName: Yup.string().trim().required(strings.groupNameRequired),
    denomination: Yup.string(),
    protestantDenomination: Yup.string().trim(),
    otherDenomination: Yup.string().trim(),
  });
};
