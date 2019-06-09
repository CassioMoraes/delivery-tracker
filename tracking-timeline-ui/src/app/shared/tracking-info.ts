import { TrackingStepInfo } from './tracking-step-info';

export class TrackingInfo {
    status: string;
    sender: string;
    receiver: string;
    steps: TrackingStepInfo[];
}
