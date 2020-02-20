import { IModelFactory } from '~/interfaces/IModelFactory';
import { IModerationReport } from '~/models/moderation/moderation_report/IModerationReport';
import { ModerationReportData } from '~/types/models-data/moderation/ModerationReportData';
import { ModerationReport } from '~/models/moderation/moderation_report/ModerationReport';


class ModerationReportFactory extends IModelFactory<IModerationReport> {
    make(data: ModerationReportData): IModerationReport {
        return new ModerationReport(data);
    }
}

const moderationReportFactory = new ModerationReportFactory();

export default moderationReportFactory;
