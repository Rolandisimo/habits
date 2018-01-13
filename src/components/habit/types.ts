export interface HabitItemProps {
    id: number;
    name: string;
    period: number;
    notificationTime: string;
    notificationId?: string;
    done: boolean; // Seeding each time we get done status from AsyncStorage. Based on current date.
    finished: boolean;
    createdAt: number;
}
