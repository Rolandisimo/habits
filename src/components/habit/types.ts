export interface HabitItemProps {
    id: number;
    name: string;
    period: number;
    notificationTime: string;
    notificationId?: number;
    done: boolean;
    finished: boolean;
    createdAt: number;
}
