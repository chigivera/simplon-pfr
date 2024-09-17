export interface Event {
    // Define properties for Event as needed
    id: number;
    name: string;
    description: string;
}

export interface Community {
    id: number;
    name: string;
    description: string;
    eventList: Event[];
    coverImage: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    isFeatured: boolean;
}