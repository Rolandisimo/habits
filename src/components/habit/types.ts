export interface HabitItemProps {
    id: number;
    name: string;
    period: number;
    notificationTime: string;
    notificationId?: string;
    done: boolean;
    finished: boolean;
    createdAt: number;
}
