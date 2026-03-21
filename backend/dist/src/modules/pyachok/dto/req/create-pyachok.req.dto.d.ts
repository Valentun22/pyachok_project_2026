import { PyachokGenderEnum } from '../../enums/pyachok-gender.enum';
import { PyachokPayerEnum } from '../../enums/pyachok-payer.enum';
export declare class CreatePyachokReqDto {
    date: string;
    time: string;
    purpose?: string;
    peopleCount?: number;
    genderPreference?: PyachokGenderEnum;
    payer?: PyachokPayerEnum;
    message?: string;
    expectedBudget?: number;
}
