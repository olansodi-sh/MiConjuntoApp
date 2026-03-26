
export interface Apartment {
    id: string;
    number: string;
    tower: string;
}

export interface Employee {
    id: string;
    name: string;
    lastName: string;
    username?: string;
}

export interface Visitor {
    id: string;
    name: string;
    lastName: string;
    document?: string;
}

export interface Photo {
    id: string;
    url: string;
    filePath?: string; // Ruta relativa del servidor
    packageId: string;
    createdAt: string;
}

export interface Package {
    id: string;
    description: string; // "pedido amazon" etc.
    arrivalTime: string;
    delivered: boolean;
    deliveredTime?: string | null;
    apartment: Apartment | null;
    resident: {
        id: string;
        name: string;
        lastName: string;
    };
    createdByEmployee: Employee;
    receivedByResident?: any;
    photoCount: number;
    photos?: Photo[];
}

export interface AccessAudit {
    id: string;
    entryTime: string;
    exitTime?: string | null;
    visitor: Visitor;
    vehicle?: {
        id: string;
        plate: string;
    } | null;
    apartment: Apartment | null;
    authorizedByEmployee: Employee;
    notes?: string;
}

export interface ReceptionState {
    packages: Package[];
    accessLogs: AccessAudit[];
    selectedPackagePhotos: Photo[];
    isLoading: boolean;
    error: string | null;
}
